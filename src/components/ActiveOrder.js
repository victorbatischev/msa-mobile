import React, { useState, useEffect } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import axios from 'axios'
import styles from '../styles/Styles'
import { windowWidth } from '../Constants'

const ActiveOrder = ({ activeOrderId, userId }) => {
  const [orderData, setOrderData] = useState(null)
  const [description, setDescription] = useState(null)
  const [workTime, setWorkTime] = useState(null)

  useEffect(() => {
    axios.get(`order_id_worker/${activeOrderId}/${userId}`).then((res) => {
      setOrderData(res.data[0].order)
      setDescription(res.data[0].description?.name)
      setWorkTime('00:00:00')
    })
  }, [])

  const print = () => {
    console.log('print')
  }

  return (
    <View style={{ ...styles.container, width: '100%' }}>
      <View style={styles.orderHeader}>
        <QRCode value={activeOrderId} size={50} logoMargin={2} />
        <View style={{ textAlign: 'left', maxWidth: windowWidth - 150 }}>
          <Text style={{ fontFamily: 'Roboto', fontSize: 16 }}>
            {orderData?.auto?.Марка} {orderData?.auto?.Модель}{' '}
            {orderData?.auto?.Поколение}
          </Text>
          <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F' }}>
            {activeOrderId}
          </Text>
        </View>
        <Pressable style={styles.printButton} onPress={() => print()}>
          <Text>print</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Image
          style={{ width: 60, height: 60, marginBottom: 20 }}
          source={require('../assets/images/warning.png')}
        />
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 20,
            color: '#282A2D',
            textAlign: 'center',
            paddingHorizontal: 50
          }}
        >
          Complete order information will appear after clicking "START"
        </Text>
      </View>
      <View style={styles.operationContainer}>
        <Text style={{ fontFamily: 'Roboto', fontSize: 12, color: '#8F8F8F' }}>
          Operation
        </Text>
        <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>
          {description}
        </Text>
      </View>
      <View style={{ ...styles.center, height: 70 }}>
        <View style={{ ...styles.container, backgroundColor: '#000' }}>
          <Text style={{ fontFamily: 'Roboto', fontSize: 12, color: '#888' }}>
            Work time on the order
          </Text>
          <Text
            style={{ fontFamily: 'Montserrat', fontSize: 30, color: '#fff' }}
          >
            {workTime}
          </Text>
        </View>
        <Pressable style={{ ...styles.container, backgroundColor: '#0080FF' }}>
          <Text
            style={{ fontFamily: 'Montserrat', fontSize: 30, color: '#fff' }}
          >
            START
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ActiveOrder
