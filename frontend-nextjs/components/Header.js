import Link from 'next/link'

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.nav}>
        <Link href="/" style={styles.logo}>
          📱 متجر الإكسسوارات
        </Link>
        <nav style={styles.navLinks}>
          <Link href="/" style={styles.navLink}>
            الرئيسية
          </Link>
          <Link href="/products" style={styles.navLink}>
            المنتجات
          </Link>
        </nav>
      </div>
    </header>
  )
}

const styles = {
  header: {
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  nav: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
  },
  logo: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
}
