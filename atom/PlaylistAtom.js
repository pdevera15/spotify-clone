import { atom } from "recoil"

/**
 * Selected playlist id
 */
export const selectedPlaylistState = atom({
  key: "selectedPlaylistState",
  default: { id: "", playlistName: "" },
})
