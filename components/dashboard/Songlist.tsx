import { Key, useEffect, useState } from "react"
import { useSpotify } from "../../lib/spotify"
import { useRecoilValue, useRecoilState } from "recoil"
import { selectedPlaylistState } from "../../atom/PlaylistAtom"
import { currentTrackIdState, isPlayingState } from "../../atom/SongAtom"
import toast from "react-hot-toast"
import Song from "./Song"

const SongList = () => {
  const selectedPlaylist = useRecoilValue(selectedPlaylistState)
  const [playlistTracks, setPlaylistTracks] = useState<any>()
  const [playlistInfo, setPlaylistInfo] = useState<any>({})
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  // Get tracks of current selected playlist
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylistTracks(selectedPlaylist.id, {})
        .then(({ body }: any) => {
          setPlaylistTracks(body.items)
        })
        .catch((e: any) => console.log(e))
    }
  }, [spotifyApi, selectedPlaylist])

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
  if (!playlistTracks) {
    return null
  }
  console.log(playlistTracks)
  return (
    <div className="flex-initial overflow-auto h-full">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-4xl">{selectedPlaylist.playlistName}</h1>
      </div>
      <div className="flex flex-row justify-around w-100 text-sm h-12 items-center">
        <div className="flex justify-center flex-none w-16">#</div>
        <div className="flex-none w-64">TITLE</div>
        <div className="flex-auto w-64">ALBUM</div>
        <div className="flex-auto w-64">DATE ADDED</div>
        <div className="flex-auto w-64">TIME</div>
      </div>
      {playlistTracks.map((song: any, index: number) => (
        <Song
          key={index + 1}
          trackNumber={index + 1}
          title={song.track?.name}
          artists={song.track?.artists}
          duration_ms={song.track?.duration_ms}
          album={song.track?.album?.name}
          date_added={song.added_at}
          uri={song.track?.uri}
        />
      ))}
    </div>
  )
}

export default SongList
