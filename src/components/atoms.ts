import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { IBoard } from "./interface";

const { persistAtom } = recoilPersist();

export const boardsState = atom<IBoard[]>({
  key: "boards",
  default: [{
    id: 0,
    name: "Main",
    lists: [
      {
        id: 0,
        name: "To Do",
        cards: [{id: 0, text: "first thing to do"}]
      },
      {
        id: 1,
        name: "Doing",
        cards: []
      },
      {
        id: 2,
        name: "Done",
        cards: []
      },
    ]
  }],
  effects_UNSTABLE: [persistAtom],
});

export const boardId = atom<number>({
  key: "boardId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
