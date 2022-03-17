import Player from "./dashboard/Player"
import SongList from "./dashboard/Songlist"

const Dastboard = () => {
  return (
    <div className="flex flex-col bg-dbbgcolor w-screen p-5 h-screen">
      <div className="h-full flex flex-col justify-between ">
        <div className="flex items-center gap-10 mb-8"></div>
        <SongList />
        <Player />
      </div>
    </div>
  )
}
export default Dastboard
