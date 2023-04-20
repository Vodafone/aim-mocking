// @ts-nocheck
import ansiStrip from '@utils/ansi-strip'

global.log = []

export class Stdout {
  output(logOutput) {
    global.log.push(ansiStrip(logOutput))
  }
}

export default new Stdout()
