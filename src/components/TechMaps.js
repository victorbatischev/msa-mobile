import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import ImageZoom from 'react-native-image-pan-zoom'

const TechMaps = ({ operationId }) => {
  const [mapsArr, setMapsArr] = useState(null)
  useEffect(() => {
    axios
      .get(`order_worker_techmap/6178503ecb30bb6aa7dc2020`)
      .then((response) => {
        console.log(response.data[0].technical_maps)
        setMapsArr(response.data[0].technical_maps)
      })
  }, [])
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: item.file_url }}
          style={{ height: '90%' }}
          resizeMode={'contain'}
        />
      </View>
    )
  }
  const renderNextButton = () => {
    return (
      <View style={styles.button}>
        <View style={[styles.upLineNext, styles.line]} />
        <View style={[styles.downLineNext, styles.line]} />
      </View>
    )
  }
  const renderPrevButton = () => {
    return (
      <View style={styles.button}>
        <View style={[styles.upLinePrev, styles.line]} />
        <View style={[styles.downLinePrew, styles.line]} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {mapsArr?.length > 0 ? (
        <AppIntroSlider
          keyExtractor={(item, index) => 'key' + index}
          renderItem={renderItem}
          data={mapsArr}
          renderNextButton={renderNextButton}
          showPrevButton={true}
          renderPrevButton={renderPrevButton}
        />
      ) : (
        <Text>loading...</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '85%'
  },
  button: {
    width: 70,
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: 20,
    height: 3,
    backgroundColor: '#fff'
  },
  upLineNext: {
    transform: [{ rotate: '45deg' }, { translateY: -7 }]
  },
  downLineNext: {
    transform: [{ rotate: '-45deg' }, { translateY: 7 }]
  },
  upLinePrev: {
    transform: [{ rotate: '-45deg' }, { translateY: -7 }]
  },
  downLinePrew: {
    transform: [{ rotate: '45deg' }, { translateY: 7 }]
  }
})

export default TechMaps
