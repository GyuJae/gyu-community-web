import { atom } from "recoil";

interface IAuthState {
  status: boolean;
  token: string | null;
}

export const X_JWT_TOKEN = "x-jwt";

export const authStateAtom = atom<IAuthState>({
  key: "authState",
  default: {
    status: Boolean(localStorage.getItem(X_JWT_TOKEN)),
    token: localStorage.getItem(X_JWT_TOKEN),
  },
});
