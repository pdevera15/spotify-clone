import React, { Key, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { spotifyApi } from "../../lib/spotify"
import { useSetRecoilState } from "recoil"
import { isPlayingState } from "../../atom/SongAtom"

interface SongIf {
  trackNumber: Key
  title: String
  artists?: Object[]
  duration_ms?: String
  album?: String
  date_added?: String
  uri: String
}

function Song({
  trackNumber,
  title,
  artists,
  duration_ms,
  album,
  date_added,
  uri,
}: SongIf) {
  const setIsPlayingState = useSetRecoilState(isPlayingState)
  const artistHandler = (artists: Array<Object>) => {
    let sumartist: any = []
    if (artists && artists.length > 0) {
      artists.map((artist: any) => {
        sumartist.push(artist.name)
      })
    }
    return sumartist.join(", ")
  }
  const millisToMinutesAndSeconds = (millis: any) => {
    let minutes = Math.floor(millis / 60000)
    let seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
  }

  const playHandler = (uri: String, title: String) => {
    spotifyApi
      .play({ uris: [uri] })
      .then(() => toast(`${title} Playing`))
      .then(() => setIsPlayingState(true))
      .catch((e: Error) => toast.error(e.message))
  }
  return (
    <div
      onClick={() => playHandler(uri, title)}
      className="cursor-pointer hover:drop-shadow-md hover:bg-white hover:rounded-lg hover:text-black flex flex-row justify-around w-100 h-12 items-center text-gray-500"
    >
      <div className="flex justify-center flex-none w-16">{trackNumber}</div>
      <div className="flex-none w-64 truncate pr-4">{title}</div>
      <div className="flex-auto w-64 truncate pr-4">{album}</div>
      <div className="flex-auto w-64 truncate pr-4">{date_added}</div>
      <div className="flex-auto w-64">
        {millisToMinutesAndSeconds(duration_ms)}
      </div>
    </div>
  )
}

export default Song
