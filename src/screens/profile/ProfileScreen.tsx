import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'src/components'

import type { RootStackScreen } from 'src/navigation'

export const ProfileScreen: RootStackScreen<'Profile'> = ({ navigation }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text>{t('screens.profile.title')}</Text>
      <Button onPress={() => navigation.navigate('Home')} title="Go to Home" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
