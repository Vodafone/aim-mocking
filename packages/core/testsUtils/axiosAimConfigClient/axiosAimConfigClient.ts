/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import to from 'await-to-js'
import axios from 'axios'

export default new (class AimAxiosClient {
  session = null
  sessionCookie = null

  ready = false

  constructor() {
    this.aimUrlEndpoint = 'http://localhost:8090/AIM_API'
  }

  getSessionHeaders() {
    return {
      Cookie: this.sessionCookie,
    }
  }

  async initSession() {
    const [err, res] = await to(
      axios.post(`${this.aimUrlEndpoint}/enableMocking`, {
        enabled: false,
      }),
    )
    this.sessionCookie = res?.headers?.['set-cookie']?.[0] || null
    this.session = res.data.sessionId
    this.ready = true
  }

  async getConfig(key) {
    return to(
      axios({
        method: 'post',
        url: `${this.aimUrlEndpoint}/getConfigOption`,
        data: { key },
        headers: {
          Cookie: this.sessionCookie,
        },
      }),
    )
  }

  async get(endpoint) {
    return to(
      axios({
        url: `${this.aimUrlEndpoint}/${endpoint}`,
        method: 'get',
        headers: {
          Cookie: this.sessionCookie,
        },
      }),
    )
  }

  async post(endpoint, data) {
    return to(
      axios({
        url: `${this.aimUrlEndpoint}/${endpoint}`,
        method: 'post',
        data,
        headers: {
          Cookie: this.sessionCookie,
        },
      }),
    )
  }
})()
