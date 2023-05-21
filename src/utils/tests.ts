import { render } from '@testing-library/react-native'
import { AppProviders } from 'src/AppProviders'

const customRender: typeof render = (ui, options) =>
  render(ui, { wrapper: AppProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }

export const buildNavigationMock = () => ({
  addListener: jest.fn(),
  canGoBack: jest.fn(),
  dispatch: jest.fn(),
  getId: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(() => true),
  navigate: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  push: jest.fn(),
  removeListener: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn()
})
