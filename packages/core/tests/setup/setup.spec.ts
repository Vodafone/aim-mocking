// @ts-nocheck
/** *************************************************************************** */
/** Import - test utilities                                                     */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
import * as loggerChecker from '../../testsUtils/loggerChecker/loggerChecker'
import testsConfig from '../../testsUtils/config/config'
import axiosAimConfigClient from '../../testsUtils/axiosAimConfigClient'
import axiosApiClient from '../../testsUtils/axiosApiClient'
import mockedServiceServer from '../../testsUtils/mockedServiceServer'
import * as mockedServiceServerCtrl from '../../testsUtils/mockedServiceServerController'
/** *************************************************************************** */
/** Import - test configs                                                       */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
import aimConfig from './aim.config'
/** *************************************************************************** */
/** Prepare test                                                                */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
// Setup server with given aim config
const server = mockedServiceServer(aimConfig)
mockedServiceServerCtrl.clean()
mockedServiceServerCtrl.bootstrap(server, testsConfig.cacheOutputDir)
/** *************************************************************************** */
/** Test content                                                                */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
beforeEach(() => {
  loggerChecker.clear()
})

it('prepare', async () => {
  process.env.LOGGER_MEMORY = 'true'
  await axiosAimConfigClient.initSession()
  await axiosAimConfigClient.post('enableRecording', { enabled: false })
  await axiosAimConfigClient.post('enableMocking', { enabled: false })
})

it('Should return health check 200 and sessionId', async () => {
  server.mode = 200
  // Make call
  await axiosApiClient({ reqUrl: 'api/test/1' })
  const [err, res] = await axiosAimConfigClient.post('health', { enabled: false })
  expect(err).toBe(null)
  expect(res.status).toBe(200)
  expect(res.data.sessionId).not.toBeUndefined()
}, 10000)

it('Should skip interception since mocking and recording are disabled', async () => {
  server.mode = 200
  // Make call
  await axiosApiClient({ reqUrl: 'api/test/1' })
  expect(loggerChecker.exists('incoming request | /api/test/1')).toBe(1)
  expect(loggerChecker.exists('AIM disabled mocking and recording are disabled')).toBe(1)
}, 10000)

it('Should skip interception as mocking and recording is not allowed at the same time', async () => {
  server.mode = 200
  await axiosAimConfigClient.post('enableRecording', { enabled: true })
  await axiosAimConfigClient.post('enableMocking', { enabled: true })

  // Make call
  await axiosApiClient({ reqUrl: 'api/test/1' })
  expect(loggerChecker.exists('incoming request | /api/test/1')).toBe(1)
  expect(loggerChecker.exists('AIM DISABLED - mocking and recording cannot be enabled at the same time')).toBe(1)
}, 10000)

mockedServiceServerCtrl.teardown(server)
mockedServiceServerCtrl.clean()
