import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
import { loginUrl, spotifyApi } from "../../../lib/spotify"

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error(error)

    return { ...token, error: "RefreshAccessTokenError" }
  }
}
export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.SECRET,
  providers: [
    Spotify({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: loginUrl,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        }
      }

      // Check if token is expired
      if (Date.now() < token.accessTokenExpires) {
        console.log("Token is valid")
        return token
      }

      console.log("Token Expired")
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username
      return session
    },
  },
})
