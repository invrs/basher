export default Class =>
  class extends Class {
    log(state) {
      return this.run(state).then(output => {
        console.log(JSON.stringify(output))
        return output
      })
    }
  }
