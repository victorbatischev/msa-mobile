import React from 'react'
import { View, Text, Button } from 'react-native'

function Orders({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Orders Screen</Text>
      <Button title='Go to Auth' onPress={() => navigation.navigate('Auth')} />
    </View>
  )
}

export default Orders
