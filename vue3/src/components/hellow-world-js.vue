<!-- <template>
  <div> sfc-template {{ msg }}</div>
</template>

<script>
export default {
  name: 'hellow-world',
  props: ['msg'],
}
</script> -->


<script lang="jsx">
import { h } from 'vue'
// export default {
//   name: 'hellow-world',
//   props: ['msg'],
//   render() {
//     return h('div', {}, 'sfc-option-api:  ' + this.msg);
//   }
// }

// export default {
//   name: 'hellow-world',
//   props: ['msg'],
//   render() {
//     return <div>{'sfc-option-api-jsx:  ' + this.msg}</div>;
//   }
// }

export default {
  props: {
    msg: String
  },
  setup(props) {
    return () => <div class="test">{'sfc-compose-api-jsx:  ' + props.msg}</div>
  }
}

</script>
<style>
.test {
  color: red;
}
</style>
