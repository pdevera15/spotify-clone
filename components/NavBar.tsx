import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useSpotify } from "../lib/spotify"
import PlaylistList from "./PlaylistList"
import Login from "./Login"

const NavBar = () => {
  const { data, status } = useSession()
  const spotifyApi = useSpotify()
  const [playlist, setPlaylist] = useState<any>([])

  // Getting user Playlists
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then(({ body }: any) => setPlaylist(body.items))
        .catch(() => console.log("ERROR"))
    }
  }, [data, spotifyApi])

  return (
    <div className={"h-screen w-96 p-4 overflow-auto"}>
      <Login />
      <div className="my-8">Spotify Clone</div>
      <div className="text-xs text-slate-500 p-3">My Playlist</div>
      <div className="flex flex-col text-slate-500">
        {playlist.map((playlist: any, index: string) => (
          <PlaylistList
            key={index}
            name={playlist.name}
            id={playlist.id}
            image_url={playlist.images[0].url}
          />
        ))}
      </div>
    </div>
  )
}
export default NavBar
