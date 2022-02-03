import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { windowWidth } from '../../Constants'
import arrowMain from '../../assets/icons/arrowMain.jpg'

import styles from '../../styles/Styles'

const OrderActive = ({ item, activeBarCode, setActiveBarCode }) => {
  const print = () => {
    console.log('print')
  }

  return (
    <View
      style={{
        ...styles.orderContainer,
        backgroundColor: '#FFFFFF',
        width: '100%'
      }}
    >
      <Pressable
        onPress={() => {
          activeBarCode ? setActiveBarCode(null) : setActiveBarCode(item._id)
        }}
      >
        <QRCode value={item._id} size={40} logoMargin={2} />
      </Pressable>
      <View
        style={{
          ...styles.center,
          flexDirection: 'column',
          width: '30%'
        }}
      >
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
        {/* <Image
          onPress={() => print()}
          style={{ width: 40, height: 40 }}
          source={require('../../assets/images/print.png')}
        /> */}
        <View
          style={{
            width: 76,
            height: 36,
            backgroundColor: '#F5F5F5',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 15 }}>print</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default OrderActive
