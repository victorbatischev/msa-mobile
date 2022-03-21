import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  Alert,
  Button
} from 'react-native'
import JSONTree from 'react-native-json-tree'

import axios from 'axios'
import styles from '../styles/Styles'
import { windowWidth, jsonTreeTheme, windowHeight } from '../Constants'
import { Audio } from 'expo-av'

const ActiveOrder = ({
  order,
  orderStarted,
  setOrderStarted,
  modalVisible,
  setModalVisible
}) => {
  const [sound, setSound] = useState()
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/sound.mp3')
    )
    setSound(sound)
    await sound.playAsync()
  }

  useEffect(() => {
    ;(async () => {
      await playSound()
      sound.unloadAsync()
    })()
  }, [])
  const finishOrder = (nextOperationId, relationId) => {
    axios
      .put('order_worker_finish', {
        order_id: order?._id,
        stream_id: order?.s_id,
        next_operation_id: nextOperationId,
        current_operation_id: order?.operation?._id,
        relation_id: relationId
      })
      .then(() => {
        setOrderStarted(false)
        setModalVisible(false)
        // обновляем список заказов после завершения активной операции
        Alert.alert('MSA Mobile', 'Your operation has been completed.')
      })
      .catch((err) => console.error(err))
  }

  return (
    <ScrollView>
      <View
        style={{
          ...styles.container,
          width: '100%',
          height: windowHeight - 190
        }}
      >
        <View style={{ ...styles.container, justifyContent: 'flex-start' }}>
          {orderStarted ? (
            <ScrollView style={{ maxHeight: windowWidth }}>
              <JSONTree
                data={order?.order?.list || {}}
                theme={{
                  extend: jsonTreeTheme,
                  nestedNodeLabel: ({ style }, nodeType, expanded) => ({
                    style: {
                      ...style,
                      textTransform: expanded
                        ? 'uppercase'
                        : style.textTransform
                    }
                  })
                }}
                hideRoot={true}
                invertTheme={false}
                getItemString={() => <Text></Text>}
                labelRenderer={([label]) => (
                  <Text style={{ fontSize: 14, color: 'black' }}>{label}:</Text>
                )}
                valueRenderer={(raw) => (
                  <Text style={{ fontSize: 14, color: 'black' }}>{raw}</Text>
                )}
              />
            </ScrollView>
          ) : (
            <>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 20,
                  marginTop: 20
                }}
                source={require('../assets/images/warning.png')}
              />
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 20,
                  color: '#282A2D',
                  textAlign: 'center',
                  paddingHorizontal: 50
                }}
              >
                Complete order information will appear after clicking "START"
              </Text>
            </>
          )}
        </View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ ...styles.container, backgroundColor: '#000' }}>
            {order?.operation?.relation.map((item) => (
              <Pressable
                onPress={() => finishOrder(item.so_id, item._id)}
                key={item._id}
                style={{
                  ...styles.center,
                  ...styles.operationItem,
                  backgroundColor: item.bgr_color
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Montserrat',
                    fontSize: 18,
                    color: '#fff'
                  }}
                >
                  {item.result}
                </Text>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../assets/images/arrow_white.png')}
                />
              </Pressable>
            ))}
            <View style={{ marginTop: 100 }}>
              <Pressable
                style={{
                  ...styles.center,
                  ...styles.cancelContainer
                }}
                onPress={() => setModalVisible(false)}
              >
                <Image
                  style={{ width: 20, height: 20, marginRight: 15 }}
                  source={require('../assets/images/close.png')}
                />
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 18,
                    color: '#6C6F72'
                  }}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

export default ActiveOrder
