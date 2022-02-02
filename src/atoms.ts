import { atom, selector } from "recoil";

export interface IForm {
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
});

export const toDosState = atom<IToDo[]>({
  key: "toDos",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});