import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import styles from '../styles/Styles'

const BarCode = ({ activeBarCode, orders }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [barCode, setBarcode] = useState(null)
  const [point, setPoint] = useState({ x: '50%', y: 27 })

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ data, bounds }) => {
    setPoint((prev) => ({
      ...prev,
      y: bounds.origin.y + bounds.size.height + 54
    }))
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
      <View
        style={{ height: '100%', width: '100%', backgroundColor: 'black' }}
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: '105%', height: '200%' }}
      />
      {scanned && (
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            width: 260,
            height: 54,
            backgroundColor: '#fff',
            top: point.y,
            left: point.x,
            translateX: -130,
            translateY: -27
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: '50%',
              top: -8,
              translateY: -10,
              borderWidth: 9,
              borderRightColor: 'transparent',
              borderTopColor: 'transparent',
              borderBottomColor: '#fff',
              borderLeftColor: 'transparent'
            }}
          />
          <View
            style={{
              ...styles.barCodeResult,
              backgroundColor: 'darkgreen',
              borderRadius: 3
            }}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require('../assets/images/ok.png')}
            />
          </View>
          <View style={{ marginLeft: 5 }}>
            <Text>{barCode}</Text>
          </View>
        </View>
      )}
      {scanned && (
        <View style={{ position: 'absolute', bottom: 0 }}>
          <Button
            title={'Tap to Scan Again'}
            onPress={() => setScanned(false)}
          />
          <View
            style={{ ...styles.orderContainer, backgroundColor: '#FFFFFF' }}
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
                style={{ fontFamily: 'Roboto', fontSize: 16 }}
                numberOfLines={2}
                ellipsizeMode={'middle'}
              >
                {orders.find((item) => item._id === barCode)?.name ||
                  'Wrong bar code!'}
              </Text>
              <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F' }}>
                {barCode}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default BarCode
