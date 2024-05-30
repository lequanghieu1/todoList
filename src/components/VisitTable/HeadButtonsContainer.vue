<template>
  <div class="container flex bg-white flex-shrink-0 ">
    <div class="row my-3 mx-auto">
      <HeadButton
        :icon="'AddItem'"
        @onClickButton="onClick"
        :title="'Add todo'"
      />
      <HeadButton
        :icon="'RemoveItem'"
        @onClickButton="onClick"
        :title="'Remove todo'"
      />
      <HeadButton
        :icon="'EditItem'"
        @onClickButton="onClick"
        :title="'Edit todo'"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HeadButton from "@/components/VisitTable/HeadButton.vue";

export default defineComponent({
  name: "HeadButtons",
  components: {
    HeadButton,
  },
  emits: ["onClickGo"],

  methods: {
    onClick(type) {
      this.$emit("onClickGo", type);
    },
  },
});
</script>

<style scoped></style>
