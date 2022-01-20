import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import styles from '../styles/Styles'

const Order = ({ item, idx, activeBarCode, setActiveBarCode }) => {
  const print = () => {
    console.log('print')
  }

  return (
    <View
      style={{
        ...styles.orderContainer,
        backgroundColor: idx === 0 ? '#FFFFFF' : '#F8F8F8'
      }}
    >
      <Pressable
        onPress={() => {
          activeBarCode ? setActiveBarCode(null) : setActiveBarCode(item._id)
        }}
      >
        <QRCode value={item._id} size={40} logoMargin={2} />
      </Pressable>
      <View style={{ ...styles.center, flexDirection: 'column', width: '70%' }}>
        <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F' }}>
          {item._id}
        </Text>
        <Text
          style={{ fontFamily: 'Roboto', fontSize: 16 }}
          numberOfLines={2}
          ellipsizeMode={'middle'}
        >
          {item.name}
        </Text>
      </View>
      <Pressable>
        <Image
          onPress={() => print()}
          style={{ width: 40, height: 40 }}
          source={require('../assets/images/print.png')}
        />
      </Pressable>
    </View>
  )
}

export default Order
