export default Class =>
  class extends Class {
    logIfRunner({ runner }) {
      if (runner) {
        return output => console.log(output.toString())
      } else {
        return output => output
      }
    }
  }
