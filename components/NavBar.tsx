import { useState } from "react"
import {
  HomeIcon,
  TrendingUpIcon,
  RssIcon,
  BackspaceIcon,
} from "@heroicons/react/solid"
import Login from "./Login"

const NavBar = () => {
  const [show, setShow] = useState<Boolean>(true)
  const closehandler = (e: any) => {
    setShow(!show)
  }
  return (
    <div className={"h-screen w-72 p-4 "}>
      <div className="flex flex-row-reverse">
        <BackspaceIcon onClick={(e) => closehandler(e)} className="w-6 h-6" />
      </div>
      <Login />
      <div className="my-8">Spotify Clone</div>
      <div className="w-3/4">
        <div className="flex gap-3 bg-black text-white p-3 rounded-lg">
          <HomeIcon className="w-6 h-6" />
          Home
        </div>
        <div className="flex gap-3 text-slate-500 p-3 rounded-lg">
          <TrendingUpIcon className="w-6 h-6" />
          Trending
        </div>
        <div className="flex gap-3 text-slate-500 p-3 rounded-lg">
          <RssIcon className="w-6 h-6" />
          Feed
        </div>
      </div>
      <div className="text-xs text-slate-500 p-3">Discover</div>
      <div className="w-3/4">
        <div className="flex gap-3 text-slate-500 p-3 rounded-lg">
          <HomeIcon className="w-6 h-6" />
          Home
        </div>
        <div className="flex gap-3 text-slate-500 p-3 rounded-lg">
          <TrendingUpIcon className="w-6 h-6" />
          Trending
        </div>
        <div className="flex gap-3 text-slate-500 p-3 rounded-lg">
          <RssIcon className="w-6 h-6" />
          Feed
        </div>
      </div>
    </div>
  )
}
export default NavBar
