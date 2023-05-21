import type { FunctionComponent } from 'react'

import { Pressable } from 'react-native'
import { Text } from 'src/components/text/Text'

import type { PressableProps } from 'react-native'

type ButtonProps = PressableProps & {
  title: string
}

export const Button: FunctionComponent<ButtonProps> = ({ onPress, title }) => (
  <Pressable {...{ onPress }}>
    <Text>{title}</Text>
  </Pressable>
)
