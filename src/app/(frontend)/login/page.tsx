'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        // 1. get user data from response
        const data = await res.json()
        
        // 2. Check user role 
        if (data?.user?.role === 'admin') {
          // Admin user --> Admin dashboard
          window.location.href = '/admin' 
        } else {
          // Normal user --> Home page 
          window.location.href = '/'
        }
        
      } else {
        setError('Invalid email or password.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* Brand Logo or Name above the form (Optional but looks premium) */}
      <Link href="/" className="mb-8 text-3xl font-extrabold text-gray-900 hover:text-blue-600 transition tracking-tight">
        E-Store
      </Link>

      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-10 text-black border border-gray-100">
        
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8 font-medium">Sign in to your account to continue</p>

        {error && (
          <div className="bg-red-50/80 border border-red-100 text-red-600 p-4 rounded-xl mb-6 text-sm text-center font-medium shadow-sm animate-fade-in-up">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input 
              required 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white" 
              placeholder="you@example.com" 
            />
          </div>
          
          {/* Password Field with Show/Hide Toggle */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <Link href="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input 
                required 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-4 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white" 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
              >
                {/* SVG Icon changes based on showPassword state */}
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-black text-white p-4 rounded-xl font-bold hover:bg-gray-900 transition-all hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 font-medium">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-800 hover:underline font-bold transition">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}