import type { FunctionComponent } from 'react'

import { StatusBar } from 'expo-status-bar'
import { AppProviders } from 'src/AppProviders'

import { RootStackNavigator } from './navigation'

export const App: FunctionComponent = () => (
  <AppProviders>
    <RootStackNavigator />
    <StatusBar style="auto" />
  </AppProviders>
)
