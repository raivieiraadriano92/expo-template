import type { FunctionComponent } from 'react'

import { Text as RNText } from 'react-native'

import type { TextProps } from 'react-native'

export const Text: FunctionComponent<TextProps> = ({ children, className, ...props }) => (
  <RNText className={`font-normal text-base text-gray-900 ${className}`} {...props}>
    {children}
  </RNText>
)
