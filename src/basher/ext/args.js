import minimist from "minimist"

export default Class =>
  class extends Class {
    constructor(...args) {
      let argv = process.argv.slice(2)
      let options = minimist(argv)

      super(...args, { options })
    }
  }
