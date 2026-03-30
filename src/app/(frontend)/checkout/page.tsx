'use client'

import React, { useState, useEffect } from 'react'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext' 
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth() 
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      
      // Format the address by filtering out empty parts and joining with commas
      let formattedAddress = ''
      if (user.address) {
        const addr = user.address
        // Filter out empty parts and join with commas
        formattedAddress = [
          addr.street, 
          addr.city, 
          addr.state, 
          addr.postalCode, 
          addr.country
        ].filter(Boolean).join(', ') 
        
        // Eg: "No 1, Main Street, Galle, Southern Province, 004132, Sri Lanka"
      }

      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        address: formattedAddress, // The formatted address
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return

    setLoading(true)

    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: formData.address,
      items: cart.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      })),
      totalAmount: cartTotal,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        clearCart()
        router.push('/order-success')
      } else {
        const errorData = await response.json()
        alert(`Failed to place order: ${errorData.errors?.[0]?.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Order submission error:', error)
      alert("An error occurred while placing your order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return <div className="p-8 text-center mt-20 text-xl text-black">Your cart is empty. Please add items to checkout.</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipping Details</h2>
          
          {/* Show a small message if logged in */}
          {user && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">
              Logged in as <strong>{user.email}</strong>. Your details have been auto-filled.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
              <textarea required name="address" rows={3} value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400 transition shadow-sm"
              >
                {loading ? 'Processing...' : 'Place Order (Cash on Delivery)'}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
          <ul className="divide-y divide-gray-100 mb-4">
            {cart.map((item) => (
              <li key={item.product.id} className="py-3 flex justify-between">
                <span className="text-gray-600">{item.product.title} <span className="text-sm font-bold ml-1 text-gray-900">x{item.quantity}</span></span>
                <span className="font-medium text-gray-900">Rs. {item.product.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">Rs. {cartTotal}</span>
          </div>
        </div>

      </div>
    </main>
  )
}