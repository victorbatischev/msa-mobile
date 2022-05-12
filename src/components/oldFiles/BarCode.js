import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import styles from '../styles/Styles'

const BarCode = ({ activeBarCode, setActiveBarCode, orders }) => {
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
        style={componentStyle.closeButton}
        onPress={() => setActiveBarCode(false)}
      >
        <View
          style={[
            componentStyle.closeButonLine,
            componentStyle.closeButonUpLine
          ]}
        />
        <View
          style={[
            componentStyle.closeButonLine,
            componentStyle.closeButonDownLine
          ]}
        />
      </Pressable>
      {bounds && (
        <View
          style={{
            position: 'absolute',
            width: bounds.width + 10,
            height: bounds.height + 10,
            top: bounds.y - 5,
            left: bounds.x - 5,
            borderColor: barCode === activeBarCode ? '#0DDFA0' : '#FF4646',
            borderWidth: 4
          }}
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
                  style={{ width: 24, height: 24 }}
                  source={require('../assets/images/ok.png')}
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
                  style={{ width: 24, height: 24 }}
                  source={require('../assets/images/no.png')}
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
              <Text
                style={{ fontFamily: 'Roboto', color: '#fff', fontSize: 10 }}
              >
                {barCode}
              </Text>
              <Text
                style={{ fontFamily: 'Roboto', fontSize: 14, color: '#fff' }}
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

const componentStyle = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    backgroundColor: '#0000007f',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButonLine: {
    width: 30,
    height: 2,
    backgroundColor: '#fff'
  },
  closeButonUpLine: {
    transform: [{ rotate: '45deg' }, { translateY: 1 }]
  },
  closeButonDownLine: {
    transform: [{ rotate: '-45deg' }, { translateY: -1 }]
  }
})

export default BarCode
