import { atom } from "recoil";

export const categoryStateAtom = atom<{ id: number; name: string } | null>({
  key: "categoryState",
  default: null,
});
