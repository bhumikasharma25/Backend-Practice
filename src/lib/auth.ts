import "dotenv/config";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url }) => {
      console.log("=================================");
      console.log("PASSWORD RESET REQUEST");
      console.log("User:", user.email);
      console.log("Reset URL:", url);
      console.log("=================================");
    },
  },
  socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
},

  trustedOrigins: [
    "http://localhost:5173",
  ],

  baseURL: process.env.BETTER_AUTH_URL,
});