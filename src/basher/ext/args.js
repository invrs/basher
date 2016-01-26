import minimist from "minimist"

export default Class =>
  class extends Class {
    constructor(...args) {
      let argv = process.argv.slice(2)
      let options = minimist(argv)

      for (let key in options) {
        let value = options[key]

        if (typeof value == "string") {
          let first = value.charAt(0)

          if ([ "{", "[" ].indexOf(first) > -1) {
            options[key] = JSON.parse(value)
          }
        }
      }

      super(...args, { options })
    }
  }
