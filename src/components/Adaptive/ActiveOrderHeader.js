import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'

import styles from '../../styles/Styles'

const ActiveOrderHeader = ({ item }) => {
  const dispatch = useDispatch()
  const activeBarCode = useSelector((state) => state.main.activeBarCode)

  // const print = () => {
  //   console.log('print')
  // }

  return (
    <View
      style={{
        ...styles.orderContainer,
        backgroundColor: '#FFFFFF',
        width: '100%'
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          onPress={() => {
            activeBarCode
              ? dispatch(setActiveBarCode(false))
              : dispatch(setActiveBarCode(true))
          }}
        >
          <QRCode value={item._id} size={40} logoMargin={2} />
        </Pressable>
        <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
          <Text
            style={{ fontFamily: 'Roboto', fontSize: 16 }}
            numberOfLines={2}
            ellipsizeMode={'middle'}
          >
            {item.name}
          </Text>
          <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F' }}>
            {item._id}
          </Text>
        </View>
      </View>
      {/* <Pressable onPress={() => print()}>
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
      </Pressable> */}
    </View>
  )
}

export default ActiveOrderHeader
