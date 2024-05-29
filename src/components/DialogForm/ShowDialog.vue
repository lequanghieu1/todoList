<template>
  <dialog
    ref="dialog"
    class="zindex-modal rounded"
  >
    <form
      class="ui form"
      novalidate
      novalidatemetod="dialog"
      @submit.prevent
    >
      <div class="container d-flex flex-column justify-content-between ">
        <h4 class="my-3">
          {{ getTitle }}
        </h4>
        <div v-if="dialogProps.type === 'RemoveItem'">
          <h5>
            Todo: {{ dialogProps.item?.todo }}
          </h5>
          <h5>
            State: {{ dialogProps.item?.state }}
          </h5>
        </div>
       
        <div v-else>
          <ShowDialogInput
            :label="'Todo'"
            :name="'todo'"
            :input="getInputTodo"         
            @set-input="setInputTodo"
          />
          <ShowDialogSelect
            :label="'State'"
            :input="getInputState"
            @set-select="setInputState"
          />
          <div v-if="dialogProps.item?.createdAt">
            Created: {{ dialogProps.item?.createdAt }}
          </div>
        </div>
        <br>

        <div class="w-100 d-flex flex-row">
          <div
            class="px-2 mw-50 flex-grow"
            title="All fields must be filled"
          >
            <button
              class="ui btn w-100 btn-secondary"
             
              type="button"
              :disabled="getSignupButtonDisabled"
              formmethod="dialog"

              @click="onSubmitDialog"
            >
              Confirm
            </button>
          </div>
          <div class="px-2 mw-50">
            <button
              class="w-100 btn btn-secondary"
              type="button"
              formmethod="dialog"
              @click.prevent="onCloseDialog"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";

import ShowDialogInput from "@/components/DialogForm/ShowDialogInput.vue";
import ShowDialogSelect from "@/components/DialogForm/ShowDialogSelect.vue";

import { IDialogItem, IDialogProps } from '../../types/Dialog';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: "ShowDialog",
  components: { ShowDialogInput,ShowDialogSelect },
  emits: ["onClickCallback"],
  computed:
    mapGetters(['getInputTodo','getInputState','getTitle','getSignupButtonDisabled']),
  methods: {
    ...mapActions({
      setInputTodo:'setInputTodo',setInputState:'setInputState'}),
      onSubmitDialog: function () {
      const DialogProps: IDialogItem = {
        event: "Ok",
        method: this.dialogProps.type,
      };
      if (this.dialog) this.dialog.close();
      this.$emit("onClickCallback", DialogProps);
    },
    },

  setup(_, { emit }) {
    const dialog = ref<HTMLDialogElement | null>(null);
    function onCloseDialog() {
      if (dialog.value) dialog.value.close();
      const DialogProps: IDialogItem = { event: "Cancel" };
      emit("onClickCallback", DialogProps);
    }
    onMounted(() => {
      if (dialog.value) {
        dialog.value.showModal();
        //click outer modal form listener
        dialog.value.addEventListener("click", (e) => {
          const dialogDimensions = dialog.value?.getBoundingClientRect();
          if (
            dialogDimensions !== undefined &&
            (e.clientX < +dialogDimensions?.left ||
              e.clientX > +dialogDimensions?.right ||
              e.clientY < +dialogDimensions?.top ||
              e.clientY > +dialogDimensions?.bottom)
          ) {
            onCloseDialog();
          }
        });
      }
    });

    return { dialog,  onCloseDialog };
  },

  props: {
    dialogProps: {
      required: true,
      type: Object as PropType<IDialogProps>,
    },
  },
});
</script>

<style scoped></style>
