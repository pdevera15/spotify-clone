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
  return (
    <div className="flex flex-col bg-dbbgcolor w-screen p-5 h-screen">
      <div className="h-full flex flex-col justify-between ">
        <div className="flex items-center gap-10 mb-8"></div>
        <Playlist />
        <Player />
      </div>
    </div>
  )
}
export default Dastboard
