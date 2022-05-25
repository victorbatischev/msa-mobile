import React, { useState, useEffect, useSyncExternalStore } from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import componentStyles from './styles'
import styles from '../../styles/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'

const BarCode = () => {
  const dispatch = useDispatch()
  const activeBarCode = useSelector((state) => state.main.activeBarCode)
  const orders = useSelector((state) => state.main.orders)

  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [barCode, setBarcode] = useState(null)
  const [bounds, setBounds] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ data, bounds }) => {
    setBounds({
      x: bounds.origin.x,
      y: bounds.origin.y,
      width: bounds.size.width,
      height: bounds.size.height
    })
    setScanned(true)
    setBarcode(data)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
      />
      <Pressable
        style={componentStyles.closeButton}
        onPress={() => dispatch(setActiveBarCode(false))}
      >
        <View
          style={[
            componentStyles.closeButonLine,
            componentStyles.closeButonUpLine
          ]}
        />
        <View
          style={[
            componentStyles.closeButonLine,
            componentStyles.closeButonDownLine
          ]}
        />
      </Pressable>
      {bounds && (
        <View
          style={[
            componentStyles.bounds,
            {
              width: bounds.width + 10,
              height: bounds.height + 10,
              top: bounds.y - 5,
              left: bounds.x - 5,
              borderColor: barCode === activeBarCode ? '#0DDFA0' : '#FF4646'
            }
          ]}
        />
      )}
      {scanned && (
        <View style={{ position: 'absolute', bottom: 25 }}>
          <View
            style={{
              ...styles.orderContainer,
              height: 55,
              backgroundColor: '#0000007f',
              borderRadius: 4,
              justifyContent: 'flex-start'
            }}
          >
            {barCode === activeBarCode ? (
              <View
                style={{
                  ...styles.barCodeResult,
                  backgroundColor: 'darkgreen'
                }}
              >
                <Image
                  style={componentStyles.buttons}
                  source={require('../../assets/images/ok.png')}
                />
              </View>
            ) : (
              <View
                style={{
                  ...styles.barCodeResult,
                  backgroundColor: 'darkred'
                }}
              >
                <Image
                  style={componentStyles.buttons}
                  source={require('../../assets/images/no.png')}
                />
              </View>
            )}
            <View
              style={{
                ...styles.center,
                flexDirection: 'column',
                width: '70%'
              }}
            >
              <Text style={componentStyles.barcodeText}>{barCode}</Text>
              <Text
                style={componentStyles.orderNameText}
                numberOfLines={2}
                ellipsizeMode={'middle'}
              >
                {orders.find((item) => item._id === barCode)?.name ||
                  'Wrong QR code'}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default BarCode
