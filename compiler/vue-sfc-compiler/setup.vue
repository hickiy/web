<!-- hickey 2023 -->
<template>
  <div>{{ count }}</div>
  <div>12312312</div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

const count = ref(1);

// export default {
//   setup() {
//     return () => h('div', count.value);
//     // return {
//     //   count
//     // };
//   }
// };
</script>
