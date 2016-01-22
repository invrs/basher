import minimist from "minimist"

export default Class =>
  class extends Class {
    constructor(state) {
      let argv = state.argv || process.argv.slice(2)
      state.options = minimist(argv)
      super(state)
    }
  }
