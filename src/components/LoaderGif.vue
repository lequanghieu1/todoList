<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="Loading__img_wrapper">
      <img src="@/components/pics/loader.gif" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped>
.Loading__img_wrapper {
  display: block;
  min-width: 165px;
  animation: rotating 6s linear infinite;
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
