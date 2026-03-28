'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image' 
import { usePathname } from 'next/navigation' 
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext' 

export default function Header() {
  const { cartCount } = useCart()
  const { user } = useAuth() 
  const pathname = usePathname() 
  
  const isHomePage = pathname === '/'

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center text-black">
        
        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition">
          E-Store
        </Link>
        
        <div className="flex items-center gap-4">
          
          {!isHomePage && (
            <Link href="/cart" className="relative p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 transition border border-gray-100 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 group-hover:text-blue-600 transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <Link href="/profile" className="relative w-11 h-11 bg-gray-50 rounded-full hover:bg-gray-100 transition border border-gray-200 group overflow-hidden flex items-center justify-center shadow-sm hover:shadow-md">
              {user.profileImageURL ? (
                <Image src={user.profileImageURL} alt="Profile" fill unoptimized className="object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 group-hover:text-blue-600 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </Link>
          ) : (
             <Link href="/login" className="font-bold text-gray-700 hover:text-blue-600 transition">Log In</Link>
          )}
          
        </div>
      </div>
    </header>
  )
}