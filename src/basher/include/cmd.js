import child_process from "child_process"
import { factory } from "industry"

export default factory(class {
  constructor(state) {
    this.state({ cmd: [] })
  }

  cmd({ add, cmd, split }, resolve) {
    if (add) {
      add = this.flatten({ cmd: add })
      cmd = cmd.concat(add)
    }

    if (split) {
      split = split.split(/\s+/)
      cmd = cmd.concat(split)
    }
    
    this.state({ cmd })
  }

  childProcess({ cmd }) {
    return child_process.spawn(
      cmd.shift(), cmd, { stdio: "pipe" }
    )
  }

  flatten({ cmd }) {
    return Array(5).reduce((last, item) => {
      return [].concat.apply([], last)
    }, cmd)
  }

  run({ cmd }, resolve) {
    let proc = this.childProcess({ cmd })
    let output = ""

    if (proc.stdout) {
      proc.stdout.on("data", data => {
        output += data
      })

      proc.stderr.on("data", data => {
        output += data
      })
    }

    proc.on('close', () =>
      resolve({ output: output.trim() })
    )
  }
})
