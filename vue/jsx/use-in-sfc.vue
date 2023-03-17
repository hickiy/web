<script lang="jsx">
// this is a pseudo-code snippets

// first method
export const optionApiWithJsx = {
  name: 'hellow-world',
  props: ['msg'],
  render() {
    return <div>{'option-api-jsx-sfc:  ' + this.msg}</div>;
  }
};

// second method
export const composeApiWithJsx = {
  props: {
    msg: String
  },
  setup(props) {
    return () => <div>{'compose-api-jsx-sfc:  ' + props.msg}</div>;
  }
};

export default {
  data() {
    return {
      name: '1212'
    };
  }
};
</script>

<template></template>

<style></style>
