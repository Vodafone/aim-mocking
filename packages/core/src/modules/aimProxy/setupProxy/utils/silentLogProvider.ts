/* eslint-disable @typescript-eslint/no-empty-function */
// @ts-nocheck
export default function silentLogProvider() {
  return {
    log: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
  }
}
