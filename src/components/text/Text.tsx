import type { FunctionComponent } from 'react'

import { Text as RNText } from 'react-native'

import type { TextProps as RNTextProps } from 'react-native'

type TextProps = RNTextProps

export const Text: FunctionComponent<TextProps> = ({ children }) => <RNText>{children}</RNText>
