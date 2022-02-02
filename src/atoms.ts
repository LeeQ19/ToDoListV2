import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export interface IForm {
  newCat?: string;
  toDo: string;
};

export interface IToDo {
  text: string;
  id: number;
  category: number;
};

export const categoryState = atom<number>({
  key: "category",
  default: 0,
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["To Do", "Doing", "Done"],
  effects_UNSTABLE: [persistAtom],
});

export const toDosState = atom<IToDo[]>({
  key: "toDos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});