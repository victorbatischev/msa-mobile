import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Dimensions
} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import ImageZoom from 'react-native-image-pan-zoom'
import { Video } from 'expo-av'
import * as WebBrowser from 'expo-web-browser'
import styles from './styles'
import { useSelector } from 'react-redux'

const TechMaps = () => {
  const operationId = useSelector(
    (state) => state.main.activeOrder.description?.o_id
  )
  const [mapsArr, setMapsArr] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [item, setItem] = useState(null)
  useEffect(() => {
    axios.get(`order_worker_techmap/${operationId}`).then((response) => {
      setMapsArr(response.data[0].technical_maps)
    })
  }, [])
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.mapName}>{item.name}</Text>
        {/* {item.file_name.split('.').pop() == 'jpg' && ( */}
        <Pressable
          onPress={() => {
            setItem(item)
            setModalVisible(true)
          }}
        >
          <Image
            source={{ uri: item.file_url }}
            style={{ height: '93%' }}
            resizeMode={'contain'}
          />
        </Pressable>
        {/* )} */}
        {/* {item.file_name.split('.').pop() == 'pdf' && (
          <Pressable
            onPress={async () => {
              await WebBrowser.openBrowserAsync(item.file_url)
            }}
          >
            <Image
              source={require('../../assets/icons/pdf.png')}
              style={{ height: '93%', alignSelf: 'center' }}
              resizeMode={'contain'}
            />
          </Pressable>
        )}
        {item.file_name.split('.').pop() == 'm4v' && (
          <Pressable
            onPress={() => {
              setItem(item)
              setModalVisible(true)
            }}
          >
            <Image
              source={require('../../assets/icons/video.png')}
              style={{ height: '93%', alignSelf: 'center' }}
              resizeMode={'contain'}
            />
          </Pressable>
        )} */}
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
          showNextButton={false}
          renderNextButton={renderNextButton}
          renderPrevButton={renderPrevButton}
          dotStyle={{ backgroundColor: '#DFDFDF' }}
          activeDotStyle={{ backgroundColor: '#009C6D' }}
        />
      ) : (
        <ActivityIndicator size='large' color='#000088' />
      )}
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
        {/* {item?.file_name.split('.').pop() == 'jpg' && ( */}
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').width / 1.43}
        >
          <Image
            source={{ uri: item?.file_url }}
            style={{
              height: Dimensions.get('window').width / 1.43,
              width: Dimensions.get('window').width
            }}
            resizeMode={'contain'}
          />
        </ImageZoom>
        {/* )} */}
        {item?.file_name.split('.').pop() == 'pdf' && <Text>PDF</Text>}
        {item?.file_name.split('.').pop() == 'm4v' && (
          <Video
            style={{ height: '80%' }}
            source={{ uri: item.file_url }}
            resizeMode='contain'
            useNativeControls={true}
            shouldPlay={true}
          />
        )}
      </Modal>
    </View>
  )
}

export default TechMaps
