/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/** *************************************************************************** */
/** Import - test utilities                                                     */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
import * as loggerChecker from '../../testsUtils/loggerChecker/loggerChecker'
import testsConfig from '../../testsUtils/config/config'
import axiosAimConfigClient from '../../testsUtils/axiosAimConfigClient'
import mockedServiceServer from '../../testsUtils/mockedServiceServer'
import * as mockedServiceServerCtrl from '../../testsUtils/mockedServiceServerController'
import axiosApiClient from '../../testsUtils/axiosApiClient'
import wait from '../../testsUtils/wait'
import createMock from '../../testsUtils/createMock'
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
it('prepare', async () => {
  await axiosAimConfigClient.initSession()
  await axiosAimConfigClient.post('enableRecording', { enabled: false })
  await axiosAimConfigClient.post('enableMocking', { enabled: true })
  await axiosAimConfigClient.post('setScenario', { scenario: 'customer' })
})

it('Should support nested hash ignored req body keys', async () => {
  server.mode = 200
  // Make call
  createMock('customer', 'GET', 'api-test-1-010e177e', {})
  createMock('customer', 'GET', 'api-test-1-cc58677d', {})
  await axiosApiClient({ reqUrl: 'api/test/1', data: { id: 1, customer: { name: 'John', type: 'test' } } })
  await axiosApiClient({ reqUrl: 'api/test/1', data: { id: 1, customer: { name: 'Test', type: 'admin' } } })
  await axiosApiClient({ reqUrl: 'api/test/1', data: { id: 1, customer: { name: 'Test', type: 'admin', test: 1 } } })
  await wait(500)
  // Check app flow
  expect(loggerChecker.exists('Returned mocked file')).toBe(3)
  expect(loggerChecker.exists('tests/__mockapi__/customer/GET/api-test-1-010e177e.json')).toBe(8)
  expect(loggerChecker.exists('tests/__mockapi__/customer/GET/api-test-1-cc58677d.json')).toBe(4)
  expect(loggerChecker.exists('The mock file not found')).toBe(0)
}, 10000)

mockedServiceServerCtrl.teardown(server)
mockedServiceServerCtrl.clean()
