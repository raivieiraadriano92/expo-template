import type { FunctionComponent } from 'react'

import { TextInput as RNTextInput, View } from 'react-native'
import colors from 'src/theme/colors'

import type { TextInputProps as RNTextInputProps } from 'react-native'

type CustomRender = FunctionComponent<{ color: string }>

type TextInputProps = RNTextInputProps & {
  renderLeft?: CustomRender
  renderRight?: CustomRender
}

const BASE_COLOR = colors.text.light

export const TextInput: FunctionComponent<TextInputProps> = ({
  className,
  renderLeft,
  renderRight,
  style,
  ...props
}) => (
  <View className={`bg-white flex-row items-center px-4 rounded-lg ${className}`} {...{ style }}>
    {!!renderLeft && <View className="mr-4">{renderLeft({ color: BASE_COLOR })}</View>}
    <RNTextInput
      className="flex-1 h-13 items-center text-sm text-text-base"
      placeholderTextColor={BASE_COLOR}
      {...props}
    />
    {!!renderRight && <View className="ml-4">{renderRight({ color: BASE_COLOR })}</View>}
  </View>
)
