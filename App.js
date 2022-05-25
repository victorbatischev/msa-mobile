import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider } from 'react-native-paper'

import Auth from './src/pages/Auth'
import Main from './src/pages/Main'

import { theme } from './src/Constants'
import { Provider } from 'react-redux'
import store from './src/redux/store'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode={'screen'}
          screenOptions={() => ({
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: false,
            animationEnabled: true
          })}
          mode='modal'
          initialRouteName='Auth'
        >
          <Stack.Screen name='Auth' component={Auth} />
          <Stack.Screen name='Main' component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
function Application() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
export default Application
