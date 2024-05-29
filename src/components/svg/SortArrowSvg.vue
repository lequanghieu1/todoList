<template>
  <svg
    :class="{ reverse: reverse}"
    class="text-danger" 
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="16.000000pt"
    height="16.000000pt"
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
  >

    <g
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000) "
      stroke="none"
      :fill="fill"
    >
      <path
        d="M297 3842 l-297 -297 1280 -1280 1280 -1280 1280 1280 1280 1280
-297 297 -298 298 -982 -982 -983 -983 -983 983 -982 982 -298 -298z"
      />
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: "SortArrowSvg",
    props: {
      fill:{
      required: true,
      type: String,
    }, 
    reverse: {
      required: true,
      type: Boolean,
    },},
})
</script>
<style scoped>
.reverse 
{
    transform: rotate(180deg);
}
</style>