export default Class =>
  class extends Class {
    listTasks(state) {
      let { task } = state
      let list = this.tasksToStrings(state)

      return this.spacedTasks({ list })
    }

    logTasks(state) {
      console.log(`\n${this.listTasks(state)}\n`)
    }

    longestTask({ list, index: index = 0 }) {
      let reduce = (prev, task) => {
        if (task[index].length > prev) {
          return task[index].length
        } else {
          return prev
        }
      }
      return list.reduce(reduce, 0)
    }

    spacedTasks({ list }) {
      let max_lengths = [ 0, 1 ].map(index =>
        this.longestTask({ list, index })
      )
      
      let map = task => {
        let spaces = max_lengths.map((max, index) => {
          if (task[index + 1]) {
            return this.spaceTask({ max, task: task[index] })
          } else {
            return ""
          }
        })

        return task
          .map((t, index) => t + (spaces[index] || ""))
          .join("")
      }

      return list.map(map).join("\n")
    }

    tasks(state, resolve) {
      let { task, tasks } = state
      let command

      if (task) {
        command = this.taskToCommand({ task, tasks })
      }
      
      if (this.checkHelp()) {
        resolve(this.runHelp(state, { command }))
      } else if (command) {
        resolve(command().run(state))
      } else {
        resolve(this.logTasks(state))
      }
    }

    taskToCommand({ task, tasks }) {
      return task
        .split(".")
        .reduce((tasks, key) => {
          if (tasks[key]) { return tasks[key] }
        }, tasks)
    }

    taskToString(state) {
      let { command, prefix } = state
      let strings = []
      let is_function = typeof command == "function"

      if (command && command._factory) {
        if (is_function && command().description) {
          let task = [ prefix, command().description() ]

          if (command().options) {
            task.push(command().options())
          }
          
          strings.push(task)
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

    spaceTask({ max, task }) {
      let length = max - task.length + 4
      return Array(length).join(" ")
    }
  }
