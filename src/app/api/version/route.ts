export const dynamic = 'force-dynamic'

/**
 * Build provenance endpoint — lets smoke tests / release checks prove which
 * commit is actually serving traffic.
 */
export function GET() {
  return Response.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? 'dev',
    env: process.env.VERCEL_ENV ?? 'local',
    builtAt: new Date().toISOString(),
  })
}
