import path from 'path'
import { EOL } from 'os'
import AnsiToHtml from 'ansi-to-html'
import fs from 'fs-extra'

import ensurePath from '@utils/ensurePath'

import baseHtmlBody from './baseHtmlBody'

export default new (class WriteFile {
  static hasBeenInitialized = false

  ansiToHtml = null

  _init(config) {
    const outputFileDir = path.resolve(process.cwd(), config.logFileOutputPath)
    const outputFile = path.resolve(outputFileDir, 'log.html')
    ensurePath(outputFileDir)
    fs.writeFileSync(outputFile, baseHtmlBody, 'utf8')
    this.logFileStream = fs.createWriteStream(outputFile, { flags: 'a' })
    this.logFileStream.on('error', function (err) {
      console.log(err)
    })
    this.ansiToHtml = new AnsiToHtml()
  }

  prepareContent(string) {
    string = string.split(EOL).join('<br>')
    string = string.replace(' ', '&nbsp;')
    // fix icons
    string = string.split('✖').join('<span class="icons-container"><i class="material-icons">close</i></span>')
    string = string.split('◌').join('<span class="icons-container"><i class="material-icons">lens</i></span>')
    string = string.split('✔').join('<span class="icons-container"><i class="material-icons">check</i></span>')
    string = string.split('©').join('<span class="icons-container"><i class="material-icons">copyright</i></span>')
    return this.ansiToHtml.toHtml(string)
  }

  output(logOutput, config) {
    if (!WriteFile.hasBeenInitialized) {
      WriteFile.hasBeenInitialized = true
      this._init(config)
    }
    try {
      this.logFileStream.write(`<p class="row">${new Date().toISOString()} ${this.prepareContent(logOutput)}</p>`)
    } catch (err) {
      console.log(err)
    }
  }
})()
