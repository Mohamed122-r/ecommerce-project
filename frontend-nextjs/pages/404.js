import Link from 'next/link'

export default function Custom404() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404 - الصفحة غير موجودة</h1>
        <p style={styles.description}>
          عذراً، الصفحة التي تبحث عنها غير موجودة.
        </p>
        <Link href="/" style={styles.button}>
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  content: {
    padding: '2rem',
  },
  title: {
    fontSize: '3rem',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.25rem',
    color: '#6b7280',
    marginBottom: '2rem',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
}
