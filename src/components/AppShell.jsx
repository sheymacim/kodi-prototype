import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Ana Sayfa', to: '/' },
  { label: 'Konu Sistemi', to: '/creator' },
  { label: 'Mikro Destek', to: '/support' },
  { label: 'Sponsor Keşfi', to: '/sponsor' },
];

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="KODI ana navigasyon">
        <NavLink className="wordmark" to="/" aria-label="KODI ana sayfa">
          <span className="wordmark-mark">K</span>
          <span>KODİ</span>
        </NavLink>

        <nav className="nav-list">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="mobile-topbar">
        <NavLink className="wordmark" to="/" aria-label="KODI ana sayfa">
          <span className="wordmark-mark">K</span>
          <span>KODİ</span>
        </NavLink>
        <nav className="mobile-nav" aria-label="KODI mobil navigasyon">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <main className="main-content">{children}</main>
    </div>
  );
}
