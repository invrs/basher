import factory from "../include/cmd"

export default (Class) =>
  class extends Class {
    constructor(state) {
      let instance = factory(null)
      let cmd = instance.cmd.bind(instance)

      super({ cmd })
    }
  }
