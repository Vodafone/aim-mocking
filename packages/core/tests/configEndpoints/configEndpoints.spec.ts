/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/** *************************************************************************** */
/** Import - test utilities                                                     */
/** --------------------------------------------------------------------------- */
/** Local utilities to help prepare and run tests                               */
/** *************************************************************************** */
import testsConfig from '../../testsUtils/config/config'
import axiosAimConfigClient from '../../testsUtils/axiosAimConfigClient'
import mockedServiceServer from '../../testsUtils/mockedServiceServer'
import * as mockedServiceServerCtrl from '../../testsUtils/mockedServiceServerController'
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
  await axiosAimConfigClient.post('enableMocking', { enabled: false })
})

describe('enableMocking', () => {
  it('Should set enable to true', async () => {
    const [err, res] = await axiosAimConfigClient.post('enableMocking', { enabled: true })
    expect(res.data.key).toBe('mocking')
    expect(res.data.value).toBe(true)
  }, 10000)
  it('Should set enable to false', async () => {
    const [err, res] = await axiosAimConfigClient.post('enableMocking', { enabled: false })
    expect(res.data.key).toBe('mocking')
    expect(res.data.value).toBe(false)
  }, 10000)
})

describe('enableRecording', () => {
  it('Should set enable to true', async () => {
    const [err, res] = await axiosAimConfigClient.post('enableRecording', { enabled: true })
    expect(res.data.key).toBe('recording')
    expect(res.data.value).toBe(true)
  }, 10000)
  it('Should set enable to false', async () => {
    const [err, res] = await axiosAimConfigClient.post('enableRecording', { enabled: false })
    expect(res.data.key).toBe('recording')
    expect(res.data.value).toBe(false)
  }, 10000)
})

describe('getScenariosList', () => {
  it('Should return list of scenarios', async () => {
    createMock('pages/default', 'GET', 'api-test-1-000', {})
    createMock('pages/summary', 'GET', 'api-test-1-000', {})
    createMock('pages/summary/a/b', 'GET', 'api-test-1-000', {})
    const [err, res] = await axiosAimConfigClient.get('getScenariosList')
    expect(res.data).toEqual([
      {
        children: [
          { children: [], disabled: false, label: 'default', tagLabel: 'pages/default', value: 'pages/default' },
          {
            children: [{ children: [{ children: [], disabled: false, label: 'b', tagLabel: 'pages/summary/a/b', value: 'pages/summary/a/b' }], disabled: true, label: 'a', tagLabel: 'pages/summary/a', value: 'pages/summary/a' }],
            disabled: true,
            label: 'summary',
            tagLabel: 'pages/summary',
            value: 'pages/summary',
          },
        ],
        disabled: true,
        label: 'pages',
        tagLabel: 'pages',
        value: 'pages',
      },
    ])
  }, 10000)
})

mockedServiceServerCtrl.teardown(server)
mockedServiceServerCtrl.clean()
