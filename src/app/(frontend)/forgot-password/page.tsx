'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMessage(data.errors?.[0]?.message || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-stone-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-stone-900 mb-2">Forgot Password?</h2>
          <p className="text-stone-500">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center">
            <div className="bg-green-50 text-green-700 p-4 rounded-2xl mb-6">
              Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.
            </div>
            <Link 
              href="/login"
              className="inline-block text-stone-900 font-medium hover:underline"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            {status === 'error' && (
              <div className="text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-stone-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center mt-6">
              <Link 
                href="/login"
                className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                Remember your password? Login here
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}