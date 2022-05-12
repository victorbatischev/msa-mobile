import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { windowWidth } from '../Constants'
import axios from 'axios'
import * as Print from 'expo-print'
import styles from '../styles/Styles'

import qrcode from '../lib/createImgTagQr/qrcode'

const Order = ({
  item,
  idx,
  activeBarCode,
  setActiveBarCode,
  icon,
  setEquipmentArr
}) => {
  const [ImgTag, setImgTag] = useState('')

  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body>
    <div style="font-size: 50px; font-family: Helvetica Neue; text-align: center;">
      <p style="margin: 0 0 20px; font-weight: bold";>Order's id</p>
      <p style="margin: 0px">${item._id}</p>
      <p style="margin: 40px 0 20px; font-weight: bold"">Order's name</p>
      <p style="margin: 0px">${item.name}</p>
      <div style="width: 500px; height: 500px; margin: 0 auto;">
       ${ImgTag}
      </div>
    </div>
  </body>
</html>
`
  useEffect(() => {
    imgCreate()
  }, [item])

  useEffect(() => {
    axios.get(`equipment_o_id/${item.operation.o_id}`).then((res) => {
      setEquipmentArr(res.data)
    })
  }, [])

  const imgCreate = () => {
    if (item._id) {
      const qr = qrcode(0, 'L')
      qr.addData(item._id)
      qr.make()
      const res = qr.createImgTag()
      setImgTag(res)
    }
  }

  const print = async () => {
    await Print.printAsync({
      html
    })
  }

  return (
    <View
      style={{
        ...styles.orderContainer,
        backgroundColor: idx === 0 ? '#F5F5F5' : '#FFFFFF',
        width: windowWidth > 480 ? 260 : windowWidth,
        borderRightWidth: windowWidth > 480 ? 0.5 : 0,
        borderRightColor: '#00000029'
      }}
    >
      <Pressable
        onPress={() => {
          setActiveBarCode(!activeBarCode)
        }}
      >
        {windowWidth <= 480 ? (
          <QRCode value={item._id} size={40} logoMargin={2} />
        ) : (
          <Image source={icon} style={{ marginRight: 10 }}></Image>
        )}
      </Pressable>
      <View>
        <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F' }}>
          {item._id}
        </Text>
        <Text
          style={{ fontFamily: 'Roboto', fontSize: 16 }}
          numberOfLines={1}
          ellipsizeMode={'middle'}
        >
          {item.name}
        </Text>
      </View>
      {windowWidth <= 480 && (
        <Pressable onPress={() => print()}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../assets/images/print.png')}
          />
        </Pressable>
      )}
    </View>
  )
}

export default Order
