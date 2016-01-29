import clc from "cli-color"

const colors = {
  error:   161,
  normal:  241,
  notice:  62,
  notice2: 103,
  warn:    221
}

export default Class =>
  class extends Class {
    color(state) {
      let { color, msg } = state
      let fn

      for (let type in colors) {
        msg = msg || state[type]
        if (state[type]) {
          color = colors[type]
        }
      }
      
      if (color) {
        fn = clc.xterm(color)
      }

      if (typeof msg != "string") {
        msg = JSON.stringify(msg, null, 2)
      }

      if (fn) {
        return fn(msg)
      } else {
        return msg
      }
    }

    log(state) {
      console.log(this.color(state))
    }
  }
