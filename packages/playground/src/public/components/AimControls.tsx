import React from 'react'
import axios from 'axios'

import { useQuery } from 'react-query'

import * as Styles from './AimControls.styles'

export default function AimControls() {
  // Get AIM mocking status
  // Either enabled or disabled
  const { data, refetch } = useQuery(
    'aimMocking',
    () => {
      return axios.post('/AIM_API/getConfigOption', { key: 'mocking' })
    },
    {
      refetchOnWindowFocus: false,
      enabled: true, // disable this query from automatically running
    },
  )

  // Use API request to change AIM mocking status
  const switchAimMocking = () => {
    return axios.post('/AIM_API/enableMocking', { enabled: data && data.data ? !data.data.value : true })
  }

  // Handle AIM mocking change button click
  const handleClick = async () => {
    await switchAimMocking()
    refetch()
    // Global refetch access, not ideal, but OK for playground app
    // @ts-ignore
    window.populationRefetch()
  }

  return (
    <Styles.Container>
      <Styles.Header>AIM Example control panel</Styles.Header>
      {data && <Styles.Button onClick={handleClick}>AIM enabled: {String(!!data.data.value)}</Styles.Button>}
    </Styles.Container>
  )
}
