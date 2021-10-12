import React from 'react'
import { View, Text, Button } from 'react-native'

function Auth({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Auth Screen</Text>
      <Button
        title='Go to Orders'
        onPress={() => navigation.navigate('Orders')}
      />
    </View>
  )
}

export default Auth
