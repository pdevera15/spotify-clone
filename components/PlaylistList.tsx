import React from "react"
import { useRecoilState } from "recoil"
import { selectedPlaylistState } from "../atom/PlaylistAtom"
import Image from "next/image"

interface PlaylistListIf {
  key: React.Key
  id: string
  image_url: string
  name: string
}

const PlaylistList = ({ id, image_url, name }: PlaylistListIf) => {
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(
    selectedPlaylistState
  )

  const setSelectedPlaylistHandler = (id: string, playlistName: string) => {
    return { id, playlistName }
  }
  const highlighthandler = (id1: String, id2: String) => {
    return id1 === id2 ? " bg-black text-white" : ""
  }

  return (
    <div
      className={
        "rounded-md px-3 flex items-center cursor-pointer my-1 hover:bg-black hover:text-white" +
        highlighthandler(id, selectedPlaylist.id)
      }
      onClick={() =>
        setSelectedPlaylist(Object.assign({}, { id: id, playlistName: name }))
      }
    >
      <div className="flex-none w-6 h-6">
        <Image src={image_url} alt="desc" height={50} width={50} />
      </div>
      <div className={"flex gap-3 p-3 rounded-lg w-full"}>
        <div className="truncate">{name}</div>
      </div>
    </div>
  )
}

export default PlaylistList
