import { buildNavigationMock, fireEvent, render, screen } from 'src/utils/tests'

import { ProfileScreen } from './ProfileScreen'

const navigationProp = buildNavigationMock()

const renderScreenWithDefaultProps = () =>
  render(
    <ProfileScreen navigation={navigationProp} route={{ key: 'ProfileScreen', name: 'Profile' }} />
  )

describe('<ProfileScreen />', () => {
  it('must render correctly', async () => {
    renderScreenWithDefaultProps()

    const { getByText } = screen

    expect(getByText('Open up App.tsx to start working on your app!')).toBeTruthy()
  })

  it('must navigate to Home screen correctly', async () => {
    renderScreenWithDefaultProps()

    fireEvent.press(screen.getByText('Go to Home'))

    expect(navigationProp.navigate).toHaveBeenCalledWith('Home')
  })
})
