'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../../context/AuthContext'

export default function HomePage() {
  const { user, isLoading } = useAuth()

  return (
    <main className="min-h-screen bg-stone-50 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative z-0 pt-32 pb-20 md:pt-40 md:pb-40 overflow-hidden min-h-[80vh] flex items-center">
        
        {/* Hero Background Image - Right */}
        <Image
          src="/welcome-bg.jpg"
          alt="Hero Background"
          fill
          unoptimized 
          className="object-cover object-[75%_center] -z-20 transition-transform duration-[10s] animate-ken-burns"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50 from-10% via-stone-50/80 via-40% to-transparent to-70% -z-10"></div>

        {/* Content */}
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col items-start text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 text-sm font-medium text-blue-600 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New Products Arrived
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-gray-900 mb-6 animate-fade-in-up max-w-3xl leading-tight"
            style={{ animationDelay: '0.1s' }}
          >
            Elevate Your <br /> Lifestyle with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              E-Store
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-gray-700 max-w-lg mb-10 animate-fade-in-up font-medium leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Discover a curated collection of premium tech, fashion, and lifestyle essentials.
            Quality meets affordability, delivered straight to your door.
          </p>

          <div className="animate-fade-in-up w-full sm:w-auto" style={{ animationDelay: '0.3s' }}>
            {isLoading ? (
              <div className="h-14 w-40 bg-gray-200 animate-pulse rounded-xl"></div>
            ) : user ? (
              <div className="flex justify-start"> 
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 w-full sm:w-auto"
                >
                  Go to Products
                </Link>
              </div>
            ) : (
              <div className="flex justify-start"> 
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-12 py-4 font-bold text-white transition-all duration-200 bg-black rounded-xl hover:bg-gray-800 focus:outline-none shadow-lg hover:shadow-black/30 hover:-translate-y-1 w-full sm:w-auto"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Image Showcase Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 pt-12">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm group">
            <Image
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999"
              alt="Gadgets Showcase"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="text-white font-semibold text-lg">Tech Gadgets</span>
            </div>
          </div>
          <div className="relative h-64 md:h-96 md:-mt-8 rounded-2xl overflow-hidden shadow-sm group">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070"
              alt="Fashion Showcase"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="text-white font-semibold text-lg">Latest Fashion</span>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm group">
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070"
              alt="Accessories Showcase"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="text-white font-semibold text-lg">Premium Accessories</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="bg-white py-24 border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-black relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Why Shop With Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              We don't just sell products; we deliver an experience. Here's what makes us different.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-stone-50 hover:bg-white transition-all duration-300 border border-black hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">
                Lightning Fast Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Experience premium shipping. Get your products exactly when you need them.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-stone-50 hover:bg-white transition-all duration-300 border border-black hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 border border-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">
                Curated Quality
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Every hand-picked item verified to ensure it meets strict quality standards.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-stone-50 hover:bg-white transition-all duration-300 border border-black hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 border border-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">
                100% Secure Checkout
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Data safe with us. Bank-level encryption protects personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animation CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes kenBurns {
            0% { transform: scale(1) translate(0, 0); }
            50% { transform: scale(1.03) translate(-1%, -1%); }
            100% { transform: scale(1) translate(0, 0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-ken-burns {
            animation: kenBurns 10s ease-in-out infinite;
        }
      `,
        }}
      />
    </main>
  )
}