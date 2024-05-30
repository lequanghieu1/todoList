<template>
  <div class="row text-white font-weight-bold text-center">
    <TableHatCell
      :order="order"
      title="Todo"
      name="todo"
      @handleSorting="handleSorting"
    />
    <TableHatCell
      :order="order"
      title="State"
      name="state"
      @handleSorting="handleSorting"
    />
    <TableHatCell
      :order="order"
      title="Date"
      name="createdAt"
      @handleSorting="handleSorting"
    />
  </div>
</template>
  
<script>
import { defineComponent } from "vue";
import TableHatCell from './TodoHatCell.vue';

export default defineComponent({
    name: "TodoHat",
    components: {
        TableHatCell,
    },
    props: {
        order: {
            required: true,
            type: Object,
        },
    },
    emits: ["handleSorting"],

    methods: {
        handleSorting(type) {
            this.$emit("handleSorting", type);
        },
    },
});
</script>
  
<style scoped></style>
