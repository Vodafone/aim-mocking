#!/usr/bin/env node
import commander from 'commander'
import gatherLicensesCommand from './actions/gatherLicenses/command'
;(() => {
  const comms = commander
  gatherLicensesCommand(comms)
  // @ts-ignore
  comms.parse(process.argv)
})()
