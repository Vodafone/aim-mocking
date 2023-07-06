import configController from '@modules/configController'

import type { FilteredRequest } from '../../getFilteredReq.types'

function reqPathMatchPattern(pattern: string, reqPath: FilteredRequest['path']) {
  const res = []
  // does the pattern contain any flag? ( % )
  let containAnyFlag = false
  // extract pattern items from pattern eg /test/*/data -> ['/test/', '/data']
  const patternItem = pattern.split('*')
  // iterate through each ignore pattern partial
  for (const partial of patternItem) {
    let matched = null
    if (partial.substr(-1) === '%') {
      containAnyFlag = true
      const reg = new RegExp(`${partial.replace('%', '')}(.)+`)
      matched = reqPath.match(reg)
    } else {
      matched = reqPath.match(partial)
    }
    if (!matched) return null
    reqPath = reqPath.replace(partial, '-')
    res.push(matched[0])
  }
  const finalPath = res.join('@')

  if (containAnyFlag) return finalPath

  // if end of the string do not contain '-'
  // if string doesn't contain slashes
  if (reqPath.substr(-1) !== '-' || /\//.test(reqPath)) {
    if (pattern.substr(-1) === '*') {
      // There is a wildcard at the very end of the string
      return finalPath
    }
    return null
  }

  return finalPath
}

export default function filterReqPath(req: FilteredRequest) {
  let hashIgnoredPaths = configController.config.hashIgnoredReqPathPatterns
  // re-order hashIgnoredPathPatterns
  // without this some rules can matched wrong patterns
  hashIgnoredPaths = hashIgnoredPaths.sort((a, b) => {
    return b.length - a.length
  })
  // iterate through ignored patterns
  for (const pattern of hashIgnoredPaths) {
    const matchingPattern = reqPathMatchPattern(pattern, req.path)
    if (matchingPattern) {
      req.path = matchingPattern
      return req
    }
  }
  return req
}
