<template>
  <button
    type="button"
    @click.prevent="onClick()"
    class="col-xs-12 col-sm-12 col-md-3 col-lg-3 btn align-middle btn-secondary btn-lg m-2 border border-dark rounded d-flex justify-content-between"
  >
    <span class="mx-1 text-middle">{{ title }}</span>
    <AddUserSvg v-if="icon === 'AddItem'" />
    <RemoveUserSvg
      v-else-if="icon === 'RemoveItem'"
      class="mx-1"
    />
    <EditUserSvg
      v-else
      class="mx-1"
    />
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AddUserSvg from "@/components/svg/AddUserSvg.vue";
import RemoveUserSvg from "@/components/svg/RemoveUserSvg.vue";
import EditUserSvg from "@/components/svg/EditUserSvg.vue";

export default defineComponent({
  components: {
    AddUserSvg,
    RemoveUserSvg,
    EditUserSvg,
  },
  emits: ["onClickButton"],
  props: {
    title: {
      required: true,
      type: String,
    },
    icon: {
      required: true,
      type: String,
    },
  },
  methods: {
    onClick: function () {
      this.$emit("onClickButton", this.icon);
    },
  },
});
</script>

<style scoped></style>
