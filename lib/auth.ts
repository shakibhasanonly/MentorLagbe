import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { jwt } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is missing from environment variables');
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error('BETTER_AUTH_SECRET is missing from environment variables');
}

const client = new MongoClient(mongoUri);
const db = client.db('mentorlagbe');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  plugins: [jwt()],

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  user: {
    modelName: 'users',

    additionalFields: {
      role: {
        type: ['student', 'tutor'],
        required: true,
        input: true,
      },
      plan: {
        type: ['free', 'pro'],
        required: false,
        defaultValue: 'free',
        input: false,
      },
    },
  },
});
