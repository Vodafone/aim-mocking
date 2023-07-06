// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EOL } from 'os'

import figures from 'figures'
import chalk from 'chalk'
import isUndefined from 'lodash/isUndefined.js'

import stdout from '@interfaces/output/stdout'
import writefile from '@interfaces/output/writefile'
import testMode from '@interfaces/output/testMode'

import stringFill, { postStringFill } from '@utils/string-fill'
import clearConsole from '@utils/clearConsole'

export default new (class OutputHandler {
  static hasAppStartBeenCalled = false

  static hasConsoleBeenCleared = false

  static outputInterfaces = [
    ['stdout', stdout],
    ['writefile', writefile],
    ['testMode', testMode],
  ]

  // generic buffer
  buffer = []

  // hold groups buffer
  groupBuffer = {}

  spinnerBuffer = []

  _applyOutputInterface(context, logOutput) {
    const enabledInterfaces = OutputHandler.outputInterfaces.filter((inter) => {
      return context.config.outputInterfaces.includes(inter[0])
    })
    enabledInterfaces.forEach(([interfaceName, interfaceInstance]) => {
      interfaceInstance.output(postStringFill(logOutput), context.config)
    })
  }

  _flushOutput(context, logOutput) {
    // FeatureL enforceAppStartFirst
    if (context.config.enforceAppStartFirst && !OutputHandler.hasAppStartBeenCalled) {
      if (context.isAppStart) {
        this.buffer.unshift(logOutput)
        OutputHandler.hasAppStartBeenCalled = true
        this.buffer.forEach((buffer) => {
          this._applyOutputInterface(context, buffer)
        })
        this.buffer = []
      } else {
        this.buffer.push(logOutput)
      }
    } else {
      this._applyOutputInterface(context, logOutput)
    }
  }

  handleOutput(context, logOutput) {
    // Feature clean console
    if (context.config.clearConsole && !OutputHandler.hasConsoleBeenCleared) {
      OutputHandler.hasConsoleBeenCleared = true
      clearConsole()
    }

    if (context.isGroup && !context.isDebugFlag && !context.isDebugKeyEnabled) {
      return
    }

    if (context.isGroup && context.isDebugKeyEnabled) {
      logOutput = `${chalk.blueBright(`[${context.debugKeyName}]`)} ${logOutput}`
    }

    if (context.isDebugFlag) {
      // Feature: isDebugFlag
      // if (!argv.debug && !argv.verbose && !process.env.DEBUG) {
      //   return
      // }
    }

    // Feature: feature logging:
    // suspend all logs except ones matching [featureLogging]
    if (context.config.featuresLogging && context.config.featuresLogging.length) {
      if (!context.config.featuresLogging.includes(context.featureName)) {
        return
      }
    }

    // Feature: Application logging
    // suspend all logs except ones matching [applicationLogging]
    if (context.config.applicationLogging && context.config.applicationLogging.length) {
      if (!context.config.applicationLogging.includes(context.applicationName)) {
        return
      }
    }

    // Feature: groups
    // handle buffers
    if (context.groupName) {
      // console.log(context)
      // handle no buffer && add to buffer
      if (isUndefined(this.groupBuffer[context.groupName])) {
        this.groupBuffer[context.groupName] = []
      }
      // if no logOutput this is a debug.flush() method, do not add anything to buffer
      if (logOutput) {
        this.groupBuffer[context.groupName].push(logOutput)
      }
      // handle buffer flush
      if (context.groupFlush) {
        this._flushOutput(context, stringFill(`${chalk.grey(`AIM: `)}${chalk.gray(`${figures.pointer} ${context.groupName} Group`)} [FILL]`))
        this.groupBuffer[context.groupName].forEach((bufferLogOutput) => {
          bufferLogOutput.split(EOL).map((line) => {
            this._flushOutput(context, `${chalk.grey(`AIM: `)}${chalk.gray(`${figures.pointer} ${context.groupName}:`)} ${line}`)
          })
        })
        this.groupBuffer[context.groupName] = []
      }
      return
    } else {
      logOutput = `${chalk.grey(`AIM: `)}${logOutput}`
    }

    if (context.spinner) {
      context.spinner.text = `${context.spinnerText} - ${logOutput}`
      this.spinnerBuffer.push(logOutput)
      return
    }

    if (this.spinnerBuffer.length) {
      const spinnerBuffer = this.spinnerBuffer
      this.spinnerBuffer = []
      spinnerBuffer.forEach((buffer) => {
        this.handleOutput(context, buffer)
      })
    }

    if (!logOutput) return

    this._flushOutput(context, logOutput)
  }
})()
