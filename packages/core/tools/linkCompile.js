import path from 'path'

import fs from 'fs-extra'
import { spawn } from 'cross-spawn'
import { argv } from 'yargs'

import chalk from 'chalk'

export default new class LinkCompiler {
  // bin dir, where your output should go?
  static outputDir = 'bin/'

  // src dir, where are your src files?
  static srcDir = 'src/'

  // package name inside node modules
  // eg @vfuk/web-config -> web-config
  static packageName = 'lib-web-aim/bin'

  static defaultLink = 'web-shop-checkout'

  constructor() {
    this._init()
  }

  async _init() {
    console.log(chalk.yellow(`=> @ Compile: clean ${LinkCompiler.outputDir}`))
    await this._clean()
    console.log(chalk.yellow(`=> @ Compile: babel ${LinkCompiler.srcDir} to ${LinkCompiler.outputDir}`))
    await this._compileBabel()
    console.log(chalk.yellow(`=> @ Compile: link ${argv.link || LinkCompiler.defaultLink}`))
    await this._linkProject(argv.link)
    console.log(chalk.green('=> @ Compile: done'))
  }

  _clean() {
    fs.removeSync(path.resolve(process.cwd(), LinkCompiler.outputDir))
  }

  _compileBabel() {
    return new Promise((resolve) => {
      const ls = spawn('yarn', ['build'])
      ls.stderr.on('data', (data) => {
        console.log(chalk.red(`stderr: ${data}`))
      })
      ls.on('close', () => {
        resolve()
      })
    })
  }

  _linkProject(projectName = LinkCompiler.defaultLink) {
    const projectRelPath = path.resolve(process.cwd(), `../${projectName}/node_modules/@vfuk/${LinkCompiler.packageName}`)
    const copyFrom = path.resolve(process.cwd(), LinkCompiler.outputDir)
    // copy into web-shop
    console.log(chalk.gray(`copy from: ${copyFrom}`))
    console.log(chalk.gray(`copy to: ${projectRelPath}`))
    fs.copySync(copyFrom, projectRelPath)
  }
}()
