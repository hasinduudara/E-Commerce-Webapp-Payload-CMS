import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import all collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Define the server URL. Falls back to localhost for local development.
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  
  // Allow requests from our frontend URL to fix CORS/CSRF warnings
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  
  // Register all database collections here
  collections: [Users, Media, Categories, Products, Orders],
  
  // Default text editor configuration
  editor: lexicalEditor(),
  
  // Secret key used for JWT tokens and secure sessions
  secret: process.env.PAYLOAD_SECRET || '',
  
  // Auto-generate TypeScript definitions for collections
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  
  // PostgreSQL database configuration using the connection string
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  
  sharp,
  
  // We are leaving plugins empty to save uploaded images locally 
  // (on the company server's disk) instead of using Vercel Blob
  plugins: [],
})