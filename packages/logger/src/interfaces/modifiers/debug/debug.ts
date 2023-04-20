import merge from 'lodash/merge.js'
import clone from 'lodash/cloneDeep.js'

const enabledDebugKeys = []

export default class DebugModifier {
  constructor(context) {
    this.context = context
  }

  debug = (debugKeyName) => {
    const isEnabled = enabledDebugKeys.includes(debugKeyName)
    return merge(clone(this.context), {
      debugKeyName,
      isGroup: true,
      isDebugFlag: process.env.DEBUG,
      isDebugKeyEnabled: isEnabled,
      enable: () => {
        enabledDebugKeys.push(debugKeyName)
      },
    })
  }
}
