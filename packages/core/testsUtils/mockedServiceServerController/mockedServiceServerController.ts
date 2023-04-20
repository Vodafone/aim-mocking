// @ts-nocheck
import path from 'path'

import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

import testsConfig from '../config/config'

export function clean() {
  it('should clean cache dir', (done) => {
    rimraf(path.resolve(process.cwd(), testsConfig.rootPath), () => {
      mkdirp.sync(path.resolve(process.cwd(), testsConfig.rootPath))
      done()
    })
  })
}

export function bootstrap(server) {
  it('expect api server to run', (done) => {
    server._instance = server.listen(8090, 'localhost', () => {
      console.log('Starting api server on http://localhost:8090')
      expect(server).not.toBeUndefined()
      done()
    })
  }, 10000)
}

export function teardown(server) {
  it('expect api server to close down', (done) => {
    server._instance.close(() => {
      done()
    })
  }, 10000)
}
