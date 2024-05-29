export const StatesTodo = ["New","In progress", "Done", "Paused", "Canceled"] as const;
export type StatesTodoType = (typeof StatesTodo)[number] | "";

interface ITodo {
  id: string;
  todo: string;
  state: StatesTodoType;
  createdAt: string;
}

export const emptyItem: ITodo = {
  id: "",
  todo: "",
  state: "",
  createdAt: "",
};

export default ITodo;
