import { useEffect, useState } from "react"
import { useSpotify } from "../../lib/spotify"
import { useRecoilValue } from "recoil"
import { selectedPlaylistState } from "../../atom/selectedPlaylistAtom"
const Playlist = () => {
  const [playlistTracks, setPlaylistTracks] = useState<any>({})
  const [playlistInfo, setPlaylistInfo] = useState<any>({})
  const spotifyApi = useSpotify()
  const selectedPlaylist = useRecoilValue(selectedPlaylistState)

  const artistHandler = (artists: any) => {
    let sumartist: any = []
    artists.map((artist: any) => {
      sumartist.push(artist.name)
    })
    return sumartist.join(", ")
  }
  function millisToMinutesAndSeconds(millis: any) {
    let minutes = Math.floor(millis / 60000)
    let seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
  }
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylistTracks(selectedPlaylist, {})
        .then(({ body }: any) => {
          setPlaylistTracks(body)
        })
        .catch((e: any) => console.log(e))
      spotifyApi
        .getPlaylist(selectedPlaylist, { limit: 5 })
        .then(({ body }: any) => {
          setPlaylistInfo(body)
        })
        .catch((e: any) => console.log(e))
    }
  }, [selectedPlaylist, spotifyApi])
  console.log(playlistTracks)
  return (
    <div className="overflow-y-auto h-2/8">
      <div className="flex justify-between items-baseline">
        <h1 className="text-4xl">{playlistInfo.name}</h1>
        <h1 className="text-sm text-slate-500">Show all</h1>
      </div>
      <table className="table-fixed min-w-full border-collapse">
        <thead className="text-xs text-slate-500 text-left">
          <tr>
            <th className="py-3 w-1/12">#</th>
            <th className="py-3 w-4/12">TITLE</th>
            <th className="py-3 w-4/12">ARTIST</th>
            <th className="py-3 w-1/12">TIME</th>
            <th className="py-3 w-2/12">ALBUM</th>
          </tr>
        </thead>
        <tbody className="text-left text-slate-700">
          {playlistTracks?.items?.map(({ track }: any, key: any) => {
            return (
              <tr key={track.id}>
                <th className="py-3 w-1/12">{++key}</th>
                <th className="py-3 w-4/12">
                  <div className="truncate w-60">{track.name}</div>
                </th>
                <th className="overflow-hidden py-3 w-4/12">
                  <div className="truncate w-48">
                    {artistHandler(track.artists)}
                  </div>
                </th>
                <th className="overflow-hidden py-3 w-1/12">
                  {millisToMinutesAndSeconds(track.duration_ms)}
                </th>
                <th className="py-3 w-2/12">
                  <div className="truncate w-40">{track.album.name}</div>
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
