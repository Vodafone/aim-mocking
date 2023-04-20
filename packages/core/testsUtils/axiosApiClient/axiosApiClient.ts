// @ts-nocheck
import to from 'await-to-js'
import axios from 'axios'

import axiosAimConfigClient from '../axiosAimConfigClient'

export default async function axiosApiClient({ method = 'get', reqUrl, data }) {
  await to(axios({ method: method, url: `http://localhost:8090/${reqUrl}`, headers: axiosAimConfigClient.getSessionHeaders(), data }))
}
