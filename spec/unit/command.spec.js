import { command } from "../../"

describe("command", () => {
  describe("tasks", function() {
    beforeEach(() => {
      this.command = command(class {
        constructor(state) {
          this.state({ tasks: this.commands })
        }
        run(state) {
          return this.tasks(state)
        }
      }).include(`${__dirname}/../fixtures`)
    })

    it("prints tasks", () => {
      spyOn(console, "log")
      this.command().run()
      expect(console.log).toHaveBeenCalledWith([
        "",
        "hello         hello description",
        "hello.world   world description",
        ""
      ].join("\n"))
    })

    it("runs task", () => {
      spyOn(console, "log")
      this.command().run({ task: "hello" })
      expect(console.log).toHaveBeenCalledWith("hello!")
    })

    it("runs hello.world task", () => {
      spyOn(console, "log")
      this.command().run({ task: "hello.world" })
      expect(console.log).toHaveBeenCalledWith("world!")
    })
  })
})
