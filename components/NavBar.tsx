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
import { useRecoilState } from "recoil"
import { selectedPlaylistState } from "../atom/selectedPlaylistAtom"
const NavBar = () => {
  const { data, status } = useSession()
  const spotifyApi = useSpotify()
  const [show, setShow] = useState<Boolean>(true)
  const [playlist, setPlaylist] = useState<any>([])
  const [selectedPlaylist, setSelectPlaylist] = useRecoilState(
    selectedPlaylistState
  )

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists({ limit: 10 })
        .then(({ body }: any) => setPlaylist(body?.items))
    }
  }, [data, spotifyApi])

  const closehandler = (e: any) => {
    setShow(!show)
  }

  const highlighthandler = (id1: String, id2: String) => {
    return id1 === id2 ? " bg-black text-white" : ""
  }

  return (
    <div className={"h-screen w-72 p-4 overflow-auto"}>
      <div className="flex flex-row-reverse">
        <BackspaceIcon onClick={(e) => closehandler(e)} className="w-6 h-6" />
      </div>
      <Login />
      <div className="my-8">Spotify Clone</div>
      <div className="text-xs text-slate-500 p-3">My Playlist</div>
      <div className="flex flex-col text-slate-500">
        {playlist.map((playlist: any) => (
          <div
            key={playlist.id}
            className={
              "rounded-md px-3 flex items-center cursor-pointer my-1 hover:bg-black" +
              highlighthandler(playlist.id, selectedPlaylist)
            }
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
            <div
              className={"flex gap-3 p-3 rounded-lg w-full  hover:text-white"}
            >
              <div className="truncate">{playlist?.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default NavBar
