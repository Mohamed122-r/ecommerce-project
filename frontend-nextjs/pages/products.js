import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { productAPI } from '../lib/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          productAPI.getProducts(),
          productAPI.getCategories()
        ]);
        
        setProducts(productsResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Head>
        <title>جميع المنتجات - متجر الإكسسوارات</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">جميع المنتجات</h1>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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
                      <p className="text-gray-600 text-sm mb-3">{product.category?.name}</p>
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
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
