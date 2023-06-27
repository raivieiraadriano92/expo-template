import type { FunctionComponent } from 'react'

import { Pressable, View } from 'react-native'
import { Text } from 'src/components/text/Text'
import colors from 'tailwindcss/colors'

import type { PressableProps } from 'react-native'

type CustomRender = FunctionComponent<{ color: string; size: number }>

type Size = 'lg' | 'small'

type ButtonProps = PressableProps & {
  renderChildren?: CustomRender
  renderLeft?: CustomRender
  renderRight?: CustomRender
  rounded?: boolean
  size?: Size
  title?: string
}

type ButtonStyle = { container: string; text: string }

const BASE_COLOR = colors.gray[900]

const BASE_ICON_SIZE = 24

const getStyle: (_: Required<Pick<ButtonProps, 'rounded' | 'size'>>) => ButtonStyle = ({
  rounded,
  size
}) => {
  const styles: Record<Size, ButtonStyle> = {
    lg: {
      container: `h-14 rounded-xl ${rounded ? 'rounded-full w-14' : 'px-8'}`,
      text: ''
    },
    small: {
      container: `h-11 rounded-lg ${rounded ? 'rounded-full w-11' : 'px-6'}`,
      text: 'text-sm'
    }
  }

  return styles[size]
}

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  disabled,
  renderChildren,
  renderLeft,
  renderRight,
  rounded = false,
  size = 'lg',
  title,
  ...props
}) => {
  const style = getStyle({ rounded, size })

  return (
    <Pressable
      className={`${
        disabled ? 'bg-gray-400' : 'bg-blue-500'
      } active:bg-blue-600 flex-row items-center justify-center ${style.container} ${className}`}
      disabled={disabled}
      {...props}>
      {!!renderLeft && (
        <View className="mr-2">{renderLeft({ color: BASE_COLOR, size: BASE_ICON_SIZE })}</View>
      )}
      {!!title && <Text className={`font-medium text-white ${style.text}`}>{title}</Text>}
      {!!renderChildren && renderChildren({ color: BASE_COLOR, size: BASE_ICON_SIZE })}
      {!!renderRight && (
        <View className="ml-2">{renderRight({ color: BASE_COLOR, size: BASE_ICON_SIZE })}</View>
      )}
    </Pressable>
  )
}
