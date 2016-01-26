import factory from "../include/cmd"

export default (Class) =>
  class extends Class {
    constructor(...args) {
      let instance = factory(null)
      let cmd = (str) =>
        instance.cmd.bind(instance)({ add: str })

      super(...args, { cmd })

      for (let [ name, fn ] of this.functions()) {
        this[name] = (...args) => fn(...args, { cmd })
      }
    }
  }
