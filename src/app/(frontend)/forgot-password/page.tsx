'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setMessage('If an account with that email exists, we have sent a password reset link.')
      } else {
        setError('Failed to send reset email. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-black">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Reset Password</h2>
        <p className="text-center text-gray-500 mb-8">Enter your email and we'll send you a reset link.</p>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
        {message && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm text-center">{message}</div>}

        {!message && (
          <form onSubmit={handleForgot} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition mt-4 disabled:bg-gray-400">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link href="/login" className="text-blue-600 hover:underline font-medium text-sm">Back to Login</Link>
        </div>
      </div>
    </div>
  )
}