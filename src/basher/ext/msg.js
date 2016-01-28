import color from "cli-color"

export default Class =>
  class extends Class {
    msg({ error, notice, warn }) {
      let txt
      if (error) {
        txt = color.red.bold(error)
      } else if (notice) {
        txt = color.blue(notice)
      } else if (warn) {
        txt = color.yellow(warn)
      }
      console.log(txt)
    }
  }
