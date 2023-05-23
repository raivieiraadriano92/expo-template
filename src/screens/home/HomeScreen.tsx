import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Button, Text } from 'src/components'

import type { RootStackScreen } from 'src/navigation'

export const HomeScreen: RootStackScreen<'Home'> = ({ navigation }) => {
  const { t } = useTranslation()

  return (
    <View className="flex-1 items-center justify-center p-6 space-y-10">
      <Text>{t('screens.home.title')}</Text>
      <Button
        renderLeft={({ color }) => <Text style={{ color }}>{`<>`}</Text>}
        renderRight={() => <Text>{`<>`}</Text>}
        onPress={() => navigation.navigate('Profile')}
        title="Go to Profile"
      />
    </View>
  )
}
