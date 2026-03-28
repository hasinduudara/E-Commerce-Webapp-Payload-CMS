import { getPayload } from 'payload'
import config from '../../../payload.config' 
import React from 'react'
import ProductCatalog from '../../../components/ProductCatalog'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch products and categories from the database
  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 1, 
  })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    depth: 0, 
  })

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Our E-Commerce Store
        </h1>

        {/* Render the interactive catalog component */}
        <ProductCatalog initialProducts={products} categories={categories} />
        
      </div>
    </main>
  )
}