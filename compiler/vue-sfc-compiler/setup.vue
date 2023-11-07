<!-- hickey 2023 -->
<template>
  <div>{{ count }}</div>
</template>

<script setup>
import { ref, h, defineExpose, defineProps, defineEmits } from 'vue';
const count = ref(1);
defineEmits(['update:count']);
defineProps(['count']);
defineExpose({
  count
});
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
