<template>
  <div class="container h-100 w-100 flex-fill flex-grow overflow-auto">
    <div
      v-for="todo in todos"
      :key="todo.id"
      :id="todo.id"
      class="row my-1 border rounded"
      :class="{ 'bg-white': todo.id !== getCurrentId, 'bg-secondary': todo.id === getCurrentId }"
      @click="newCurrentItem(todo.id)"
    >
      <div class="col-4 col-sm-8 text-break">
        {{ todo.todo }}
      </div>
      <div class="col-4 col-sm-2 text-break">
        {{ todo.state }}
      </div>
      <div class="col-4 col-sm-2 text-break">
        {{ todo.createdAt }}
      </div>
    </div>
  </div>
</template>
    
<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "TodoTable",
  props: {
    order: {
      required: true,
      type: Object,
      validator: (value) => typeof value === "object",
    },
    todos: {
      required: true,
      type: Array,
      validator: (value) => Array.isArray(value),
    },
    scrolling: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["getCurrentId"]),
  },
  methods: {
    ...mapActions(["newCurrentItem"]),
    updated() {
      this.$nextTick(() => {
        if (this.scrolling) {
          const targetId = this.getCurrentId;
          const scrollToElement = () => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView();
            }
          };
          scrollToElement();
        }
      });
    },
  },
});
</script>
    
<style scoped>

</style>
