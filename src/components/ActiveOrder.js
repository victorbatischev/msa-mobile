import React, { useState, useEffect } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import axios from 'axios'
import styles from '../styles/Styles'
import { windowWidth } from '../Constants'

const ActiveOrder = ({ activeOrderId, userId }) => {
  const [orderData, setOrderData] = useState(null)
  useEffect(() => {
    axios.get(`order_id_worker/${activeOrderId}/${userId}`).then((res) => {
      setOrderData(res.data[0].order)
    })
  }, [])

  const print = () => {
    console.log('print')
  }

  return (
    <View
      style={{ ...styles.container, width: '100%', backgroundColor: 'green' }}
    >
      <View style={styles.orderHeader}>
        <QRCode value={activeOrderId} size={windowWidth / 3} />
        <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F', margin: 5 }}>
          {activeOrderId}
        </Text>
        <Text style={{ fontFamily: 'Roboto', fontSize: 20 }}>
          {orderData?.auto?.Марка} {orderData?.auto?.Модель}{' '}
          {orderData?.auto?.Поколение}
        </Text>
        <Pressable style={styles.printButton} onPress={() => print()}>
          <Text>print</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Image
          style={{ width: 60, height: 60 }}
          source={require('../assets/images/warning.png')}
        />
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 16,
            color: '#282A2D',
            textAlign: 'center',
            padding: 20
          }}
        >
          Complete order information will appear after clicking "START"
        </Text>
      </View>
    </View>
  )
}

export default ActiveOrder
