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
import { useEffect, useState } from "react"
import { useSpotify } from "../../lib/spotify"
import { currentTrackIdState, isPlayingState } from "../../atom/songAtom"
import { useRecoilState, useRecoilValue } from "recoil"

const Player = () => {
  const spotifyApi = useSpotify()
  const [playState, setPlayState] = useRecoilState(isPlayingState)
  const currentTrackId = useRecoilValue(currentTrackIdState)
  const [songCurrentTime, setSongCurrentTime] = useState<String>()
  // useEffect(() => {
  //   if (spotifyApi.getAccessToken()) {
  //     spotifyApi
  //       .play()
  //       .then(() => console.log("Playback Started"))
  //       .catch((err: any) => console.log("Error", err))
  //   }
  // }, [])

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
            <FastForwardIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="rounded-xl bg-[#f4f5ff] p-1">
            <VolumeOffIcon className="h-5 w-5" />
          </div>
          <div>------*-</div>
          <div className="rounded-xl bg-[#f4f5ff] p-1">
            <VolumeUpIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>00:00</div>

        <div>99:99</div>
      </div>
    </div>
  )
}

export default Player
