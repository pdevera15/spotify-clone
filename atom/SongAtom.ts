import { atom } from "recoil"

/**
 * Current Track ID
 */
export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null,
})

/**
 * Current Track State
 * playing or pause
 */
export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
})
