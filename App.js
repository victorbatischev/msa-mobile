import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper'

import Auth from './src/screens/Auth'
import Orders from './src/screens/Orders'

import { theme } from './src/Constants'

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>{RootStack()}</NavigationContainer>
    </PaperProvider>
  )
}

export default App
