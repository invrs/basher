# Basher.js [![Build Status](https://travis-ci.org/invrs/basher.svg?branch=master)](https://travis-ci.org/invrs/basher)

Run any command or shell script anywhere, in any order.

## Basic "hello" task

**`bin/run`**:

```js
#!/usr/bin/env node

require("../lib/runner")().run()
```

**`lib/runner.js`**:

```js
import { command } from "basher"

class Runner {
  constructor(state) {
    this.state({
      task:  state.options._[0],
      tasks: this.commands
    })
  }

  help(state) {
    console.log(`Usage: ./bin/run [task]`)
  }

  run(state) {
    return this.tasks(state)
  }
}

export default command(Runner).include(__dirname)

```

**`lib/commands/hello.js`**:

```js
import { command } from "basher"

export default command(class {
  description() {
    return "hello description"
  }

  help(state) {
    console.log(`Usage: ./bin/run hello`)
  }

  run() {
    console.log("hello!")
  }
})
```
