import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'src/components'

import type { RootStackScreen } from 'src/navigation'

export const HomeScreen: RootStackScreen<'Home'> = ({ navigation }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text>{t('screens.home.title')}</Text>
      <Button onPress={() => navigation.navigate('Profile')} title="Go to Profile" />
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
