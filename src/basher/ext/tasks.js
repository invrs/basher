export default Class =>
  class extends Class {
    checkHelp({ options }) {
      return (options.h || options.help);
    }

    listTasks(state) {
      let { task } = state
      let list = this.tasksToStrings(state)

      return this.spacedTasks({ list })
    }

    logTasks(state) {
      console.log(`\n${this.listTasks(state)}\n`)
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

    spacedTasks({ list }) {
      let max = this.longestTask({ list })
      
      let map = task => {
        let length = max - task[0].length + 4
        let space = Array(length).join(" ")

        return `${task[0]}${space}${task[1]}`
      }

      return list.map(map).join("\n")
    }

    tasks(state, resolve) {
      let { task, tasks } = state
      let command

      if (task) {
        command = task
          .split(".")
          .reduce((tasks, key) => {
            if (tasks[key]) { return tasks[key] }
          }, tasks)
      }
      
      if (this.checkHelp()) {
        resolve(this.runHelp(state, { command }))
      } else if (command) {
        resolve(command().log(state))
      } else {
        resolve(this.logTasks(state))
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
