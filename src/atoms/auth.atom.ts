import { atom } from "recoil";

export const TOKEN = "x-jwt";

export const authState = atom<boolean>({
  key: "authState",
  default: Boolean(localStorage.getItem(TOKEN)),
});
