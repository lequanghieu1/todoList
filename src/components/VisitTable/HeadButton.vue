<template>
  <button
    type="button"
    @click.prevent="onClick()"
    class="col-xs-12 col-sm-12 col-md-3 col-lg-3 btn align-middle btn-secondary btn-lg m-2 border border-dark rounded d-flex justify-content-between"
  >
    <span class="mx-1 text-middle">{{ title }}</span>
    <AddUserSvg v-if="icon === 'AddItem'" />
    <RemoveUserSvg v-else-if="icon === 'RemoveItem'" class="mx-1" />
    <EditUserSvg v-else class="mx-1" />
  </button>
</template>

<script>
export default {
  name: "IconButton",
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
    onClick() {
      this.$emit("onClickButton", this.icon);
    },
  },
};
</script>

<style scoped></style>
