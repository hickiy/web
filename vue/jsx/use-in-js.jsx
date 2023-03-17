// this is a pseudo-code snippets

// 选项api + jsx
export const optionApiWithJsx = {
  name: 'hellow-world',
  props: ['msg'],
  render() {
    return <div>{'option-api-jsx:  ' + this.msg}</div>;
  }
}

// 组合api + jsx
export const composeApiWithJsx = {
  props: {
    msg: String
  },
  setup(props) {
    return () => <div>{'compose-api-jsx:  ' + props.msg}</div>
  }
}


