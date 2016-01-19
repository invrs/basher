import { command } from "../../../"

export default command(class {
  description() { return "world description" }
  run() { console.log("world!") }
})
