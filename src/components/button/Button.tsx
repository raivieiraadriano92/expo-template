import type { FunctionComponent } from 'react'

import { Pressable, View } from 'react-native'
import { Text } from 'src/components/text/Text'
import colors from 'src/theme/colors'

import type { PressableProps } from 'react-native'

type CustomRender = FunctionComponent<{ color: string }>

type Size = 'lg' | 'small'

type ButtonProps = PressableProps & {
  renderLeft?: CustomRender
  renderRight?: CustomRender
  size?: Size
  title: string
}

const BASE_COLOR = colors.text.base

const sizes: Record<Size, { container: string; text: string }> = {
  lg: {
    container: 'h-14 px-8 rounded-xl',
    text: ''
  },
  small: {
    container: 'h-11 px-6 rounded-lg',
    text: 'text-sm'
  }
}

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  renderLeft,
  renderRight,
  size = 'lg',
  title,
  ...props
}) => (
  <Pressable
    className={`bg-primary-500 active:bg-primary-600 flex-row items-center justify-center ${sizes[size].container} ${className}`}
    {...props}>
    {!!renderLeft && <View className="mr-2">{renderLeft({ color: BASE_COLOR })}</View>}
    <Text className={`font-medium text-text-base ${sizes[size].text}`}>{title}</Text>
    {!!renderRight && <View className="ml-2">{renderRight({ color: BASE_COLOR })}</View>}
  </Pressable>
)
