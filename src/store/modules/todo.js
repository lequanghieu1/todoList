import { v4 as uuidv4 } from "uuid";
import { dateToString } from "../../modules/dateToString";

const rootState = {
  todos: [],
  loadDate: { error: { show: false, message: "" }, loading: true },
  currentId: "",
  order: { order: "todo", reverse: true },
  autoScroll: false,
};

const rootGetters = {
  getTodos(state) {
    return [...state.todos].sort((a, b) =>
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
  getCurrentId(state) {
    return state.currentId;
  },
  getScroll(state) {
    return state.autoScroll;
  },
};

const rootActions = {
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
  handleSorting(ctx, neworder) {
    if (ctx.getters.getOrder.order !== neworder)
      ctx.commit("setReverse", false);
    else ctx.commit("setReverse", !ctx.state.order.reverse);
    ctx.commit("setOrder", neworder);
    ctx.commit("setAutoScroll", true);
  },
  newCurrentItem(ctx, newCurrent) {
    ctx.commit("setError", { show: false, message: "" });
    ctx.commit("setCurrent", newCurrent);
    ctx.commit("setAutoScroll", false);
  },
  addItem(ctx, newItem) {
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
  editItem(ctx, item) {
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
  deleteItem(ctx, id) {
    ctx.commit("setError", { show: false, message: "" });
    try {
      const realIndex = ctx.state.todos.findIndex((el) => id === el.id);
      const index = ctx.getters.getTodos.findIndex((el) => id === el.id);
      ctx.commit("deleteTodo", realIndex);
      window.localStorage.setItem("todos", JSON.stringify(ctx.state.todos));
      let newCurrent = "";
      const indexTodos = ctx.getters.getTodos;
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
  setError(ctx, error) {
    ctx.commit("setError", error);
  },
};

const rootMutations = {
  updateTodos(state, todos) {
    state.todos = todos;
  },
  addTodo(state, todo) {
    state.todos.unshift(todo);
  },
  updateTodo(state, todo) {
    const index = state.todos.findIndex((el) => todo.id === el.id);
    state.todos[index].todo = todo.todo;
    state.todos[index].state = todo.state;
  },
  deleteTodo(state, index) {
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
  setError(state, error) {
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

const todoStore = {
  actions: rootActions,
  mutations: rootMutations,
  state: rootState,
  getters: rootGetters,
};

export default todoStore;
