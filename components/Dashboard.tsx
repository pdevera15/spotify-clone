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

const Dastboard = () => {
  return (
    <div className="bg-dbbgcolor w-screen p-5 h-screen">
      <div className="lg:w-8/12 h-full">
        <div className="flex items-center gap-10 mb-8">
          <ArrowLeftIcon className="h-5 w-5" />
          <ArrowRightIcon className="h-5 w-5" />
          <input
            className="rounded-full py-3 px-5 w-full grow"
            placeholder="Search for artist, song and ..."
          />
        </div>
        <Trending />
        <Playlist />
        <Player />
      </div>
    </div>
  )
}
export default Dastboard
