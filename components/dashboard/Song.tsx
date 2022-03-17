import React, { Key, useEffect, useState } from "react"

interface SongIf {
  trackNumber: Key
  title: String
  artists: Object[]
  duration_ms: String
  album: String
  date_added: String
}

function Song({
  trackNumber,
  title,
  artists,
  duration_ms,
  album,
  date_added,
}: SongIf) {
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
  return (
    <div className="flex flex-row justify-around w-100">
      <div className="flex-none w-16">{trackNumber}</div>
      <div className="flex-none w-64">{title}</div>
      <div className="flex-auto">{album}</div>
      <div className="flex-auto">{date_added}</div>
      <div className="flex-auto">{millisToMinutesAndSeconds(duration_ms)}</div>
    </div>
  )
}

export default Song
