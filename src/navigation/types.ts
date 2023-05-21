// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
// import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { FunctionComponent } from 'react'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  //   Home: NavigatorScreenParams<HomeTabParamList>
  Home: undefined
  Profile: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>

export type RootStackScreen<RouteName extends keyof RootStackParamList> = FunctionComponent<
  RootStackScreenProps<RouteName>
>

// export type HomeTabParamList = {
//   Popular: undefined
//   Latest: undefined
// }

// export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
//   BottomTabScreenProps<HomeTabParamList, T>,
//   RootStackScreenProps<keyof RootStackParamList>
// >

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
