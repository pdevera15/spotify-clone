import { useEffect, useState } from "react"
import {
  HomeIcon,
  TrendingUpIcon,
  RssIcon,
  BackspaceIcon,
} from "@heroicons/react/solid"
import Login from "./Login"
import { useSession } from "next-auth/react"
import { useSpotify } from "../lib/spotify"
import Image from "next/image"
import { useSetRecoilState } from "recoil"
import { selectedPlaylistState } from "../atom/selectedPlaylistAtom"
const NavBar = () => {
  const { data, status } = useSession()
  const spotifyApi = useSpotify()
  const [show, setShow] = useState<Boolean>(true)
  const [playlist, setPlaylist] = useState<any>([])
  const setSelectPlaylist = useSetRecoilState(selectedPlaylistState)
  const closehandler = (e: any) => {
    setShow(!show)
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists({ limit: 5 })
        .then(({ body }: any) => setPlaylist(body?.items))
    }
  }, [data, spotifyApi])

  return (
    <div className={"h-screen w-72 p-4 "}>
      <div className="flex flex-row-reverse">
        <BackspaceIcon onClick={(e) => closehandler(e)} className="w-6 h-6" />
      </div>
      <Login />
      <div className="my-8">Spotify Clone</div>
      <div className="w-3/4">
        <div className="flex gap-3 bg-black text-white p-3 rounded-lg">
          <HomeIcon className="w-6 h-6" />
          Home
        </div>
        <div className="flex gap-3 text-slate-500 p-3 rounded-lg">
          <TrendingUpIcon className="w-6 h-6" />
          Trending
        </div>
        <div className="flex gap-3 text-slate-500 p-3 rounded-lg">
          <RssIcon className="w-6 h-6" />
          Feed
        </div>
      </div>
      <div className="text-xs text-slate-500 p-3">My Playlist</div>
      <div className="flex flex-col">
        {playlist.map((playlist: any) => (
          <div
            key={playlist.id}
            className="px-3 flex items-center cursor-pointer hover:bg-black hover:text-white"
            onClick={() => setSelectPlaylist(playlist.id)}
          >
            <div className="flex-none w-6 h-6">
              <Image
                src={playlist.images[0].url}
                alt="desc"
                height={50}
                width={50}
              />
            </div>
            <div className="flex gap-3 text-slate-500 p-3 rounded-lg w-full">
              <div className="truncate">{playlist?.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default NavBar
