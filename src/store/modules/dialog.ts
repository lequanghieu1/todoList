import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import IDialog, { IDialogProps } from "../../types/Dialog";
import { RootStateStorable } from "./todo";
import stringGuard from "../../modules/stringGuard";
import useFormValidation from "@/modules/useFormValidation";
import useSubmitButtonState from "@/modules/useSubmitButtonState";

const { errors } = useFormValidation();

const dialogState: IDialog = {
  show: false,
  disableConfirm: false,
  inputTodo: "",
  inputState: "",
  dialogProps: {
    type: "",
  },
};

const dialogGetters: GetterTree<IDialog, RootStateStorable> = {
  getShowState(state): boolean {
    return state.show;
  },
  getDialogProps(state): IDialogProps {
    return state.dialogProps;
  },
  getInputTodo(state): string {
    return stringGuard(state.inputTodo);
  },
  getInputState(state): string {
    return stringGuard(state.inputState);
  },
  getTitle(state) {
    if (state.dialogProps.type === "EditItem") return "Edit ToDo";
    else if (state.dialogProps.type === "AddItem") return "Add ToDo";
    return "Confirm item deleting";
  },
  getSignupButtonDisabled(state) {
    return state.disableConfirm;
  },
};

const dialogActions: ActionTree<IDialog, RootStateStorable> = {
  setShowState(ctx, value) {
    ctx.commit(value ? "setShowTrue" : "setShowFalse");
  },
  setDialogProps(ctx, value) {
    ctx.commit("updateDialogProps", value);
    ctx.commit("setSignupButtonDisabled");
  },
  setInputTodo(ctx, value) {
    ctx.commit("updateInputTodo", value);
    ctx.commit("setSignupButtonDisabled");
  },
  setInputState(ctx, value) {
    ctx.commit("updateInputState", value);
    ctx.commit("setSignupButtonDisabled");
  },
};
const dialogMutations: MutationTree<IDialog> = {
  setSignupButtonDisabled(state) {
    if (state.dialogProps.type === "RemoveItem") return true;
    const dialogData = {
      todo: "" + state.inputTodo,
      state: "" + state.inputState,
    };
    const { isButtonDisabled } = useSubmitButtonState(dialogData, errors);
    state.disableConfirm = isButtonDisabled();
  },
  setShowTrue(state) {
    state.show = true;
  },
  setShowFalse(state) {
    state.show = false;
  },
  updateDialogProps(state, value) {
    state.dialogProps = value;
  },
  updateInputTodo(state, value) {
    state.inputTodo = value;
    if (state.dialogProps.item)
      state.dialogProps.item = { ...state.dialogProps.item, todo: value };
  },
  updateInputState(state, value) {
    state.inputState = value;
    if (state.dialogProps.item)
      state.dialogProps.item = { ...state.dialogProps.item, state: value };
  },
};
const dialogStore: Module<IDialog, RootStateStorable> = {
  actions: dialogActions,
  mutations: dialogMutations,
  state: dialogState,
  getters: dialogGetters,
};
export default dialogStore;
