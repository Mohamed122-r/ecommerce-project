
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { productAPI } from '../lib/api';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productAPI.getFeaturedProducts();
        setFeaturedProducts(response.data.data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <Head>
        <title>متجر الإكسسوارات - أفضل إكسسوارات الجوالات</title>
        <meta name="description" content="اكتشف أحدث إكسسوارات الجوالات من كفرات، شواحن، سماعات، وأكثر" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-l from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              أحدث إكسسوارات الجوالات
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              اكتشف مجموعة واسعة من الكفرات، الشواحن، السماعات، والإكسسوارات المميزة
            </p>
            <Link 
              href="/products"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-200"
            >
              تسوق الآن
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">منتجات مميزة</h2>
              <p className="text-gray-600 text-lg">أفضل الإكسسوارات المختارة بعناية</p>
            </div>

            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative">
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">صورة المنتج</span>
                        </div>
                        {product.sale_price && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                            خصم
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {product.sale_price ? (
                              <>
                                <span className="text-lg font-bold text-gray-800">
                                  {product.sale_price} ر.س
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {product.price} ر.س
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-gray-800">
                                {product.price} ر.س
                              </span>
                            )}
                          </div>
                          <span className={`text-sm px-2 py-1 rounded ${
                            product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock > 0 ? 'متوفر' : 'غير متوفر'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link 
                href="/products"
                className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
              >
                عرض جميع المنتجات
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
