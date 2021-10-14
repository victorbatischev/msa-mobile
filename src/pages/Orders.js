import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import Header from '../components/Header'

function Orders({ route, navigation }) {
  const [role, setRole] = useState(null)
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])

  const logOut = async () => {
    axios
      .put('worker_in', {
        _id: user.u_id,
        at_work: false
      })
      .then(async () => {
        await AsyncStorage.clear()
        navigation.navigate('Auth')
      })
  }

  useEffect(() => {
    async function getData() {
      const tempRole = await AsyncStorage.getItem('role')
      const tempUser = JSON.parse(await AsyncStorage.getItem('user'))
      setRole(tempRole)
      setUser(tempUser)

      let checkLogout = setInterval(async () => {
        await axios.get(`worker_logout/${tempUser.u_id}`).then((res) => {
          if (res.data[0].at_work === false) {
            clearInterval(checkLogout)
            logOut()
          }
        })

        axios.get(`order_worker/${tempUser.u_id}`).then((res) => {
          setOrders(res.data)
        })
      }, 10000)
    }

    getData()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Header logOut={logOut} userName={route.params.userName} />
      <Text>{role}</Text>
      {orders.map((item, idx) => {
        return (
          <View style={{ padding: 10 }} key={idx}>
            <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F' }}>
              {item._id}
            </Text>
            <Text style={{ fontFamily: 'Roboto', fontSize: 16 }}>
              {item.name}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

export default Orders
