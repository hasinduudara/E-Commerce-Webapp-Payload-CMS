import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    // Allow anyone to read products for the frontend storefront
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Connects to the Media collection
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories', // Connects to the Categories collection
      hasMany: false,
      required: true,
    },
  ],
}