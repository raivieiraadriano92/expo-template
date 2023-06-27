import { render, screen } from 'src/utils/tests'

import { Label } from './Label'

const defaultProps = {
  children: 'My Label'
}

const renderWithDefaultProps = () => render(<Label>{defaultProps.children}</Label>)

describe('<Label />', () => {
  it('must render correctly', async () => {
    renderWithDefaultProps()

    const { getByText } = screen

    expect(getByText(defaultProps.children)).toBeTruthy()
  })
})
