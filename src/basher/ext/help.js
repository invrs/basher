export default Class =>
  class extends Class {
    checkHelp({ options }) {
      return (options.h || options.help)
    }

    runHelp(state, resolve) {
      let { command } = state
      let help

      if (command && command().help) {
        help = command().help(state)
      } else if (this.help) {
        help = this.help(state)
        help += "\n\n"
        help += this.listTasks(state)
      }

      console.log(`\n${help}\n`)
      return help
    }
  }
