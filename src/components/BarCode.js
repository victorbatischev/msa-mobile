import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import styles from '../styles/Styles'

const BarCode = ({ activeBarCode, orders }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [barCode, setBarcode] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ data }) => {
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
        style={StyleSheet.absoluteFill}
      />
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
