import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import Header from '../components/Header'

function Orders({ navigation }) {
  const [role, setRole] = useState(null)
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    async function getData() {
      const tempRole = await AsyncStorage.getItem('role')
      const tempUser = JSON.parse(await AsyncStorage.getItem('user'))
      setRole(tempRole)
      setUser(tempUser)

      await axios.get(`worker_name/${tempUser.u_id}`).then((res) => {
        setUserName(res.data[0].name)
      })
    }

    getData()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Header navigation={navigation} user={user} userName={userName} />
      <Text>{role}</Text>
    </View>
  )
}

export default Orders
