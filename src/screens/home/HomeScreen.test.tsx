import { buildNavigationMock, fireEvent, render, screen } from 'src/utils/tests'

import { HomeScreen } from './HomeScreen'

const navigationProp = buildNavigationMock()

const renderScreenWithDefaultProps = () =>
  render(<HomeScreen navigation={navigationProp} route={{ key: 'HomeScreen', name: 'Home' }} />)

describe('<HomeScreen />', () => {
  it('must render correctly', async () => {
    renderScreenWithDefaultProps()

    const { getByText } = screen

    expect(getByText('Open up App.tsx to start working on your app!')).toBeTruthy()
  })

  it('must navigate to Profile screen correctly', async () => {
    renderScreenWithDefaultProps()

    fireEvent.press(screen.getByText('Go to Profile'))

    expect(navigationProp.navigate).toHaveBeenCalledWith('Profile')
  })
})
