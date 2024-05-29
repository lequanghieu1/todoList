<template>
  <div
    class="container-fluid vh-100 w-100 d-flex flex-column"
  >
    <HeadContainer @onClickGo="onClickMenuButton" />

    <div class="container w-100 flex-shrink-0">
      <TodoHat
        :order="getOrder"
        @handleSorting="handleSorting"
      />
    </div>

    <LoaderGif v-if="getLoading" />

    <ErrorBlock
      v-if="getIsError"
      :text="getError"
    />
    
    <TodoTable
      v-else
      :todos="getTodos"
      :order="getOrder"
      :scrolling="getScroll"
    />

    <ShowDialog
      v-if="getShowState"
      @onClickCallback="onDialogChoice"
      :dialog-props="getDialogProps"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters,mapActions } from 'vuex';

import HeadContainer from "@/components/VisitTable/HeadButtonsContainer.vue";
import ErrorBlock from "@/components/ErrorBlock.vue";
import LoaderGif from "@/components/LoaderGif.vue";
import ShowDialog from "@/components/DialogForm/ShowDialog.vue";
import TodoHat from "@/components/TodoTable/TodoHat.vue";
import TodoTable from '@/components/TodoTable/TodoTable.vue';
import  { IDialogItem, IDialogProps } from "@/types/Dialog";
import stringGuard from "@/modules/stringGuard";
import ITodo,{ emptyItem } from './types/Todo';


export default defineComponent({
  name: "App",
  components: {
    HeadContainer,
    ErrorBlock,
    LoaderGif,
    ShowDialog,
    TodoHat,
    TodoTable,
  },
  computed:
    mapGetters(['getTodos','getLoading','getOrder','getCurrentId','getShowState','getDialogProps','getScroll','getIsError','getError','getInputTodo','getInputState'])
  ,
  methods: {
    ...mapActions({
      fetchData:'fetchData',
      handleSorting:'handleSorting',
      autoSelectCurrentItem:"autoSelectCurrentItem",
      addItem:"addItem",
      editItem:"editItem",
      deleteItem:"deleteItem",
      setShowState:'setShowState',
      setDialogProps:'setDialogProps',
      setInputTodo:"setInputTodo",
      setInputState:"setInputState",
      setError:'setError'}),
    //wrapper will be need if we want in future use real api to catch errors
    async CallerWrapper( props?: IDialogItem) {
       try {
       if (props?.method === "RemoveItem") {
        this.deleteItem(this.getCurrentId);
        return;
        }
       if(props) {
          const body: ITodo = {
            todo: stringGuard(this.getInputTodo),
            state: this.getInputState,
            id: stringGuard(props?.id),
            createdAt: "",
            }; 
       if (props?.method === "AddItem") {
            this.addItem(body);
            return;
       } else if (props?.method === "EditItem") {
            body.id=this.getCurrentId;
            this.editItem(body);
            return;
          }
        }
        this.setError({show:true,message:"unexpected action"})
      } catch (error) {
        this.setError({show:true,message:"unexpected error"})
      }
    },

    //Dialog ok cancel event
    onDialogChoice: async function (props: IDialogItem) {
      if (props.event === "Ok")
        await this.CallerWrapper(props);
      this.setShowState(false);
    },
 
    //initial dialog modal form
    onClickMenuButton: function (type: string) {
      const props: IDialogProps = { type: type };
      if (type !== "AddItem") {
        const currentItem = this.getTodos.find(( { id }:ITodo) => id === this.getCurrentId);
        if (currentItem) {
          props.item = {...currentItem};
          this.setInputTodo(currentItem.todo);
          this.setInputState(currentItem.state);
        }
      }else{
        props.item = {...emptyItem};
        this.setInputTodo(emptyItem.todo);
        this.setInputState(emptyItem.state);
      }
      this.setDialogProps(props);
      this.setShowState(true);
    },

  },
  mounted() {
   this.fetchData();
   this.handleSorting(this.getOrder.order);
   this.autoSelectCurrentItem();
  },
});
</script>

<style>
body {
  height: 100vh;
}
::-webkit-scrollbar {
  width: 8px;
  border: 1px solid #d5d5d5;
}

</style>
