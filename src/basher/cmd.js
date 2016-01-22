export default Class =>
  class extends Class {
    cmd(state, resolve) {
      console.log(state)
      resolve()
    }
  }
