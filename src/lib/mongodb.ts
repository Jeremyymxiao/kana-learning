import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

const globalWithMongo = global as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>
}

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!globalWithMongo.mongoClientPromise) {
    const client = new MongoClient(uri, options)
    globalWithMongo.mongoClientPromise = client
      .connect()
      .catch(err => {
        console.error('Failed to connect to MongoDB:', err)
        throw err
      })
  }
  clientPromise = globalWithMongo.mongoClientPromise
} else {
  const client = new MongoClient(uri, options)
  clientPromise = client
    .connect()
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err)
      throw err
    })
}

export default clientPromise