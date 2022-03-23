import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

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
        <Image source={{ uri: item.file_url }} style={{ height: '77%' }} />
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
    height: '100%'
  }
})

export default TechMaps
