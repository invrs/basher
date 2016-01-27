export default Class =>
  class extends Class {
    log(state, resolve) {
      resolve(this.run(state).then(output => {
        console.log(output)
        return output
      }))
    }
  }
