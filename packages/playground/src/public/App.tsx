import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

import AimControls from './components/AimControls'
import Population from './components/Population'

import * as Styles from './App.styles'

export default class App extends React.Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <Styles.Container>
          <Styles.Header> Vodafone - AIM Playground </Styles.Header>
          <AimControls />
          <Population />
        </Styles.Container>
      </QueryClientProvider>
    )
  }
}
