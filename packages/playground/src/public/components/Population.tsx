import React from 'react'
import axios from 'axios'

import { useQuery } from 'react-query'

import * as Styles from './Population.styles'

export default function Population() {
  // Load population API data
  const { isLoading, error, data, refetch } = useQuery('populationData', () => {
    return axios
      .get('/api/api/data?drilldowns=Nation&measures=Population', {
        headers: {
          AIM: 'population',
        },
      })
      .then((res) => res.data)
  })

  // @ts-ignore
  if (error) return <p>An error has occurred: ${error.message}</p>

  // @ts-ignore
  window.populationRefetch = refetch

  return (
    <Styles.Container>
      <p>Example list of api results.</p>
      <p>When AIM mocking is enabled it will load real api response</p>
      <p>
        When AIM mocking is <strong>disabled</strong> it will use file mock from here: <i>"packages/playground/__mockapi__/default/GET/population-api-data-4c1a80fd.json"</i>
      </p>
      <p>For more examples please check AIM.postman_collection.json which you can load into postman and play with playground server.</p>
      <Styles.Items>
        {!isLoading &&
          data.data &&
          data.data.map((d: any) => (
            <Styles.Item>
              <p>{d.Nation}</p>
              <p>{d.Year}</p>
              <p>{d.Population}</p>
            </Styles.Item>
          ))}
      </Styles.Items>
    </Styles.Container>
  )
}
