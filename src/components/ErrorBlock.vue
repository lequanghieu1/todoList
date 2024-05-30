<template>
  <div class="container bg-white text-black border border-danger text-center rounded">
    <h4>{{ text }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: true,
      type: String,
    },
  },
};
</script>
