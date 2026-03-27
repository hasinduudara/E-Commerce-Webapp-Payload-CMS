import { getPayload } from 'payload'
import config from '../../payload.config' 
import React from 'react'
import Image from 'next/image'

export default async function HomePage() {
  // 1. Initialize Payload instance
  const payload = await getPayload({ config })

  // 2. Fetch products from the database
  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 1, // Populate relationships like categories and media
  })

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Our E-Commerce Store
        </h1>

        {/* 3. Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            // Safely extract the image URL
            const imageUrl = typeof product.image === 'object' && product.image?.url 
              ? product.image.url 
              : '' 

            return (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">
                      Rs. {product.price}
                    </span>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No products available at the moment.
          </div>
        )}
      </div>
    </main>
  )
}