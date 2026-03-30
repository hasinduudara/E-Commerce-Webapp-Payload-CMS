'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../../context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart, cartTotal } = useCart()

  // 1. Empty State (ඇහැට පහසු විදියට ප්‍රමාණය අඩු කළා)
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm flex flex-col items-center text-center max-w-sm w-full border border-gray-200 animate-fade-in-up">
          
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-5 border border-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added anything yet.</p>
          
          <Link 
            href="/products" 
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all w-full text-sm"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  // 2. Cart Items List (සුදු ගතිය අඩු කරලා, අකුරු ගානට හැදුවා)
  return (
    <main className="min-h-screen bg-stone-100 pt-28 pb-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight text-center md:text-left">
          Shopping Cart
        </h1>

        {/* Cart Items List */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <ul className="divide-y divide-gray-100">
            {cart.map((item) => {
              const imageUrl = typeof item.product.image === 'object' && item.product.image?.url 
                ? item.product.image.url 
                : ''

              return (
                <li key={item.product.id} className="p-5 md:p-6 flex flex-col sm:flex-row items-center gap-5 hover:bg-gray-50 transition-colors">
                  
                  {/* Product Image - Size reduced */}
                  <div className="relative h-20 w-20 bg-stone-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-medium">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details & Quantity - Text reduced */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-gray-900">{item.product.title}</h2>
                    <p className="text-gray-500 mt-1 text-sm font-medium flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-blue-600">Rs. {item.product.price}</span>
                      <span className="text-gray-300">×</span> 
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-md text-xs font-bold">{item.quantity}</span>
                    </p>
                  </div>

                  {/* Item Total Price and Remove Action */}
                  <div className="text-right flex flex-col items-center sm:items-end gap-2">
                    <span className="text-xl font-bold text-gray-900 tracking-tight">
                      Rs. {item.product.price * item.quantity}
                    </span>
                    
                    {/* Remove Button - Size reduced */}
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="group flex items-center gap-1 text-red-500 text-xs font-semibold hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 group-hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Cart Summary & Checkout Button */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          
          <div className="flex flex-col items-center md:items-start relative z-10">
            <p className="text-gray-500 font-bold mb-1 uppercase tracking-wider text-xs">Total Amount</p>
            <p className="text-3xl font-extrabold text-gray-900 tracking-tight">Rs. {cartTotal}</p>
          </div>

          <Link 
            href="/checkout"
            className="relative z-10 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 transition-all shadow-sm hover:shadow-blue-500/20 w-full md:w-auto text-center"
          >
            Proceed to Checkout
          </Link>
          
        </div>

      </div>
    </main>
  )
}