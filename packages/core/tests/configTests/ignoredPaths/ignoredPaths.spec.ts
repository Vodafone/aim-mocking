// @ts-nocheck
/** *************************************************************************** */
/** Import - test utilities                                                     */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
import testsConfig from '../../../testsUtils/config/config'
import axiosAimConfigClient from '../../../testsUtils/axiosAimConfigClient'
import axiosApiClient from '../../../testsUtils/axiosApiClient'
import * as loggerChecker from '../../../testsUtils/loggerChecker'
import mockedServiceServer from '../../../testsUtils/mockedServiceServer'
import * as mockedServiceServerCtrl from '../../../testsUtils/mockedServiceServerController'
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
  await axiosAimConfigClient.initSession()
  await axiosAimConfigClient.post('enableRecording', { enabled: false })
  await axiosAimConfigClient.post('enableMocking', { enabled: false })
  await axiosAimConfigClient.post('setScenario', { scenario: 'default' })
})

it('Should not call ignored paths', async () => {
  server.mode = 200
  await axiosAimConfigClient.post('enableRecording', { enabled: true })
  // Make calls for aim to create mocks
  await axiosApiClient({ reqUrl: 'api/test/ignoreAll/1' })
  await axiosApiClient({ reqUrl: 'api/test/ignoreAll/a/b/c/1' })
  await axiosApiClient({ reqUrl: 'api/test/ignoreSlash' })
  await axiosApiClient({ reqUrl: 'api/test/ignoreSlash/1' })
  // Check if path was excluded
  expect(loggerChecker.exists('AIM: isExcludedPath: ignoreAll excluded')).toBe(4)
  expect(loggerChecker.exists('AIM: isExcludedPath: ignoreSlash/ excluded')).toBe(2)
  // Check if "ignoreSlash" without slash was not excluded
  expect(loggerChecker.exists('GET/api-test-ignoreSlash-000.json'))
}, 100000)

mockedServiceServerCtrl.teardown(server)
