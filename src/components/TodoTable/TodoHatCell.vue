<template>
  <div
    class="d-flex bg-dark justify-content-baseline border text-break rounded"
    :class="{
      'col-sm-8 col-4': isTodo,
      'col-sm-2 col-4': isNoTodo
    }"
    @click="onClick(name)"
  >
    <div class="flex-fill flex-grow d-flex justify-content-center align-items-center mt-1">
      <h5>{{ title }}<wbr></h5>
    </div>
    <div class="d-flex w-10 justify-content-center align-items-center">
      <SortArrowSvg
        :reverse="order.reverse"
        :fill="isOrderColumn"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SortArrowSvg from "@/components/svg/SortArrowSvg.vue";

export default defineComponent({
  name: "TodoHatCell",
  components: {
    SortArrowSvg,
  },
  emits: ["handleSorting"],
  props: {
    order: {
      required: true,
      type: Object,
    },
    title: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
  },
  methods: {
    onClick(type) {
      this.$emit("handleSorting", type);
    },
  },
  computed: {
    isTodo() {
      return this.name === 'todo' ? 'col-sm-8' : '';
    },
    isNoTodo() {
      return this.name !== 'todo' ? 'col-sm-2' : '';
    },
    isOrderColumn() {
      return this.order.order === this.name ? "#fff" : "#212529";
    },
  },
});
</script>

<style scoped></style>
