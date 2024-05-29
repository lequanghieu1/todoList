<template>
  <div class="d-flex justify-content-center align-items-center ">
    <div class="Loading__img_wrapper">
      <img
        src="@/components/pics/loader.gif"
        alt=""
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>

.Loading__img_wrapper {

  display: block;
  min-width: 165px;
  animation: rotating 6s linear infinite;

  /*background: #3bde7c;*/
}

@keyframes rotating {
  from {
    transform: translate(-50px, 0);
  }

  to {
    transform: translate(50px, 0);
  }
}
</style>
