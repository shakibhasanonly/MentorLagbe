import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields, jwtClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',

  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
          required: true,
        },
        plan: {
          type: 'string',
          required: false,
        },
      },
    }),

    jwtClient(),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
