import React from 'react'
import Link from 'next/link'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-sm max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          {/* Checkmark SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your order has been placed successfully using Cash on Delivery. 
          We will contact you shortly to confirm the delivery.
        </p>
        <Link 
          href="/" 
          className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition block w-full"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}