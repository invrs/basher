export default Class =>
  class extends Class {
    checkHelp({ options }) {
      if (options.h || options.help) {
        this.help()
        return true
      }
    }

    listTasks(state) {
      let { task } = state
      let list = this.tasksToStrings(state)
      
      console.log(`\n${this.spacedTasks({ list })}\n`)
    }

    longestTask({ list }) {
      let reduce = (prev, task) => {
        if (task[0].length > prev) {
          return task[0].length
        } else {
          return prev
        }
      }
      return list.reduce(reduce, 0)
    }

    spacedTasks({ list }) {
      let max = this.longestTask({ list })
      
      let map = task => {
        let length = max - task[0].length + 4
        let space = Array(length).join(" ")

        return `${task[0]}${space}${task[1]}`
      }

      return list.map(map).join("\n")
    }

    tasks(state) {
      let { task, tasks } = state
      let command

      if (this.checkHelp()) return

      if (task) {
        command = task
          .split(".")
          .reduce((tasks, key) => {
            if (tasks[key]) { return tasks[key] }
          }, tasks)
      }
      
      if (command) {
        command().run(state, { runner: true })
      } else {
        this.listTasks(state)
      }
    }

    taskToString(state) {
      let { command, prefix } = state
      let strings = []
      let is_function = typeof command == "function"

      if (command && command._factory) {
        if (is_function && command().description) {
          strings.push(
            [ prefix, command().description() ]
          )
        }

        strings = strings.concat(
          this.tasksToStrings(
            state, { prefix, tasks: command }
          )
        )
      }

      return strings
    }

    tasksToStrings(state) {
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

          let string = this.taskToString(
            state, { command, prefix }
          )
          
          return strings.concat(string)
        },
        []
      )
    }
  }
