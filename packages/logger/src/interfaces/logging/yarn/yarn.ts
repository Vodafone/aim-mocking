/* eslint-disable */
import symbols from 'log-symbols'
import figures from 'figures'
import chalk from 'chalk'
import { EOL } from 'os'

import stringFill from '@utils/string-fill'

import outputHandler from '@modules/outputHandler'

export default class Yarn {
  constructor(context) {
    this.context = context
  }

  /**
   * App start
   * @example
   * * -------------------------------- *
   * ${logoFn()}
   * * ----------© vodafone ---- v1.2.2 *
   * @param {Function} logoFn
   * @param {string} version
   */
  async appStart(logoFn, version = '') {
    // flag used to detect appStart cmd in outputHandler
    this.context.isAppStart = true
    const logOutput = `
${stringFill(`${chalk.yellowBright('*')} [FILL] ${chalk.yellow('*')}`)}
${logoFn(chalk, stringFill, figures)}
${stringFill(`${chalk.yellowBright('*')} [FILL] © vodafone ---- ${chalk.gray(version)} ${chalk.yellow('*')}`)}
    `
    outputHandler.handleOutput(this.context, logOutput)
  }

  /**
   * Yarn status
   * @example
   * ```
   * [Type] description --------- [✔]
   * ```
   * @param {*} title
   * @param {*} description
   * @param {*} status
   */
  async status(title, description = '', status = true) {
    // get interface method config
    const cfg = this.context.theme.yarn.status
    // get status symbol ✔ or ✖
    let statusString = status === false ? cfg.symbolFail : cfg.symbolOK
    if (status === 0) statusString = cfg.symbolWarning
    if (status === null) statusString = cfg.symbolInfo
    // prepare log output string
    const logOutput = stringFill(`
    ${chalk.hex(cfg.bracketColorHex)('[')}${chalk.hex(cfg.textColorHex)(title)}${chalk.hex(cfg.bracketColorHex)(']')} ${chalk.hex(cfg.descColorHex)(description)} [FILL] ${chalk.hex(cfg.bracketStatusColorHex)('[')}${statusString}${chalk.hex(
      cfg.bracketStatusColorHex,
    )(']')}
    `)
    outputHandler.handleOutput(this.context, logOutput)
  }

  /**
   * Yarn step
   * @example
   * ```
   * [Type] description --------- [✔]
   * ```
   * @param {*} title
   * @param {*} description
   */
  async step(title, description = '') {
    // get interface method config
    const cfg = this.context.theme.yarn.status
    // prepare log output string
    const logOutput = stringFill(`
    ${chalk.hex(cfg.bracketColorHex)('[')}${chalk.hex(cfg.textColorHex)(title)}${chalk.hex(cfg.bracketColorHex)(']')} ${chalk.hex(cfg.descColorHex)(description)} [FILL]`)
    outputHandler.handleOutput(this.context, logOutput)
  }

  /**
   * Yarn info
   * @example
   * ```
   * [Title] ------- [info]
   * ```
   * @param title
   * @param value
   */
  async info(title, value) {
    // get relevant config
    const cfg = this.context.theme.yarn.info
    // prepare log output string
    const logOutput = stringFill(`
    ${chalk.hex(cfg.bracketColorHex)('[')}${chalk.hex(cfg.textColorHex)(title)}${chalk.hex(cfg.bracketColorHex)(']')} [FILL] ${chalk.hex(cfg.bracketColorHex)('[')}${chalk.hex(cfg.valueColorHex)(value)}${chalk.hex(cfg.bracketColorHex)(']')}
    `)
    outputHandler.handleOutput(this.context, logOutput)
  }

  /**
   * Yarn whisper
   * @example
   * ```
   * Test ------------------------ Test
   * ```
   * @param title
   * @param value
   */
  async whisper(title, value) {
    const secondPart = value ? `[FILL] ${chalk.gray(value)}` : ''
    const logOutput = stringFill(`
    ${chalk.gray(title)} ${secondPart}`)
    outputHandler.handleOutput(this.context, logOutput)
  }

  /**
   * Yarn section
   * @example
   * ```
   * - -------------------------------------------------------- -
   * - Section: Server setup
   * - status log of the server
   * - -------------------------------------------------------- -
   * ```
   * @param title
   * @param description
   */
  async section(title, description) {
    const logOutput = `
${chalk.yellow(stringFill('- [FILL] -'))}
${chalk.gray('-')} Section: ${chalk.yellow(title)}
${chalk.gray('-')} ${chalk.gray(description)}
${chalk.gray(stringFill('- [FILL] -'))}`
    outputHandler.handleOutput(this.context, logOutput)
  }

  /**
   * Yarn divider
   * @example
   * - -------------------------------------------------------- -
   */
  async divider() {
    const logOutput = chalk.yellow(stringFill('- [FILL] -'))
    outputHandler.handleOutput(this.context, logOutput)
  }

  /**
   * Yarn success
   * @param title
   * @param values
   */
  async success(title, ...values) {
    let logOutput = `${chalk.green(title)}
${stringFill('- [FILL] -')}`
    if (values.length) {
      logOutput += `
${chalk.gray(
  JSON.stringify(values, null, 2)
    .split(EOL)
    .map((line) => `${chalk.green(figures.circleDotted)} ${line}`)
    .join(EOL),
)}
${stringFill('- [FILL] -')}`
    }
    outputHandler.handleOutput(this.context, logOutput)
  }

  /**
   * Yarn Failure
   * @param titile
   * @param values
   */
  async failure(titile, ...values) {
    let logOutput = `${chalk.red(titile)}
${stringFill('- [FILL] -')}`
    if (values.length) {
      logOutput += `
${chalk.gray(
  JSON.stringify(values, null, 2)
    .split(EOL)
    .map((line) => `${chalk.red(figures.circleDotted)} ${line}`)
    .join(EOL),
)}
${stringFill('- [FILL] -')}`
    }
    outputHandler.handleOutput(this.context, logOutput)
  }
}
