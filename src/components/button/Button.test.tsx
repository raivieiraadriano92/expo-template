import { fireEvent, render, screen } from 'src/utils/tests'

import { Button } from './Button'

const defaultProps = {
  onPress: jest.fn(),
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
})
