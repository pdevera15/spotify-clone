import { signIn, signOut, useSession } from "next-auth/react"
import { spotifyApi } from "../lib/spotify"
import { useEffect } from "react"
import * as url from "url"

const Login = () => {
  const { data, status } = useSession()
  spotifyApi.setAccessToken(data?.accessToken)
  useEffect(() => {
    if (spotifyApi.getAccessToken())
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then(({ body }: any) => console.log(body))
        .catch((e: any) => {
          console.log(e)
        })
  }, [data])
  return (
    <>
      {data && status === "authenticated" ? (
        <div className="flex justify-between my-4 text-xs">
          <span className="text-sm">Hi! {data?.user?.name}</span>
          <a onClick={() => signOut()}>Logout</a>
        </div>
      ) : (
        <button
          className="rounded-lg bg-emerald-500 px-5 py-2 text-white"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </>
  )
}
export default Login
