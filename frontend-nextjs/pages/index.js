import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://mohamedalamin.wuaze.com/api/products');
        const data = await response.json();
        
        if (data.status === 'success') {
          // أخذ أول 8 منتجات للعرض
          setProducts(data.data.slice(0, 8));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>متجر الإكسسوارات - الرئيسية</title>
        <meta name="description" content="متجر إكسسوارات الجوالات" />
      </Head>

      <div style={styles.container}>
        {/* الهيدر */}
        <header style={styles.header}>
          <div style={styles.nav}>
            <h1 style={styles.logo}>📱 متجر الإكسسوارات</h1>
            <nav style={styles.navLinks}>
              <Link href="/" style={styles.navLink}>الرئيسية</Link>
              <Link href="/products" style={styles.navLink}>المنتجات</Link>
            </nav>
          </div>
        </header>

        {/* قسم البطل */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>أحدث إكسسوارات الجوالات</h1>
            <p style={styles.heroSubtitle}>
              اكتشف مجموعة واسعة من الكفرات، الشواحن، السماعات والإكسسوارات المميزة
            </p>
            <Link href="/products" style={styles.ctaButton}>
              تسوق الآن
            </Link>
          </div>
        </section>

        {/* المنتجات المميزة */}
        <section style={styles.productsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>منتجات مميزة</h2>
            <p style={styles.sectionSubtitle}>أفضل الإكسسوارات المختارة بعناية</p>
          </div>

          {loading ? (
            <div style={styles.loading}>جاري التحميل...</div>
          ) : (
            <div style={styles.productsGrid}>
              {products.map((product) => (
                <div key={product.id} style={styles.productCard}>
                  <div style={styles.productImage}>
                    {product.sale_price && (
                      <span style={styles.saleBadge}>خصم</span>
                    )}
                    <div style={styles.imagePlaceholder}>
                      {product.name.charAt(0)}
                    </div>
                  </div>
                  <div style={styles.productInfo}>
                    <h3 style={styles.productName}>{product.name}</h3>
                    <p style={styles.productCategory}>{product.category?.name}</p>
                    <div style={styles.productPrice}>
                      {product.sale_price ? (
                        <>
                          <span style={styles.currentPrice}>{product.sale_price} ر.س</span>
                          <span style={styles.oldPrice}>{product.price} ر.س</span>
                        </>
                      ) : (
                        <span style={styles.currentPrice}>{product.price} ر.س</span>
                      )}
                    </div>
                    <span style={styles.stockStatus}>
                      {product.stock > 0 ? '🟢 متوفر' : '🔴 غير متوفر'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={styles.productsLink}>
            <Link href="/products" style={styles.viewAllButton}>
              عرض جميع المنتجات
            </Link>
          </div>
        </section>

        {/* الفوتر */}
        <footer style={styles.footer}>
          <p>© 2024 متجر الإكسسوارات. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '1rem 0',
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
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    fontWeight: '500',
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '4rem 1rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: 'white',
    color: '#3b82f6',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  productsSection: {
    maxWidth: '1200px',
    margin: '4rem auto',
    padding: '0 1rem',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    fontSize: '1.125rem',
    color: '#6b7280',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#6b7280',
    padding: '2rem',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s',
  },
  productImage: {
    position: 'relative',
    height: '200px',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saleBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
  },
  imagePlaceholder: {
    width: '80px',
    height: '80px',
    backgroundColor: '#d1d5db',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    color: '#6b7280',
  },
  productInfo: {
    padding: '1.5rem',
  },
  productName: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  productCategory: {
    color: '#6b7280',
    fontSize: '0.875rem',
    marginBottom: '1rem',
  },
  productPrice: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  currentPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  oldPrice: {
    fontSize: '1rem',
    color: '#9ca3af',
    textDecoration: 'line-through',
  },
  stockStatus: {
    fontSize: '0.875rem',
  },
  productsLink: {
    textAlign: 'center',
  },
  viewAllButton: {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    textAlign: 'center',
    padding: '2rem 1rem',
    marginTop: '4rem',
  },
};
