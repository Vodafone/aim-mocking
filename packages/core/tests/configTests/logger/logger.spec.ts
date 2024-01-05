// @ts-nocheck
/** *************************************************************************** */
/** Import - test utilities                                                     */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
import testsConfig from '../../../testsUtils/config/config'
import axiosAimConfigClient from '../../../testsUtils/axiosAimConfigClient'
import axiosApiClient from '../../../testsUtils/axiosApiClient'
import mockedServiceServer from '../../../testsUtils/mockedServiceServer'
import * as mockedServiceServerCtrl from '../../../testsUtils/mockedServiceServerController'
import * as loggerChecker from '../../../testsUtils/loggerChecker'
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
// Clear logs before starting the server
// !DO NOT use before/after each in this test or it will remove startup logs
loggerChecker.clear()
// Setup server with given aim config
const server = mockedServiceServer(aimConfig)
mockedServiceServerCtrl.clean()
mockedServiceServerCtrl.bootstrap(server, testsConfig.cacheOutputDir)
/** *************************************************************************** */
/** Test content                                                                */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
it('prepare', async () => {
  await axiosAimConfigClient.initSession()
  await axiosAimConfigClient.post('enableRecording', { enabled: false })
  await axiosAimConfigClient.post('enableMocking', { enabled: false })
  await axiosAimConfigClient.post('setScenario', { scenario: 'default' })
})

it('Should print only enabled logs', async () => {
  server.mode = 200
  await axiosAimConfigClient.post('enableRecording', { enabled: true })
  // Make calls for aim to create mocks
  await axiosApiClient({ reqUrl: 'api/test/1' })
  await axiosApiClient({ reqUrl: 'api/test/2' })
  await axiosApiClient({ reqUrl: 'api/test/3' })
  // Check what logs are printing
  expect(loggerChecker.exists('[general]')).toBeGreaterThan(0)
  expect(loggerChecker.exists('[setup]')).toBeGreaterThan(0)
  expect(loggerChecker.exists('[cache]')).toBe(0)
  expect(loggerChecker.exists('[cacheDebug]')).toBeGreaterThan(0)
  expect(loggerChecker.exists('[config]')).toBeGreaterThan(0)
  expect(loggerChecker.exists('[onProxyRequest]')).toBe(0)
  expect(loggerChecker.exists('[onProxyRequestDebug]')).toBeGreaterThan(0)
  expect(loggerChecker.exists('[onProxyResponse]')).toBeGreaterThan(0)
  expect(loggerChecker.exists('[onProxyResponseDebug]')).toBeGreaterThan(0)
  expect(loggerChecker.exists('[onProxyError]')).toBe(0)
  expect(loggerChecker.exists('[configEndpoints]')).toBe(0)
  expect(loggerChecker.exists('[configEndpointsDebug]')).toBeGreaterThan(0)
  expect(loggerChecker.exists('[cacheController]')).toBe(0)
  expect(loggerChecker.exists('[fileInterface]')).toBe(0)
  expect(loggerChecker.exists('[ScenarioList]')).toBe(0)
  loggerChecker.clear()
}, 10000)

mockedServiceServerCtrl.teardown(server)
mockedServiceServerCtrl.clean()
