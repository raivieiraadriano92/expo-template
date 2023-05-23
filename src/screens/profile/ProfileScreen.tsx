import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Button, Text } from 'src/components'

import type { RootStackScreen } from 'src/navigation'

export const ProfileScreen: RootStackScreen<'Profile'> = ({ navigation }) => {
  const { t } = useTranslation()

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{t('screens.profile.title')}</Text>
      <Button onPress={() => navigation.navigate('Home')} title="Go to Home" />
    </View>
  )
}
