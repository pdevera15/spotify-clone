import { useEffect, useState } from "react"
import { useSpotify } from "../../lib/spotify"
import { useRecoilValue, useRecoilState } from "recoil"
import { selectedPlaylistState } from "../../atom/selectedPlaylistAtom"
import { currentTrackIdState, isPlayingState } from "../../atom/songAtom"
import toast from "react-hot-toast"

const Playlist = () => {
  const [playlistTracks, setPlaylistTracks] = useState<any>({})
  const [playlistInfo, setPlaylistInfo] = useState<any>({})
  const spotifyApi = useSpotify()
  const selectedPlaylist = useRecoilValue(selectedPlaylistState)
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylistTracks(selectedPlaylist, {})
        .then(({ body }: any) => {
          setPlaylistTracks(body)
        })
        .catch((e: any) => console.log(e))
      spotifyApi
        .getPlaylist(selectedPlaylist, {})
        .then(({ body }: any) => {
          setPlaylistInfo(body)
        })
        .catch((e: any) => console.log(e))
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylistTracks(selectedPlaylist, {})
        .then(({ body }: any) => {
          setPlaylistTracks(body)
        })
    }
  }, [selectedPlaylist, spotifyApi])

  const playSong = (id: any, uri: any) => {
    setCurrentTrackId(uri)
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .play({ uris: [uri] })
        .then(() => console.log("Song Play"))
        .then(() => setIsPlaying(true))
        .catch((error: Error) => toast.error(`${error.message}`))
    }
  }
  const millisToMinutesAndSeconds = (millis: any) => {
    let minutes = Math.floor(millis / 60000)
    let seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
  }

  const artistHandler = (artists: Array<Object>) => {
    let sumartist: any = []
    if (artists && artists.length > 0) {
      artists.map((artist: any) => {
        sumartist.push(artist.name)
      })
    }
    return sumartist.join(", ")
  }

  return (
    <div className="flex-initial overflow-auto h-full">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-4xl">{playlistInfo.name}</h1>
      </div>
      <table className="table-fixed min-w-full border-collapse">
        <thead className="text-xs text-slate-500 text-left">
          <tr>
            <th className="py-3 w-1/12">#</th>
            <th className="py-3 w-4/12">TITLE</th>
            <th className="py-3 w-3/12">ARTIST</th>
            <th className="py-3 w-2/12">TIME</th>
            <th className="py-3 w-2/12">ALBUM</th>
          </tr>
        </thead>
        <tbody className="text-left text-slate-700">
          {playlistTracks?.items?.map(({ track }: any, key: any) => {
            return (
              <tr
                key={key}
                className={
                  currentTrackId === track?.uri
                    ? "bg-white py-1 rounded-lg"
                    : ""
                }
                onClick={() => playSong(track?.id, track?.uri)}
              >
                <th className="py-3 w-1/12">{++key}</th>
                <th className="py-3 w-4/12">
                  <div className="truncate w-40">{track?.name}</div>
                </th>
                <th className="overflow-hidden py-3 w-4/12">
                  <div className="truncate w-40">
                    {artistHandler(track?.artists)}
                  </div>
                </th>
                <th className="overflow-hidden py-3 w-1/12">
                  {millisToMinutesAndSeconds(track?.duration_ms)}
                </th>
                <th className="py-3 w-2/12">
                  <div className="truncate w-40">{track?.album?.name}</div>
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Playlist
