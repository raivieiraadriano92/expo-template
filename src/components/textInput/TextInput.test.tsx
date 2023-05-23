import { View } from 'react-native'
import { render, screen } from 'src/utils/tests'

import { TextInput } from './TextInput'

const defaultProps = {
  placeholder: 'My Input',
  renderLeft: jest.fn(() => <View testID="left-id" />),
  renderRight: jest.fn(() => <View testID="right-id" />)
}

const renderWithDefaultProps = () => render(<TextInput {...defaultProps} />)

describe('<TextInput />', () => {
  it('must render correctly', async () => {
    renderWithDefaultProps()

    const { getByPlaceholderText } = screen

    expect(getByPlaceholderText(defaultProps.placeholder)).toBeTruthy()
  })

  it('must handle renderLeft correctly', async () => {
    renderWithDefaultProps()

    const { getByTestId } = screen

    expect(defaultProps.renderLeft).toHaveBeenCalledTimes(1)

    expect(getByTestId('left-id')).toBeTruthy()
  })

  it('must handle renderRight correctly', async () => {
    renderWithDefaultProps()

    const { getByTestId } = screen

    expect(defaultProps.renderRight).toHaveBeenCalledTimes(1)

    expect(getByTestId('right-id')).toBeTruthy()
  })
})
