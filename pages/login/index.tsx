import type { NextPage } from "next"
import Image from "next/image"
import spotifyLogo from "../../assets/Spotify_Icon_CMYK_Green.png"
import { signIn } from "next-auth/react"

const LoginPage: NextPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-5">
        <Image
          src={spotifyLogo}
          alt="spotify"
          height={"250px"}
          width={"250px"}
        />
        <button
          onClick={() => signIn("Spotify", { callbackUrl: "/" })}
          className="rounded-full text-white bg-black p-5"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  )
}

export default LoginPage
