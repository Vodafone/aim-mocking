/* eslint-disable */
import chalk from 'chalk'
import isObject from 'lodash/isObject.js'

// import config from '@config';

// import isDebugMode from '@utils/is-debug-mode';
// import isAsnycLog from '@utils/is-async-log';
// import appendConsoleLogFilterPrefix from '@utils/append-console-filter-prefix';

import outputHandler from '@modules/outputHandler'

export default class Console {
  static removeObjectLikeMessages(arr) {
    const msgsObjectLike = arr.filter((msg, idx) => isObject(msg))
    arr = arr.filter((item) => !isObject(item))
    return {
      msgsObjectLike,
      msgsRest: arr,
    }
  }

  constructor(context) {
    this.context = context
  }

  async log(...msgs) {
    const cfg = this.context.theme.console.log
    const firstMsgs = msgs.shift()
    const { msgsObjectLike, msgsRest } = Console.removeObjectLikeMessages(msgs)
    const logOutput = `${chalk.bgHex(cfg.prefixBgHex).hex(cfg.prefixColorHex).bold(cfg.prefix)} ${chalk.hex(cfg.contentColorHex)(`${chalk.bold(firstMsgs)} ${msgsRest.join(' | ')}`)}`
    outputHandler.handleOutput(this.context, logOutput)
    msgsObjectLike.forEach((msg) => {
      outputHandler.handleOutput(this.context, msg)
    })
  }

  async info(...msgs) {
    const cfg = this.context.theme.console.info
    const firstMsgs = msgs.shift()
    const { msgsObjectLike, msgsRest } = Console.removeObjectLikeMessages(msgs)
    const logOutput = `${chalk.bgHex(cfg.prefixBgHex).hex(cfg.prefixColorHex).bold(cfg.prefix)} ${chalk.hex(cfg.contentColorHex)(`${chalk.bold(firstMsgs)} ${msgsRest.join(' | ')}`)}`
    outputHandler.handleOutput(this.context, logOutput)
    msgsObjectLike.forEach((msg) => {
      outputHandler.handleOutput(this.context, msg)
    })
  }

  async warn(...msgs) {
    const cfg = this.context.theme.console.warn
    const firstMsgs = msgs.shift()
    const { msgsObjectLike, msgsRest } = Console.removeObjectLikeMessages(msgs)
    const logOutput = `${chalk.bgHex(cfg.prefixBgHex).hex(cfg.prefixColorHex).bold(cfg.prefix)} ${chalk.hex(cfg.contentColorHex)(`${chalk.bold(firstMsgs)} ${msgsRest.join(' | ')}`)}`
    outputHandler.handleOutput(this.context, logOutput)
    msgsObjectLike.forEach((msg) => {
      outputHandler.handleOutput(this.context, msg)
    })
  }

  debug(...msgs) {
    const cfg = this.context.theme.console.debug
    const firstMsgs = msgs.shift()
    const { msgsObjectLike, msgsRest } = Console.removeObjectLikeMessages(msgs)
    const logOutput = `${chalk.bgHex(cfg.prefixBgHex).hex(cfg.prefixColorHex).bold(cfg.prefix)} ${chalk.hex(cfg.contentColorHex)(`${chalk.bold(firstMsgs)} ${msgsRest.join(' | ')}`)}`
    outputHandler.handleOutput(this.context, logOutput)
    msgsObjectLike.forEach((msg) => {
      outputHandler.handleOutput(this.context, msg)
    })
  }

  error(...msgs) {
    const cfg = this.context.theme.console.error
    const firstMsgs = msgs.shift()
    const { msgsObjectLike, msgsRest } = Console.removeObjectLikeMessages(msgs)
    const logOutput = `${chalk.bgHex(cfg.prefixBgHex).hex(cfg.prefixColorHex).bold(cfg.prefix)} ${chalk.hex(cfg.contentColorHex)(`${chalk.bold(firstMsgs)} ${msgsRest.join(' | ')}`)}`
    outputHandler.handleOutput(this.context, logOutput)
    msgsObjectLike.forEach((msg) => {
      outputHandler.handleOutput(this.context, msg)
    })
  }
}
