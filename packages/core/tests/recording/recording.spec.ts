// @ts-nocheck
/** *************************************************************************** */
/** Import - test utilities                                                     */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
import testsConfig from '../../testsUtils/config/config'
import axiosAimConfigClient from '../../testsUtils/axiosAimConfigClient'
import axiosApiClient from '../../testsUtils/axiosApiClient'
import * as mocksChecker from '../../testsUtils/mocksChecker'
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
it('prepare', async () => {
  await axiosAimConfigClient.initSession()
  await axiosAimConfigClient.post('enableRecording', { enabled: false })
  await axiosAimConfigClient.post('enableMocking', { enabled: false })
  await axiosAimConfigClient.post('setScenario', { scenario: 'default' })
})

it('Should record simple mocks', async () => {
  server.mode = 200
  await axiosAimConfigClient.post('enableRecording', { enabled: true })
  // Make calls for aim to create mocks
  await axiosApiClient({ reqUrl: 'api/1' })
  await axiosApiClient({ reqUrl: 'api/2' })
  await axiosApiClient({ reqUrl: 'api/3' })
  // Check if mocks exists
  expect(mocksChecker.exists('default', 'get', 'api-1-000.json')).toBe(true)
  expect(mocksChecker.exists('default', 'get', 'api-2-000.json')).toBe(true)
  expect(mocksChecker.exists('default', 'get', 'api-3-000.json')).toBe(true)
  // Check if file content is OK
  expect(mocksChecker.get('default', 'get', 'api-3-000.json').data).toBe('data')
  expect(mocksChecker.get('default', 'get', 'api-3-000.json').__cacheMeta.date).not.toBeUndefined()
  expect(mocksChecker.get('default', 'get', 'api-3-000.json').__cacheMeta.status).not.toBeUndefined()
  expect(mocksChecker.get('default', 'get', 'api-3-000.json').__cacheMeta.hash).not.toBeUndefined()
}, 10000)

it('Should record mocks with ignored url keys', async () => {
  server.mode = 200
  await axiosAimConfigClient.post('enableRecording', { enabled: true })
  // Should ignore single ID urls
  await axiosApiClient({ reqUrl: 'api/ignored-url/1' })
  expect(mocksChecker.exists('default', 'get', 'api-ignored-url-@-000.json')).toBe(true)
  // Should ignore single id with key following
  await axiosApiClient({ reqUrl: 'api/ignored-url/2/id' })
  expect(mocksChecker.exists('default', 'get', 'api-ignored-url-@-id-000.json')).toBe(true)
  // Should ignore more complex ignore patterns
  await axiosApiClient({ reqUrl: 'api/ignored-url/3/id/5/id' })
  expect(mocksChecker.exists('default', 'get', 'api-ignored-url-@-id-@-id-000.json')).toBe(true)
}, 100000)

it('Should record mocks with ignored body keys', async () => {
  server.mode = 200
  await axiosAimConfigClient.post('enableRecording', { enabled: true })
  // Should create 000 hash mock
  await axiosApiClient({ method: 'post', reqUrl: 'api/body', data: { time: 5 } })
  expect(mocksChecker.exists('default', 'post', 'api-body-000.json')).toBe(true)
  expect(mocksChecker.get('default', 'post', 'api-body-000.json').__cacheMeta.hash.body).toBe('{}')
  // Should create mock with one body hash
  await axiosApiClient({ method: 'post', reqUrl: 'api/body', data: { time: 5, test: 'test' } })
  expect(mocksChecker.exists('default', 'post', 'api-body-956d7341.json')).toBe(true)
  expect(mocksChecker.get('default', 'post', 'api-body-956d7341.json').__cacheMeta.hash.body).toEqual('{"test":"test"}')
}, 100000)

it('Should record mocks with ignored query keys', async () => {
  server.mode = 200
  await axiosAimConfigClient.post('enableRecording', { enabled: true })
  // Should create 000 hash mock
  await axiosApiClient({ reqUrl: 'api/query?time=456' })
  expect(mocksChecker.exists('default', 'get', 'api-query-000.json')).toBe(true)
  expect(mocksChecker.get('default', 'get', 'api-query-000.json').__cacheMeta.hash.query).toBe('{}')
  // Should create mock with one query hash
  await axiosApiClient({ reqUrl: 'api/query?time=456&admin=true' })
  expect(mocksChecker.exists('default', 'get', 'api-query-9603c75a.json')).toBe(true)
  expect(mocksChecker.get('default', 'get', 'api-query-9603c75a.json').__cacheMeta.hash.query).toBe('{"admin":"true"}')
}, 100000)

mockedServiceServerCtrl.teardown(server)
mockedServiceServerCtrl.clean()
