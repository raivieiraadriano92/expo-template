import { render, screen } from '@testing-library/react-native'

import { App } from './App'

describe('<App />', () => {
  it('must render correctly', async () => {
    render(<App />)

    const { getByText } = screen

    expect(getByText('Open up App.tsx to start working on your app!')).toBeTruthy()
  })
})
