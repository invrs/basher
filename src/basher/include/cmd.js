import child_process from "child_process"
import { factory } from "industry"

class Cmd {
  constructor({ options }) {
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

  childProcess({ cmd  }) {
    return child_process.spawn(
      "sh", [ "-c", this.join() ]
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

  run({ cmd, debug }, resolve) {
    let proc = this.childProcess({ cmd })
    let output = ""

    proc.stdout.on("data", data => {
      if (debug) {
        this.log({ normal: data.toString() })
      }
      output += data
    })

    proc.stderr.on("data", data => {
      if (debug) {
        this.log({ error: data.toString() })
      }
      output += data
    })

    proc.on('close', (code) => {
      resolve({
        command: this.join(),
        output: output.trim(),
        code
      })
    })
  }
}

export default factory(Cmd)
  .extend(`${__dirname}/../ext/color`)
