import { Link } from '../../../i18n.config';

const COLUMNS = [
  {
    title: 'Study',
    links: [
      { href: '/course', label: 'Course' },
      { href: '/hiragana-katakana-quiz', label: 'Kana quiz' },
      { href: '/hiragana-katakana-chart', label: 'Kana chart' },
      { href: '/hiragana-katakana-converter', label: 'Kana converter' },
      { href: '/japanese-text-analyzer', label: 'Text analyzer' },
      { href: '/learn', label: 'Learning guides' },
      { href: '/chat', label: 'AI chat' },
    ],
  },
  {
    title: 'Site',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact-us', label: 'Contact' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="kl-footer">
      <div className="kl-wrap">
        <div className="kl-footer-grid">
          <div className="kl-footer-brand">
            <span className="kl-footer-wordmark">
              LearnKana
              <span lang="ja">かな</span>
            </span>
            <p>Making Japanese learning accessible and enjoyable for everyone.</p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="kl-footer-column">
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href as never}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="kl-footer-base">
          <span>© {new Date().getFullYear()} LearnKana</span>
          <span lang="ja" aria-hidden="true">
            仮名線
          </span>
        </div>
      </div>
    </footer>
  );
}
