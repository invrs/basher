import { factory } from "industry"
import ext from "./basher/ext"

let command = factory
  .extend(...ext)
  .include(`${__dirname}/basher/include`)

export { command }
