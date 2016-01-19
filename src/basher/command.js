import { factory } from "industry"

export default factory.extend(Class =>
  class extends Class {
    commandsToList(state) {
      let { tasks } = state
      let keys = Object.keys(tasks).sort()

      return keys.reduce(
        (prev, key) => {  
          if (key.charAt(0) == "_") return
          let prefix = key

          if (state.prefix) {
            prefix = `${state.prefix}.${prefix}`
          }
          
          if (tasks[key] && tasks[key]().description) {
            prev.push(`${prefix} - ${tasks[key]().description()}`)
          }

          if (typeof tasks[key] == "function") {
            prev = prev.concat(this.commandsToList(state, {
              prefix, tasks: tasks[key]
            }))
          }

          return prev
        },
        []
      )
    }

    tasks(state) {
      let { task, tasks } = state

      task = task.split(".").reduce((tasks, key) => {
        return tasks[key]
      }, tasks)
      
      if (task) {
        task().run(state)
      } else {
        let list = this.commandsToList(state)
        console.log(list.join("\n"))
      }
    }
  }
)
