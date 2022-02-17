export interface ICard {
  id: number;
  text: string;
};

export interface IList {
  id: number;
  name: string;
  cards: ICard[];
};

export interface IBoard {
  id: number;
  name: string;
  lists: IList[];
};

export interface IModal {
  type: string;
  cat: string;
  name?: string;
  action: (confirm: boolean) => void;
};
