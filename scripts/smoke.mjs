#!/usr/bin/env node
/**
 * LearnKana release smoke test.
 *
 * Zero dependencies (Node 20+, global fetch). Runs against a live server:
 *
 *   BASE_URL=http://127.0.0.1:3100 node scripts/smoke.mjs
 *
 * Asserts the P0 structural invariants that used to be broken in production:
 *   1. exactly one <html> per document (no nested document roots)
 *   2. <html lang> matches the locale
 *   3. every page's canonical is its own absolute URL (not the language home)
 *   4. >= 6 hreflang alternates including x-default
 *   5. no ad / duplicate tracking scripts
 *   6. /api/version answers 200 JSON
 *
 * Any FAIL => exit code 1.
 */

const BASE_URL = (process.env.BASE_URL || 'http://127.0.0.1:3100').replace(/\/+$/, '')
const SITE_URL = (process.env.SITE_URL || 'https://learnkana.pro').replace(/\/+$/, '')

let failures = 0
let checks = 0

function pass(name) {
  checks++
  console.log(`PASS  ${name}`)
}

function fail(name, detail) {
  checks++
  failures++
  console.log(`FAIL  ${name}${detail ? `  →  ${detail}` : ''}`)
}

function check(name, ok, detail) {
  if (ok) pass(name)
  else fail(name, detail)
}

function section(title) {
  console.log(`\n── ${title} ${'─'.repeat(Math.max(0, 62 - title.length))}`)
}

async function get(path, init = {}) {
  const url = `${BASE_URL}${path}`
  const res = await fetch(url, {
    redirect: 'follow',
    ...init,
    headers: { 'user-agent': 'learnkana-smoke/1.0', ...(init.headers || {}) },
  })
  const text = await res.text()
  return { res, text, requestedUrl: url, finalUrl: res.url || url }
}

function countOccurrences(haystack, needle) {
  let count = 0
  let idx = haystack.indexOf(needle)
  while (idx !== -1) {
    count++
    idx = haystack.indexOf(needle, idx + needle.length)
  }
  return count
}

function countHtmlTags(html) {
  return (html.match(/<html[\s>]/gi) || []).length
}

function extractCanonical(html) {
  const tag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)
  if (!tag) return null
  const href = tag[0].match(/\bhref=["']([^"']+)["']/i)
  return href ? href[1] : null
}

function extractHreflangs(html) {
  const out = []
  const linkTags = html.match(/<link\b[^>]*>/gi) || []
  for (const tag of linkTags) {
    if (!/\brel=["']alternate["']/i.test(tag)) continue
    const hl = tag.match(/\bhreflang=["']([^"']+)["']/i)
    if (hl) out.push(hl[1])
  }
  return out
}

// ── 1. Single document root ────────────────────────────────────────────────
const PAGES_WITH_SINGLE_HTML = ['/', '/hiragana-katakana-quiz', '/de', '/learn', '/japanese-text-analyzer']

// ── 3. Canonical must be self ──────────────────────────────────────────────
const CANONICAL_CASES = [
  { path: '/hiragana-katakana-quiz', expected: `${SITE_URL}/hiragana-katakana-quiz` },
  { path: '/learn/hiragana-basics', expected: `${SITE_URL}/learn/hiragana-basics` },
  { path: '/de/learn', expected: `${SITE_URL}/de/learn` },
  { path: '/de', expected: `${SITE_URL}/de` },
  { path: '/', expected: SITE_URL },
]

const HREFLANG_PAGES = ['/', '/hiragana-katakana-quiz', '/learn', '/de', '/de/learn', '/japanese-text-analyzer']

const cache = new Map()

async function page(path) {
  if (!cache.has(path)) {
    try {
      cache.set(path, await get(path))
    } catch (err) {
      cache.set(path, { error: err })
    }
  }
  return cache.get(path)
}

async function main() {
  console.log(`LearnKana smoke test`)
  console.log(`  BASE_URL   ${BASE_URL}`)
  console.log(`  SITE_URL   ${SITE_URL}`)

  const allPaths = [...new Set([...PAGES_WITH_SINGLE_HTML, ...CANONICAL_CASES.map((c) => c.path), ...HREFLANG_PAGES])]

  section('Fetch')
  for (const path of allPaths) {
    const r = await page(path)
    if (r.error) {
      fail(`GET ${path}`, r.error && r.error.message ? r.error.message : String(r.error))
      continue
    }
    check(`GET ${path} → 200`, r.res.status === 200, `status ${r.res.status}`)
  }

  section('Document root uniqueness')
  for (const path of PAGES_WITH_SINGLE_HTML) {
    const r = await page(path)
    if (r.error || !r.text) {
      fail(`${path} <html> count == 1`, 'page not fetched')
      continue
    }
    const n = countHtmlTags(r.text)
    check(`${path} <html> count == 1`, n === 1, `found ${n}`)
  }

  section('/de locale document')
  {
    const r = await page('/de')
    if (r.error || !r.text) {
      fail('/de <html lang="de">', 'page not fetched')
    } else {
      const html = r.text
      const n = countHtmlTags(html)
      const openTag = html.match(/<html[^>]*>/i)
      const hasLang = !!openTag && /\blang=["']de["']/i.test(openTag[0])
      check('/de outermost <html> has lang="de"', n === 1 && hasLang, `count=${n} tag=${openTag ? openTag[0] : 'none'}`)

      // "outermost": nothing but doctype/whitespace/comments may precede <html>
      const firstHtmlIdx = html.search(/<html[\s>]/i)
      const before = html.slice(0, firstHtmlIdx).replace(/<!doctype[^>]*>/i, '').replace(/<!--[\s\S]*?-->/g, '').trim()
      check('/de <html> is the first element in the document', firstHtmlIdx >= 0 && before === '', `prefix=${JSON.stringify(before.slice(0, 80))}`)

      check('/de <body> appears after <html>', html.search(/<body[\s>]/i) > firstHtmlIdx, 'body missing or before html')
    }
  }

  section('Canonical is self-referencing')
  for (const { path, expected } of CANONICAL_CASES) {
    const r = await page(path)
    if (r.error || !r.text) {
      fail(`${path} canonical == ${expected}`, 'page not fetched')
      continue
    }
    const canonical = extractCanonical(r.text)
    check(`${path} canonical == ${expected}`, canonical === expected, `got ${canonical === null ? 'none' : canonical}`)
  }

  section('hreflang alternates')
  for (const path of HREFLANG_PAGES) {
    const r = await page(path)
    if (r.error || !r.text) {
      fail(`${path} hreflang >= 6`, 'page not fetched')
      continue
    }
    const langs = extractHreflangs(r.text)
    const unique = [...new Set(langs)]
    check(
      `${path} hreflang >= 6 incl x-default`,
      unique.length >= 6 && unique.includes('x-default'),
      `count=${unique.length} [${unique.join(', ')}]`
    )
  }

  section('Tracking / ad scripts on /de')
  {
    const r = await page('/de')
    if (r.error || !r.text) {
      fail('/de ad script count == 0', 'page not fetched')
    } else {
      const html = r.text
      const ads = countOccurrences(html, 'adsbygoogle.js')
      const gtag = countOccurrences(html, 'gtag/js')
      const clarity = countOccurrences(html, 'clarity.ms')
      check('/de adsbygoogle.js count == 0', ads === 0, `found ${ads}`)
      check('/de gtag/js count <= 1', gtag <= 1, `found ${gtag}`)
      check('/de clarity.ms count <= 1', clarity <= 1, `found ${clarity}`)
    }
  }

  section('API')
  {
    try {
      const res = await fetch(`${BASE_URL}/api/version`, {
        headers: { 'user-agent': 'learnkana-smoke/1.0' },
        redirect: 'follow',
      })
      check('/api/version → 200', res.status === 200, `status ${res.status}`)
      const text = await res.text()
      let body = null
      try {
        body = JSON.parse(text)
      } catch {
        body = null
      }
      check('/api/version returns JSON', body !== null && typeof body === 'object', `body=${text.slice(0, 120)}`)
      check('/api/version has commit field', body !== null && typeof body.commit === 'string', `body=${text.slice(0, 120)}`)
    } catch (err) {
      fail('/api/version → 200', err && err.message ? err.message : String(err))
      fail('/api/version returns JSON', 'request failed')
      fail('/api/version has commit field', 'request failed')
    }
  }

  console.log('')
  if (failures > 0) {
    console.log(`RESULT: FAIL — ${failures}/${checks} checks failed`)
    process.exit(1)
  }
  console.log(`RESULT: PASS — ${checks}/${checks} checks passed`)
}

main().catch((err) => {
  console.error('SMOKE CRASHED:', err)
  process.exit(1)
})
