<template>
  <div
    class="container h-100 w-100 flex-fill flex-grow overflow-auto"
  >
    <div
      v-for="todo in todos"
      :key="todo.id"
      :id="todo.id"
      class="row my-1 border rounded"
      :class="todo.id !== getCurrentId ? 'bg-white' : 'bg-secondary'
      "
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
    
<script lang="ts">



import {  defineComponent, PropType } from "vue";
import ITodo from '../../types/Todo';
import { IOrder } from '../../types/OrderBy';

import { mapActions, mapGetters } from 'vuex';


export default defineComponent({
    name: "TodoTable",
    props: {
        order: {
            required: true,
            type: Object as PropType<IOrder>,
        },
        todos: {
            required: true,
            type: Array as PropType<ITodo[]>,
        },
        scrolling: {
            required: true,
            type: Boolean,
        },
    },
    computed:mapGetters(['getCurrentId']),
    methods:mapActions({newCurrentItem:'newCurrentItem'}),
    updated() {
        this.$nextTick(function () {
    
            //scroll after create
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
});
</script>
    
<style scoped>

</style>
    