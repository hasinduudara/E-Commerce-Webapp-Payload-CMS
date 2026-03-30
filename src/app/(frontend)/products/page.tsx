import { getPayload } from 'payload'
import config from '../../../payload.config' 
import React from 'react'
import ProductCatalog from '../../../components/ProductCatalog'

export default async function ProductsPage() {
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
    <main className="min-h-screen bg-stone-50 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* Compact Page Header
        - Background changed to bg-stone-100 (soft grey) to reduce stark whiteness.
        - Padding reduced (pt-16 pb-8 on mobile, md:pt-24 md:pb-12 on desktop) to take less space.
      */}
      <div className="bg-stone-100 border-b border-stone-200 pt-16 pb-8 md:pt-10 md:pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Discover Our Collection
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Explore our curated selection of premium products, designed to elevate your lifestyle.
          </p>
        </div>
      </div>

      {/* Catalog Section - Spacing adjusted to bring products up closer 👇 */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16 md:pt-12 md:pb-24">
        {/* Render the interactive catalog component */}
        <ProductCatalog initialProducts={products} categories={categories} />
      </div>

    </main>
  )
}