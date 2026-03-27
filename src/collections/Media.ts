import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Allow anyone to view the uploaded images (Public access)
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for the image (used for SEO and accessibility).',
      },
    },
  ],
  // Enable file uploads for this collection
  upload: true,
}