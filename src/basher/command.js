import { factory } from "industry"

export default factory.extend(Class =>
  class extends Class {
    commandToString(state) {
      let { command, name, prefix } = state
      let strings = []

      if (command && command._factory) {
        if (command().description) {
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
          
          return this.commandToString(state, {
            command, name, prefix
          })
        },
        []
      )
    }

    tasks(state) {
      let { task, tasks } = state

      let command = task.split(".")
        .reduce((tasks, key) => {
          if (tasks[key]) { return tasks[key] }
        }, tasks)
      
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
