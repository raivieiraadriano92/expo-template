import { render, screen } from 'src/utils/tests'

import { Text } from './Text'

const defaultProps = {
  children: 'My Text'
}

const renderWithDefaultProps = () => render(<Text>{defaultProps.children}</Text>)

describe('<Text />', () => {
  it('must render correctly', async () => {
    renderWithDefaultProps()

    const { getByText } = screen

    expect(getByText(defaultProps.children)).toBeTruthy()
  })
})
