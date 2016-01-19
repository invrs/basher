import { command } from "../../../"

export default command(class {
  description() { return "hello description" }
  run() { console.log("hello!") }
})
