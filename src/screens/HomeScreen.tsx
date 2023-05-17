import { StyleSheet, Text, View } from 'react-native'
import { i18n } from 'src/i18n'

import type { RootStackScreen } from 'src/navigation'

export const HomeScreen: RootStackScreen<'Home'> = () => (
  <View style={styles.container}>
    <Text>{i18n.t('screens.home.title')}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
