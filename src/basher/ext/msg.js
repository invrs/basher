import color from "cli-color"

function log({ msg, fn }) {
  if (typeof msg != "string") {
    msg = JSON.stringify(msg, null, 2)
  }
  
  console.log(fn(msg))
}

export default Class =>
  class extends Class {
    error({ msg }) {
      return log({ msg, fn: color.red.bold })
    }

    notice({ msg }) {
      return log({ msg, fn: color.blue })
    }

    warn({ msg }) {
      return log({ msg, fn: color.yellow })
    }
  }
