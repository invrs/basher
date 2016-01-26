import child_process from "child_process"
import { factory } from "industry"

export default factory(class {
  constructor(state) {
    this.state({ cmd: [] })
  }

  cmd({ add, cmd, split }) {
    if (add) {
      add = this.flatten({ cmd: add })
      cmd = cmd.concat(add)
    }

    if (split) {
      split = split.split(/\s+/)
      cmd = cmd.concat(split)
    }
    
    if (cmd) {
      this.state({ cmd })
    }

    return this
  }

  childProcess({ cmd, stdio: stdio = "inherit" }) {
    return child_process.spawn(
      "sh", [ "-c", cmd.join(" ") ], { stdio }
    )
  }

  flatten({ cmd }) {
    return Array(5).reduce((last, item) => {
      return [].concat.apply([], last)
    }, cmd)
  }

  run({ cmd, stdio }, resolve) {
    let proc = this.childProcess({ cmd, stdio })
    let output = ""

    if (proc.stdout) {
      proc.stdout.on("data", data => {
        output += data
      })

      proc.stderr.on("data", data => {
        output += data
      })

      proc.on('close', () =>
        resolve({ output: output.trim() })
      )
    } else {
      proc.on('close', () =>
        resolve(cmd.join(" "))
      )
    }
  }
})
