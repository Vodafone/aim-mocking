import merge from 'lodash/merge.js'
import clone from 'lodash/cloneDeep.js'
import outputHandler from '@modules/outputHandler'

export default class GroupModifier {
  constructor(context) {
    this.context = context
  }

  group = (groupName) => {
    return merge(clone(this.context), {
      groupName,
      flush: function flush() {
        this.groupFlush = true
        outputHandler.handleOutput(this)
      },
    })
  }
}
