import child_process from "child_process"
import { factory } from "industry"

export default factory(class {
  constructor(state) {
    this.state({ cmd: [] })
  }

  add({ cmd, args }) {
    if (args) {
      args = this.flatten({ args })
      cmd = cmd.concat(args)
    }
    
    if (cmd) {
      this.state({ cmd })
    }

    return this
  }

  childProcess({ cmd, stdio: stdio = "pipe" }) {
    return child_process.spawn(
      "sh", [ "-c", this.join() ], { stdio }
    )
  }

  flatten({ args }) {
    return Array(5).reduce((last, item) => {
      return [].concat.apply([], last)
    }, args)
  }

  join({ cmd }) {
    return cmd.join(" ")
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

      proc.on('close', (code) => {
        resolve({ command: this.join(), output: output.trim(), code })
      })
    } else {
      proc.on('close', (code) => {
        resolve({ command: this.join(), code })
      })
    }
  }
})
