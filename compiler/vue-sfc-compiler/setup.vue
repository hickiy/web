<!-- hickey 2023 -->
<template>
  <div>{{ count }}</div>
</template>

<script setup>
import { ref, h } from 'vue';
const count = ref(1);
</script>

<!-- <script>
export default {
  setup() {
    return () => h('div', count.value);
    return {
      count
    };
  }
};
</script> -->
