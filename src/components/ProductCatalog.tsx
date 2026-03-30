'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '../context/CartContext'

// Define prop types for the component
interface ProductCatalogProps {
  initialProducts: any[]
  categories: any[]
}

// 1. ProductCard Component - Represents each product in the catalog
const ProductCard = ({ product, addToCart }: { product: any; addToCart: any }) => {
  // Quantity state for each product card
  const [quantity, setQuantity] = useState(1)

  const imageUrl = typeof product.image === 'object' && product.image?.url ? product.image.url : ''

  const increase = () => setQuantity((prev) => prev + 1)
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    // Pass the selected quantity to the addToCart function
    addToCart(product, quantity)
    // Reset quantity to 1 after adding to cart
    setQuantity(1)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
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

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>

        {/* Price and Add to Cart */}
        <div className="mt-auto pt-4 flex flex-col gap-3">
          <span className="text-xl font-bold text-blue-600">Rs. {product.price}</span>
          
          {/* Quantity Selector and Add to Cart Button */}
          <div className="flex items-center justify-between gap-2">
            
            {/* + / - Button */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={decrease} 
                className="px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-200 font-bold transition focus:outline-none"
              >
                -
              </button>
              <span className="px-3 py-1.5 text-sm font-bold text-gray-900 min-w-[2.5rem] text-center">
                {quantity}
              </span>
              <button 
                onClick={increase} 
                className="px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-200 font-bold transition focus:outline-none"
              >
                +
              </button>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. Main ProductCatalog Component
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
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
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