import React from 'react'
import { View, Text, Pressable } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from '../styles/Styles'

const Order = ({ item, idx }) => {
  const print = () => {
    console.log('print')
  }

  return (
    <View
      style={{
        ...styles.orderContainer,
        backgroundColor: idx === 0 ? '#EEEEEE' : '#F8F8F8'
      }}
    >
      <QRCode value={item._id} size={40} logoMargin={2} />
      <View style={{ ...styles.center, flexDirection: 'column' }}>
        <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F' }}>
          {item._id}
        </Text>
        <Text style={{ fontFamily: 'Roboto', fontSize: 16 }}>{item.name}</Text>
      </View>
      <Icon.Button
        name='print'
        color={'#000'}
        backgroundColor={'#fff'}
        style={{
          paddingLeft: 10,
          paddingRight: 0,
          borderColor: '#999',
          borderWidth: 1
        }}
        size={28}
        onPress={() => print()}
      />
    </View>
  )
}

export default Order
