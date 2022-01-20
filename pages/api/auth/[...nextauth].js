import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
import { loginUrl } from "../../../lib/spotify"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Spotify({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: loginUrl,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  },
})
