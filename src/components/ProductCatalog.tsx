'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '../context/CartContext'

// Define prop types for the component
interface ProductCatalogProps {
  initialProducts: any[]
  categories: any[]
}

export default function ProductCatalog({ initialProducts, categories }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { addToCart } = useCart()

  // Filter products based on search term and selected category
  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())

    // Check if the product's category matches the selected category
    const productCategoryName = typeof product.category === 'object' ? product.category?.name : ''
    const matchesCategory = selectedCategory === 'All' || productCategoryName === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const imageUrl =
            typeof product.image === 'object' && product.image?.url ? product.image.url : ''

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
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

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">Rs. {product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State for Filters */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          No products found matching your criteria.
        </div>
      )}
    </div>
  )
}
