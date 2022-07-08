import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'

import styles from '../../styles/Styles'

const ActiveOrderHeader = () => {
  const dispatch = useDispatch()
  const activeBarCode = useSelector((state) => state.main.activeBarCode)
  const item = useSelector((state) => state.main.orders[0])

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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            activeBarCode
              ? dispatch(setActiveBarCode(false))
              : dispatch(setActiveBarCode(true))
          }}
        >
          <QRCode value={item._id} size={40} logoMargin={2} />
        </TouchableOpacity>
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
    </View>
  )
}

export default ActiveOrderHeader
