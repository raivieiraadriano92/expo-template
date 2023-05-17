import { render } from '@testing-library/react-native'
import { AppProviders } from 'src/AppProviders'

const customRender: typeof render = (ui, options) =>
  render(ui, { wrapper: AppProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
