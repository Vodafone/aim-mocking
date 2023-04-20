import merge from 'lodash/merge.js'
import clone from 'lodash/cloneDeep.js'

export default class FeatureModifier {
  constructor(context) {
    this.context = context
  }

  feature = (featureName) => {
    return merge(clone(this.context), {
      featureName,
    })
  }
}
