import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HeartIcon,
  MusicNoteIcon,
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/solid"
import Player from "./dashboard/Player"
import Playlist from "./dashboard/Playlist"
import Trending from "./dashboard/Trending"
import { useState } from "react"

const Dastboard = () => {
  const [show, setShow] = useState<Boolean>(true)

  const showAllPlaylistHandler = () => {
    setShow(!show)
  }

  return (
    <div className="flex flex-col bg-dbbgcolor w-screen p-5 h-screen">
      <div className="lg:w-8/12 h-full flex flex-col justify-between ">
        <div className="flex items-center gap-10 mb-8">
          <ArrowLeftIcon className="h-5 w-5" />
          <ArrowRightIcon className="h-5 w-5" />
          <input
            className="rounded-full py-3 px-5 w-full grow"
            placeholder="Search for artist, song and ..."
          />
        </div>
        {show ? <Trending /> : <></>}
        <Playlist setShow={showAllPlaylistHandler} show={show} />
        <Player />
      </div>
    </div>
  )
}
export default Dastboard
