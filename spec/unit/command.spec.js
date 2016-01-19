import { command } from "../../"

describe("command", () => {
  describe("tasks", function() {
    beforeEach(() => {
      let hello = command(class {
        description() { return "hello description" }
        run() { console.log("hello!") }
      })
      hello.world = command(class {
        description() { return "world description" }
        run() { console.log("world!") }
      })
      this.command = command(class {
        constructor(state) {
          this.state({
            tasks: { hello }
          })
        }
        run(state) {
          return this.tasks(state)
        }
      })
    })

    it("prints tasks", () => {
      spyOn(console, "log")
      this.command().run({ task: "asd" })
      expect(console.log).toHaveBeenCalledWith([
        "hello - hello description",
        "hello.world - world description"
      ].join("\n"))
    })

    it("runs task", () => {
      spyOn(console, "log")
      this.command().run({ task: "hello" })
      expect(console.log).toHaveBeenCalledWith("hello!")
      this.command().run({ task: "hello.world" })
      expect(console.log).toHaveBeenCalledWith("world!")
    })
  })
})
