import 'intl-pluralrules'
import 'src/i18n'

import type { FunctionComponent, PropsWithChildren } from 'react'

import { NavigationContainer } from '@react-navigation/native'

export const AppProviders: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <NavigationContainer>{children}</NavigationContainer>
)
