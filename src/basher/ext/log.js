export default Class =>
  class extends Class {
    log(state, resolve) {
      this.run(state).then(output => {
        console.log(output)
        resolve(output)
      })
    }
  }
