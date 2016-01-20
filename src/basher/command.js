import { factory } from "industry"
import minimist from "minimist"

export default factory.extend(Class =>
  class extends Class {
    constructor(state) {
      let argv = state.argv || process.argv.slice(2)
      state.options = minimist(argv)
      super(state)
    }

    checkHelp({ options }) {
      if (options.h || options.help) {
        this.help()
        return true
      }
    }

    commandToString(state) {
      let { command, name, prefix } = state
      let strings = []

      if (command && command._factory) {
        if (typeof command == "function" && command().description) {
          strings.push([ prefix, command().description() ])
        }

        strings = strings.concat(
          this.commandsToStrings(state, {
            prefix, tasks: command
          })
        )
      }

      return strings
    }

    commandsToStrings(state) {
      let { tasks } = state
      let names = Object.keys(tasks).sort()

      return names.reduce(
        (strings, name) => {  
          if (name.charAt(0) == "_")
            return strings

          let command = tasks[name]
          let prefix = name

          if (state.prefix) {
            prefix = `${state.prefix}.${name}`
          }
          
          return strings.concat(
            this.commandToString(state, {
              command, name, prefix
            })
          )
        },
        []
      )
    }

    tasks(state) {
      let { task, tasks } = state
      let command

      if (this.checkHelp()) return

      if (task) {
        command = task.split(".")
          .reduce((tasks, key) => {
            if (tasks[key]) { return tasks[key] }
          }, tasks)
      }
      
      if (command) {
        command().run(state)
      } else {
        let list = this.commandsToStrings(state)
        let max  = list.reduce(
          (prev, task) => {
            if (task[0].length > prev) {
              return task[0].length
            } else {
              return prev
            }
          },
          0
        )

        list = list.map(task => {
          let length = max - task[0].length + 4
          let space = Array(length).join(" ")
          return `${task[0]}${space}${task[1]}`
        })
        
        console.log(list.join("\n"))
      }
    }
  }
)
