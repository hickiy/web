<!-- <template>
  <div>{{ 'sfc-template-ts: ' + msg }}</div>
</template>

<script setup lang="ts">

defineProps<{msg: string}>()

</script> -->

<script lang="tsx">

import { defineComponent, h } from 'vue';

// export default defineComponent({
//   name: 'hellow-world',
//   props: {
//     msg: { type: String, required: true },
//   },
//   render() {
//     return h('div', {}, 'option-api-ts:   ' + this.msg)
//   }
// })


// export default defineComponent({
//   name: 'hellow-world',
//   props: {
//     msg: { type: String, required: true },
//   },
//   setup(props) {
//     return () => h('div', {}, 'compose-api-ts:    ' + props.msg)
//   }
// })


export default defineComponent({
  name: 'hellow-world',
  props: {
    msg: { type: String, required: true },
  },
  setup(props) {
    return () => <div>{'compose-api-tsx:  '  + props.msg}</div>;
  }
})

</script>

