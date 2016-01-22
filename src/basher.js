import { factory } from "industry"

import args from "./basher/args"
import cmd from "./basher/cmd"
import helpers from "./basher/helpers"
import tasks from "./basher/tasks"

let command = factory.extend(args, cmd, helpers, tasks)

export { command }
