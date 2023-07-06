// @ts-nocheck
import path from 'path'
import https from 'https'
import sessionStore from '../sessionStore'

import to from 'await-to-js'

import axios from 'axios'

import ensureTrackerData from './utils/ensureTrackerFile'
import getTrackerData from './utils/getTrackerData'
import saveTrackerData from './utils/saveTrackerData'
import getReqHash from '../cache/helpers/getReqHash'

// TODO: autofix still to be reviewed
export class HashAutoFix {
  trackerFilePath = path.resolve(process.cwd(), '.aimRequestTracker.json')

  // Track request in order to be able to autofix all of them later
  track(req) {
    try {
      // If tracker file do not exists - create
      ensureTrackerData(this.trackerFilePath)
      // Get existing tracker data
      const trackerData = getTrackerData(this.trackerFilePath)
      // Prepare tracker data
      const scenario = sessionStore.get(req, 'scenario')
      const hash = getReqHash(req)
      const key = `${scenario}-${req.method}-${req.path}-${hash}`
      // console.log(req.)
      trackerData.requests[key] = {
        url: req.url,
        method: req.method,
        body: req.body,
        query: req.query,
        protocol: req.protocol,
        hostname: req.hostname,
        scenario: sessionStore.get(req, 'scenario'),
        AIM: req.header('aim'),
      }
      // Save tracker data
      saveTrackerData(this.trackerFilePath, trackerData)
    } catch (err) {
      console.log(err)
    }
  }

  autofix = async (req, res) => {
    sessionStore.set(req, 'mocking', true, true)
    // Get existing tracker data
    const trackerData = getTrackerData(this.trackerFilePath)
    const resData = {}

    // Iterate each request and check if mock works
    // If mock is broken, aim autofix will run on it in cache.js trying to fix it
    for (const [requestKey, request] of Object.entries(trackerData.requests)) {
      sessionStore.set(req, 'scenario', request.scenario, true)
      const url = `${request.protocol}://${request.hostname}:8000${request.url}`
      const headers = { aim_generic_session: 'true' }
      if (request.AIM) headers.AIM = request.AIM
      const agent = new https.Agent({
        rejectUnauthorized: false,
      })
      // Make request
      const [err] = await to(
        axios({
          url,
          method: request.method,
          body: request.body,
          headers: headers,
          httpsAgent: agent,
        }),
      )
      resData[requestKey] = !err
    }
    res.send(resData)
  }
}

export default new HashAutoFix()
