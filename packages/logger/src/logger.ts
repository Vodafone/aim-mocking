// @ts-nocheck
import merge from 'lodash/merge.js'
import get from 'lodash/get.js'

import config from '@config/index'

import stdoutFilter from '@modules/stdoutFilter'

// logging interfaces
import Yarn from '@interfaces/logging/yarn'
import Console from '@interfaces/logging/console'

import DebugModifier from '@interfaces/modifiers/debug'
import GroupModifier from '@interfaces/modifiers/group'
import FeatureModifier from '@interfaces/modifiers/feature'

import { Logger } from './index.types'

/**
 * Logger
 */
export default new (class Logger {
  constructor() {
    this.config = config.systemCfg
    this.theme = config.themeCfg
    this._applyInterfaces()
  }

  /**
   * Set config
   * - overwrite default config
   * @param {Object} customConfig
   */
  setConfig(customConfig) {
    this.config = merge(this.config, customConfig)
  }

  setSchema(customSchema) {
    this.theme = merge(this.theme, customSchema)
  }

  setApplicationName(applicationName) {
    this.applicationName = applicationName
  }

  /**
   * Apply logger interfaces
   * - each interface has different logging capabilities and looks
   */
  _applyInterfaces() {
    // logging interfaces
    this.yarn = new Yarn(this)
    this.console = new Console(this)
    // modifiers interfaces
    const debugModifier = new DebugModifier(this)
    this.debug = debugModifier.debug
    const featureModifier = new FeatureModifier(this)
    this.feature = featureModifier.feature
    const groupModifier = new GroupModifier(this)
    this.group = groupModifier.group
    // others
    if (get(this.config, 'stdoutFilter.enabled', false)) {
      stdoutFilter.use(this.config.stdoutFilter)
    }
  }
})() as Logger
