import type { FunctionComponent } from 'react'

import { TextInput as RNTextInput, TouchableOpacity, View } from 'react-native'
import { Label } from 'src/components/label/Label'
import { Text } from 'src/components/text/Text'
import colors from 'tailwindcss/colors'

import type { TextInputProps as RNTextInputProps } from 'react-native'

type CustomRender = FunctionComponent<{ color: string; size: number }>

type TextInputProps = RNTextInputProps & {
  textInputClassName?: RNTextInputProps['className']
  error?: string
  label?: string
  onPress?(): void
  pressable?: boolean
  renderLeft?: CustomRender
  renderRight?: CustomRender
}

const BASE_COLOR = colors.gray[400]

const BASE_ICON_SIZE = 24

export const TextInput: FunctionComponent<TextInputProps> = ({
  className,
  error,
  label,
  onPress,
  pressable,
  renderLeft,
  renderRight,
  style,
  textInputClassName,
  ...props
}) => (
  <View className={`space-y-2 ${className}`} {...{ style }}>
    {!!label && <Label>{label}</Label>}
    <TouchableOpacity {...{ onPress }}>
      <View
        {...(pressable ? { pointerEvents: 'none' } : {})}
        className={`bg-white border-[1px] ${
          error ? 'border-red-500' : 'border-gray-200'
        } flex-row items-center px-4 rounded-lg`}>
        {!!renderLeft && (
          <View className="mr-4">{renderLeft({ color: BASE_COLOR, size: BASE_ICON_SIZE })}</View>
        )}
        <RNTextInput
          className={`flex-1 h-13 items-center text-sm text-gray-900 ${textInputClassName}`}
          placeholderTextColor={BASE_COLOR}
          {...props}
        />
        {!!renderRight && (
          <View className="ml-4">{renderRight({ color: BASE_COLOR, size: BASE_ICON_SIZE })}</View>
        )}
      </View>
    </TouchableOpacity>
    {!!error && <Text className="text-xs text-red-500">{error}</Text>}
  </View>
)
