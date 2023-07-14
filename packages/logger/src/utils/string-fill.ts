// @ts-nocheck
/* eslint-disable max-len */
import { EOL } from 'os'
import chalk from 'chalk'

import config from '@config/index'

import ansiStrip from './ansi-strip'

export default function stringFill(string, fillCharacter = '-') {
  let fillString = ''
  const maxChar = config.systemCfg.consoleLineLength

  // anything to spit ?
  if (!/\[FILL]/.test(string)) return string.trim()

  const fillChars = ansiStrip(
    string
      .trim()
      .split(/\[FILL]/)
      .join(''),
  ).length
  const stringDiff = maxChar - fillChars
  if (stringDiff <= 0) {
    console.log(`${chalk.gray(' [LOGGER ERROR: ')}${chalk.gray(` logs can not exceed [consoleLineLength=${maxChar}]`)}`)
    console.log(`${chalk.gray(' [LOGGER ERROR: ')}${chalk.gray(' colors and fill has been removed in order to console log the value')}`)
    return ansiStrip(
      string
        .trim()
        .split(/\[FILL]/)
        .join(''),
    )
  }
  for (let i = stringDiff; i; i--) {
    fillString += fillCharacter
  }
  return string.replace(/\[FILL]/, chalk.gray(fillString)).trim()
}

export function postStringFill(string) {
  const stripped = ansiStrip(string)

  if (string.split) {
    // handle multi lines
    if (string.split(EOL).length > 1) {
      string = string
        .split(EOL)
        .map((line) => {
          const strippedLine = ansiStrip(line)
          while (line.match('-') && strippedLine.length > config.systemCfg.consoleLineLength) {
            line = line.replace('-', '')
          }
          return line
        })
        .join(EOL)
      return string
    }

    // handle single lines
    if (stripped.length > config.systemCfg.consoleLineLength) {
      let i = stripped.length - config.systemCfg.consoleLineLength
      for (i; i; i--) {
        string = string.replace('--', '-')
      }
    }
  }

  return string
}
