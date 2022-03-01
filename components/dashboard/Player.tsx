import {
  HeartIcon,
  MusicNoteIcon,
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/solid"
import { useCallback, useEffect, useState } from "react"
import { useSpotify } from "../../lib/spotify"
import { currentTrackIdState, isPlayingState } from "../../atom/songAtom"
import { useRecoilState, useRecoilValue } from "recoil"
import toast from "react-hot-toast"

const Player = () => {
  const spotifyApi = useSpotify()
  const [playState, setPlayState] = useRecoilState(isPlayingState)
  const currentTrackId = useRecoilValue(currentTrackIdState)
  const [songCurrentTime, setSongCurrentTime] = useState<String>()
  const [volume, setVolume] = useState<number>(50)
  useEffect(() => {
    adjustVolumeHandler(volume)
  }, [spotifyApi, volume])

  const adjustVolumeHandler = useCallback(
    (volume) => {
      setTimeout(
        () =>
          spotifyApi
            .setVolume(volume)
            .then(() => console.log(`Volume set to ${volume}`)),
        500
      )
    },
    [spotifyApi]
  )

  const nextSongHandler = () => {
    console.log("next Song")
    spotifyApi
      .skipToNext()
      .then(() => toast("Playing Next Song"))
      .catch((error: Error) => toast.error(`${error}`))
  }
  const playButtonHandler = (play: boolean) => {
    spotifyApi
      .getMyCurrentPlayingTrack()
      .then(({ body }: any) => setSongCurrentTime(body.progress_ms))

    if (!play) {
      spotifyApi
        .play({ uris: [currentTrackId], position_ms: songCurrentTime })
        .then(() => console.log("Player Play"))
        .catch((err: any) => console.error("Error", err))
    } else {
      spotifyApi
        .pause()
        .then(() => console.log("Player Pause"))
        .catch((err: any) => console.error("Error", err))
    }
    setPlayState(!play)
  }
  return (
    <div className="mt-5  flex flex-col gap-2 bg-white p-5 rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="rounded-xl bg-[#f4f5ff] p-1">
            <HeartIcon className="h-5 w-5" />
          </div>
          <div className="rounded-xl bg-[#f4f5ff] p-1">
            <MusicNoteIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-xl bg-[#f4f5ff] p-1">
            <RewindIcon className="h-5 w-5" />
          </div>

          <div className="rounded-xl bg-[#f4f5ff] p-1">
            {playState ? (
              <PauseIcon
                className="h-10 w-10"
                onClick={() => playButtonHandler(playState)}
              />
            ) : (
              <PlayIcon
                className="h-10 w-10"
                onClick={() => playButtonHandler(playState)}
              />
            )}
          </div>

          <div className="rounded-xl bg-[#f4f5ff] p-1">
            <FastForwardIcon
              onClick={() => nextSongHandler()}
              className="h-5 w-5"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-xl bg-[#f4f5ff] p-1">
            <VolumeOffIcon
              className="h-5 w-5"
              onClick={() => volume > 0 && setVolume(volume - 10)}
            />
          </div>
          <div>
            <input
              type="range"
              value={volume}
              min={0}
              max={100}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>
          <div className="rounded-xl bg-[#f4f5ff] p-1">
            <VolumeUpIcon
              className="h-5 w-5"
              onClick={() => volume < 100 && setVolume(volume + 10)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
