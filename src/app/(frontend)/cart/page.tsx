'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../../context/CartContext'

export default function CartPage() {
  // 1. Get cart data and functions from context
  const { cart, removeFromCart, cartTotal } = useCart()

  // 2. Render an empty state if no items are in the cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link 
          href="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  // 3. Render the cart items
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {/* Cart Items List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => {
              // Extract image URL safely
              const imageUrl = typeof item.product.image === 'object' && item.product.image?.url 
                ? item.product.image.url 
                : ''

              return (
                <li key={item.product.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  
                  {/* Product Image */}
                  <div className="relative h-24 w-24 bg-gray-100 rounded-md overflow-hidden shrink-0">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details & Quantity */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-gray-900">{item.product.title}</h2>
                    <p className="text-gray-500 mt-1">Rs. {item.product.price} x {item.quantity}</p>
                  </div>

                  {/* Item Total Price and Remove Action */}
                  <div className="text-right flex flex-col items-center sm:items-end gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      Rs. {item.product.price * item.quantity}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 text-sm font-medium hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Cart Summary & Checkout Button */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">Rs. {cartTotal}</p>
          </div>
          <Link 
            href="/checkout"
            className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition w-full md:w-auto text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  )
}