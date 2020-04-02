export default {
  // 修改show的值
  setShow: (state: any) => {
    // console.log(payload)
    if (state.show == 'block') state.show = 'none'
    else state.show = 'block'
    // state.show = !state.show
  },
}
