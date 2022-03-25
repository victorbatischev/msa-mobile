import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  Dimensions
} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import ImageZoom from 'react-native-image-pan-zoom'

const TechMaps = ({ operationId }) => {
  const [mapsArr, setMapsArr] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    axios.get(`order_worker_techmap/${operationId}`).then((response) => {
      setMapsArr(response.data[0].technical_maps)
    })
  }, [])
  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
        <View style={styles.mapName}>
          <Text>{item.name}</Text>
        </View>
        <Image
          source={{ uri: item.file_url }}
          style={{ height: '80%' }}
          resizeMode={'contain'}
        />
        <Modal visible={modalVisible} transparent={false}>
          <Pressable
            style={styles.closeModalButton}
            onPress={() => {
              setModalVisible(false)
            }}
          >
            <View
              style={[
                styles.closeModalButtonLeftLine,
                styles.closeModalButtonLine
              ]}
            />
            <View
              style={[
                styles.closeModalButtonRightLine,
                styles.closeModalButtonLine
              ]}
            />
          </Pressable>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').width / 1.43}
          >
            <Image
              source={{ uri: item.file_url }}
              style={{
                height: Dimensions.get('window').width / 1.43,
                width: Dimensions.get('window').width
              }}
              resizeMode={'contain'}
            />
          </ImageZoom>
        </Modal>
      </Pressable>
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
          showDoneButton={false}
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
  mapName: {
    alignItems: 'center'
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
  },
  closeModalButton: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeModalButtonLine: {
    width: 30,
    height: 2,
    backgroundColor: '#fff'
  },
  closeModalButtonLeftLine: {
    transform: [{ rotate: '45deg' }, { translateY: 1 }]
  },
  closeModalButtonRightLine: {
    transform: [{ rotate: '-45deg' }, { translateY: -1 }]
  }
})

export default TechMaps
