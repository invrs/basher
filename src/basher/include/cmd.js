import child_process from "child_process"
import { factory } from "industry"

class Cmd {
  constructor({ options }) {
    this.state({ cmd: [] })
  }

  add({ cmd, args }) {
    if (args) {
      cmd = cmd.concat(args)
    }
    
    if (cmd) {
      this.state({ cmd })
    }

    return this
  }

  childProcess({ cmd, stdio }) {
    return child_process.spawn(
      "sh", [ "-c", this.join() ], { stdio }
    )
  }

  join({ cmd }) {
    return cmd.join(" ")
  }

  run({ cmd, debug, stdio }, resolve) {
    let proc = this.childProcess({ cmd, stdio })
    let output = ""

    if (proc.stdout) {
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
    }

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
