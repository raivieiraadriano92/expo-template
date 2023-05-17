import { render, screen } from '@testing-library/react-native'

import { App } from './App'

describe('<App />', () => {
  it('renders correctly', async () => {
    render(<App />)

    const { getByText, toJSON } = screen

    expect(getByText('Open up App.tsx to start working on your app!')).toBeTruthy()

    expect(toJSON()).toMatchSnapshot()
  })
})
