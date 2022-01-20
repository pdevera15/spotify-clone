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

const Player = () => {
  return (
    <div className="flex flex-col gap-2 bg-white p-5 rounded-xl">
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
            <PauseIcon className="h-10 w-10" />
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
