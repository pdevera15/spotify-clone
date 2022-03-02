import { useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node"
import * as url from "url"
import { useSession } from "next-auth/react"

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
})

const useSpotify = () => {
  const { data, status } = useSession()

  useEffect(() => {
    console.log("spotifyapi", data)
    data && spotifyApi.setAccessToken(data?.user?.accessToken)
  }, [data])

  return spotifyApi
}

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-private",
  "user-read-email",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "app-remote-control",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
  "playlist-modify-public",
].join(" ")

const params = {
  scope: scopes,
}
const queryParamString = new URLSearchParams(params)

const loginUrl =
  "https://accounts.spotify.com/authorize?" + queryParamString.toString()

export { spotifyApi, loginUrl, useSpotify }
