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
import createMock from '../../testsUtils/createMock'
import wait from '../../testsUtils/wait'
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

it('Should return root fallback mock', async () => {
  server.mode = 200
  await axiosAimConfigClient.post('enableRecording', { enabled: false })
  await axiosAimConfigClient.post('enableMocking', { enabled: true })
  // Make call
  createMock('__shared__', 'GET', 'api-test-1-000', {})
  await axiosApiClient({ reqUrl: 'api/test/1' })
  await wait(500)
  // Check app flow
  expect(loggerChecker.exists('tests/__mockapi__/default/GET/api-test-1-000.json')).toBe(2)
  expect(loggerChecker.exists('tests/__mockapi__/__shared__/GET/api-test-1-000.json')).toBe(4)
  expect(loggerChecker.exists('fallback mock file exists')).toBe(1)
  expect(loggerChecker.exists('cache served')).toBe(1)
}, 20000)

it('Should return nested fallback mock', async () => {
  server.mode = 200
  await axiosAimConfigClient.post('enableRecording', { enabled: false })
  await axiosAimConfigClient.post('enableMocking', { enabled: true })
  await axiosAimConfigClient.post('setScenario', { scenario: 'a/b/c/d' })
  // Make call
  createMock('a/b/__shared__', 'GET', 'api-test-1-000', {})
  await axiosApiClient({ reqUrl: 'api/test/1' })
  await wait(500)
  // Check app flow
  expect(loggerChecker.exists('tests/__mockapi__/a/b/c/d/GET/api-test-1-000.json')).toBe(2)
  expect(loggerChecker.exists('tests/__mockapi__/a/b/__shared__/GET/api-test-1-000.json')).toBe(4)
  expect(loggerChecker.exists('fallback mock file exists')).toBe(1)
  expect(loggerChecker.exists('cache served')).toBe(1)
}, 10000)

mockedServiceServerCtrl.teardown(server)
