import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: 'jest-expo',
  // By default, all files inside `node_modules` are not transformed. But some 3rd party
  // modules are published as untranspiled, Jest will not understand the code in these modules.
  // To overcome this, exclude these modules in the ignore pattern.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js'
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './jest.setup.ts']
}

export default config
