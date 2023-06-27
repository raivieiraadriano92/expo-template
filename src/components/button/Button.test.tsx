import { View } from 'react-native'
import { fireEvent, render, screen } from 'src/utils/tests'

import { Button } from './Button'

const defaultProps = {
  onPress: jest.fn(),
  renderChildren: jest.fn(() => <View testID="children-id" />),
  renderLeft: jest.fn(() => <View testID="left-id" />),
  renderRight: jest.fn(() => <View testID="right-id" />),
  title: 'My button'
}

const renderWithDefaultProps = () => render(<Button {...defaultProps} />)

describe('<Button />', () => {
  it('must render correctly', async () => {
    renderWithDefaultProps()

    const { getByText } = screen

    expect(getByText(defaultProps.title)).toBeTruthy()
  })

  it('must handle onPress correctly', async () => {
    renderWithDefaultProps()

    fireEvent.press(screen.getByText(defaultProps.title))

    expect(defaultProps.onPress).toHaveBeenCalledTimes(1)
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

  it('must handle renderChildren correctly', async () => {
    renderWithDefaultProps()

    const { getByTestId } = screen

    expect(defaultProps.renderChildren).toHaveBeenCalledTimes(1)

    expect(getByTestId('children-id')).toBeTruthy()
  })
})
