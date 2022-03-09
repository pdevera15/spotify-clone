import { useEffect, useState } from "react"
import { useSpotify } from "../../lib/spotify"

const Trending = () => {
  const spotifyApi = useSpotify()
  const [trending, setTrending] = useState<any>({})
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getFeaturedPlaylists({
          limit: 1,
          country: "JP",
        })
        .then(({ body }: any) => {
          setTrending(body)
        })
    }
  }, [spotifyApi])
  return (
    <>
      <div>
        <h1 className="text-sm text-slate-500 mb-2">What is Hot 🥵</h1>
        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl">Trending</h1>
          <h1 className="text-sm text-slate-500">More</h1>
        </div>
      </div>
      <div
        className={`flex flex-col justify-center gap-3 w-full bg-white rounded-xl px-8 py-5 my-5`}
      >
        <span className="text-slate-400 text-sm">Artist</span>
        <span className="text-4xl"></span>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <button className="bg-black text-white py-1 px-6 rounded-full">
              Play
            </button>
            <button className="py-1 px-6 rounded-full border-black border-2">
              Follow
            </button>
          </div>
          <div className="flex flex-col justify-end">
            <span className="text-sm">Monthly Listener</span>
            <span className="text-sm text-right">10,000</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Trending
