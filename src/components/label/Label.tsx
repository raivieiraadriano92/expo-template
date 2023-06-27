import type { FunctionComponent } from 'react'

import { Text as RNText } from 'react-native'

import type { TextProps } from 'react-native'

export const Label: FunctionComponent<TextProps> = ({ children, className, ...props }) => (
  <RNText className={`font-semibold text-sm text-gray-400 ${className}`} {...props}>
    {children}
  </RNText>
)
