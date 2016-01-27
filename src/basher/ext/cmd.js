import factory from "../include/cmd"

function makeCmd() {
  let instance = factory(null)
  return (...args) =>
    instance.add.bind(instance)({ args })
}

export default (Class) =>
  class extends Class {
    constructor(...args) {
      let cmd = makeCmd()

      super(...args, { cmd })

      for (let [ name, fn ] of this.functions()) {
        this[name] = (...args) => fn(...args, { cmd })
      }
    }

    makeCmd() { return makeCmd() }

    resetCmd() {
      let cmd = makeCmd()
      this.state({ cmd })
      return cmd
    }
  }
