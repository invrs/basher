import factory from "../include/cmd"

export default (Class) =>
  class extends Class {
    constructor(state) {
      let instance = factory(null)
      let cmd = (str) =>
        instance.cmd.bind(instance)({ add: str })

      super({ cmd })
    }
  }
