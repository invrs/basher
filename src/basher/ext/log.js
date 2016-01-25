export default Class =>
  class extends Class {
    log(state) {
      return this.run(state).then(output => {
        console.log(output)
        return output
      })
    }
  }
