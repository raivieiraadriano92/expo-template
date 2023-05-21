import type { FunctionComponent } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, ProfileScreen } from 'src/screens'

import type { RootStackParamList } from './types'

const NativeStackNavigator = createNativeStackNavigator<RootStackParamList>()

export const RootStackNavigator: FunctionComponent = () => (
  <NativeStackNavigator.Navigator>
    <NativeStackNavigator.Screen component={HomeScreen} name="Home" />
    <NativeStackNavigator.Screen component={ProfileScreen} name="Profile" />
  </NativeStackNavigator.Navigator>
)
