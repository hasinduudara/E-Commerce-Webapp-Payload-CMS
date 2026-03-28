import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
              E-Store
            </Link>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs">
              Your one-stop shop for premium tech, fashion, and lifestyle essentials.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/products" className="hover:text-blue-600">All Products</Link></li>
              <li><Link href="/products?category=Electronics" className="hover:text-blue-600">Electronics</Link></li>
              <li><Link href="/products?category=Fashion" className="hover:text-blue-600">Fashion</Link></li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/login" className="hover:text-blue-600">Log In</Link></li>
              <li><Link href="/register" className="hover:text-blue-600">Register</Link></li>
              <li><Link href="/cart" className="hover:text-blue-600">View Cart</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} E-Store Lanka (Pvt) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}