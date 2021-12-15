import { atom } from "recoil";

export const DARKMODE_STATE = "darkmode";

export const darkModeState = atom<boolean>({
  key: "darkModeState",
  default: Boolean(localStorage.getItem(DARKMODE_STATE)),
});
