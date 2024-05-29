import { v4 as uuidv4 } from "uuid";
import OrderBy, { IOrder } from "@/types/OrderBy";
import ITodo from "@/types/Todo";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IError } from "../../types/ErrorType";
import { dateToString } from "../../modules/dateToString";

export interface RootStateStorable {
  todos: ITodo[];
  loadDate: { error: IError; loading: boolean };
  currentId: string;
  order: IOrder;
  autoScroll: boolean;
}

const rootState: RootStateStorable = {
  todos: [],
  loadDate: { error: { show: false, message: "" }, loading: true },
  currentId: "",
  order: { order: "todo", reverse: true },
  autoScroll: false,
};

const rootGetters: GetterTree<RootStateStorable, RootStateStorable> = {
  getTodos(state): ITodo[] {
    return [...state.todos].sort((a: ITodo, b: ITodo): number =>
      a[state.order.order] > b[state.order.order]
        ? state.order.reverse
          ? -1
          : 1
        : state.order.reverse
        ? 1
        : -1
    );
  },
  getLoading(state) {
    return state.loadDate.loading;
  },
  getIsError(state) {
    return state.loadDate.error.show;
  },
  getError(state) {
    return state.loadDate.error.message;
  },
  getOrder(state) {
    return state.order;
  },
  getCurrentId(state): string {
    return state.currentId;
  },
  getScroll(state) {
    return state.autoScroll;
  },
};

const rootActions: ActionTree<RootStateStorable, RootStateStorable> = {
  fetchData(ctx) {
    ctx.commit("setLoading", true);
    const storedTodos = window.localStorage.getItem("todos");
    if (storedTodos) ctx.commit("updateTodos", JSON.parse(storedTodos));
    else ctx.commit("updateTodos", []);
    ctx.commit("setLoading", false);
  },
  autoSelectCurrentItem(ctx) {
    if (ctx.getters.getCurrentId === "") ctx.commit("setFirst");
  },
  handleSorting(ctx, neworder: OrderBy) {
    if (ctx.getters.getOrder.order !== neworder)
      ctx.commit("setReverse", false);
    else ctx.commit("setReverse", !ctx.state.order.reverse);
    ctx.commit("setOrder", neworder);
    ctx.commit("setAutoScroll", true);
  },
  newCurrentItem(ctx, newCurrent: string) {
    ctx.commit("setError", { show: false, message: "" });
    ctx.commit("setCurrent", newCurrent);
    ctx.commit("setAutoScroll", false);
  },
  addItem(ctx, newItem: ITodo) {
    ctx.commit("setError", { show: false, message: "" });
    try {
      const id = uuidv4();
      ctx.commit("addTodo", {
        ...newItem,
        id: id,
        createdAt: dateToString(new Date()),
      });
      window.localStorage.setItem("todos", JSON.stringify(ctx.state.todos));
      ctx.commit("setCurrent", id);
      ctx.commit("setAutoScroll", true);
    } catch (error) {
      ctx.commit("setError", { show: true, message: "Can't create item" });
    }
  },
  editItem(ctx, item: ITodo) {
    ctx.commit("setError", { show: false, message: "" });
    try {
      ctx.commit("updateTodo", item);
      window.localStorage.setItem("todos", JSON.stringify(ctx.state.todos));
      ctx.commit("setAutoScroll", true);
    } catch (error) {
      ctx.commit("setError", {
        show: true,
        message: "Can't save edited data item",
      });
    }
  },
  deleteItem(ctx, id: string) {
    ctx.commit("setError", { show: false, message: "" });
    try {
      const realIndex = ctx.state.todos.findIndex((el) => id === el.id);
      const index = ctx.getters.getTodos.findIndex(
        (el: { id: string }) => id === el.id
      );
      ctx.commit("deleteTodo", realIndex);
      window.localStorage.setItem("todos", JSON.stringify(ctx.state.todos));
      let newCurrent = "";
      const indexTodos: ITodo[] = ctx.getters.getTodos;
      if (ctx.getters.getTodos.length > index) {
        newCurrent = indexTodos[index].id;
        console.log(index);
      } else newCurrent = index === 0 ? "" : indexTodos[index - 1].id;

      ctx.commit("setCurrent", newCurrent);
      if (newCurrent) ctx.commit("setAutoScroll", true);
    } catch (error) {
      ctx.commit("setError", { show: true, message: "Can't delete item" });
    }
  },
  setError(ctx, error: IError) {
    ctx.commit("setError", error);
  },
};

const rootMutations: MutationTree<RootStateStorable> = {
  updateTodos(state, todos: ITodo[]) {
    state.todos = todos;
  },
  addTodo(state, todo: ITodo) {
    state.todos.unshift(todo);
  },
  updateTodo(state, todo: ITodo) {
    const index = state.todos.findIndex((el) => todo.id === el.id);
    state.todos[index].todo = todo.todo;
    state.todos[index].state = todo.state;
  },
  deleteTodo(state, index: number) {
    state.todos.splice(index, 1);
  },
  setLoading(state, loading) {
    state.loadDate.loading = loading;
  },
  setCurrent(state, newId) {
    state.currentId = newId;
  },
  setFirst(state) {
    if (state.todos.length) state.currentId = state.todos[0].id;
  },
  setError(state, error: IError) {
    state.loadDate.error = { ...error };
  },
  setReverse(state, value) {
    state.order.reverse = value;
  },
  setOrder(state, value) {
    state.order.order = value;
  },
  setAutoScroll(state, value) {
    state.autoScroll = value;
  },
};

const todoStore: Module<RootStateStorable, RootStateStorable> = {
  actions: rootActions,
  mutations: rootMutations,
  state: rootState,
  getters: rootGetters,
};
export default todoStore;
