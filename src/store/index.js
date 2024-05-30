import { createStore } from "vuex";
import todoStore from './modules/todo'
import dialogStore from './modules/dialog';

export const store = createStore({
    modules:{todoStore,dialogStore},
})