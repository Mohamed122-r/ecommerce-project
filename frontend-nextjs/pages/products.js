import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://mohamedalamin.wuaze.com/api/products');
        const data = await response.json();
        
        if (data.status === 'success') {
          setProducts(data.data);
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
        <title>جميع المنتجات - متجر الإكسسوارات</title>
      </Head>

      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.nav}>
            <Link href="/" style={styles.logo}>📱 متجر الإكسسوارات</Link>
            <nav style={styles.navLinks}>
              <Link href="/" style={styles.navLink}>الرئيسية</Link>
              <Link href="/products" style={styles.navLink}>المنتجات</Link>
            </nav>
          </div>
        </header>

        <main style={styles.main}>
          <h1 style={styles.title}>جميع المنتجات</h1>
          
          {loading ? (
            <div style={styles.loading}>جاري تحميل المنتجات...</div>
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
                    <p style={styles.productDescription}>
                      {product.description || 'وصف المنتج غير متوفر'}
                    </p>
                    <p style={styles.productCategory}>
                      📁 {product.category?.name}
                    </p>
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
                    <div style={styles.productMeta}>
                      <span style={styles.stock}>
                        {product.stock > 0 ? '🟢 متوفر' : '🔴 غير متوفر'}
                      </span>
                      <span style={styles.sku}>SKU: {product.sku}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
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
    marginBottom: '2rem',
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
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#6b7280',
    padding: '4rem',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
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
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  productDescription: {
    color: '#6b7280',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    lineHeight: '1.5',
  },
  productCategory: {
    color: '#3b82f6',
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
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  oldPrice: {
    fontSize: '1.125rem',
    color: '#9ca3af',
    textDecoration: 'line-through',
  },
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  stock: {
    fontWeight: '500',
  },
  sku: {
    fontFamily: 'monospace',
  },
};
