import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { windowWidth } from '../../Constants'
import axios from 'axios'
import * as Print from 'expo-print'
import styles from '../../styles/Styles'
import qrcode from '../../lib/createImgTagQr/qrcode'
import { htmlPrint } from '../../Constants'
import componentStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'

const Order = ({
  item,
  idx,
  icon
  //setEquipmentArr
}) => {
  const dispatch = useDispatch()
  const activeBarCode = useSelector((state) => state.main.activeBarCode)

  const [ImgTag, setImgTag] = useState('')

  const html = useMemo(
    () => htmlPrint(item._id, item.name, ImgTag),
    [item, ImgTag]
  )

  // const equipmentRequest = (o_id) => {
  //   axios.get(`equipment_o_id/${o_id}`).then((res) => {
  //     setEquipmentArr(res.data)
  //   })
  // }

  useEffect(() => {
    imgCreate()
  }, [item])

  // useEffect(() => {
  //   equipmentRequest(item.operation.o_id)
  // }, [item.operation.o_id])

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
          dispatch(setActiveBarCode(!activeBarCode))
        }}
      >
        {windowWidth <= 480 ? (
          <QRCode value={item._id} size={40} logoMargin={2} />
        ) : (
          <Image source={icon} style={componentStyles.iconStyle}></Image>
        )}
      </Pressable>
      <View>
        <Text style={componentStyles.itemIdText}>{item._id}</Text>
        <Text
          style={componentStyles.itemNameText}
          numberOfLines={1}
          ellipsizeMode={'middle'}
        >
          {item.name}
        </Text>
      </View>
      {windowWidth <= 480 && (
        <Pressable onPress={() => print()}>
          <Image
            style={componentStyles.printIcon}
            source={require('../../assets/images/print.png')}
          />
        </Pressable>
      )}
    </View>
  )
}

export default Order
