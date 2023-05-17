import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'

import { en } from './translations/en'
import { es } from './translations/es'
import { pt } from './translations/pt'

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en,
  es,
  pt
}

const i18n = new I18n(translations)

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true

// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';

export { i18n }
