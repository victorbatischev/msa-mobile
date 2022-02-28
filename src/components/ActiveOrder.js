import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  Alert
} from 'react-native'
import { Stopwatch } from '../lib/react-native-stopwatch-timer'
import JSONTree from 'react-native-json-tree'

import axios from 'axios'
import styles from '../styles/Styles'
import { windowWidth, jsonTreeTheme, options, windowHeight } from '../Constants'
import OperationContainer from './OperationContainer'

import okButton from '../assets/images/ok.png'
import closeButton from '../assets/images/close.png'

const ActiveOrder = ({
  order,
  orderStarted,
  setOrderStarted,
  startOrder,
  modalVisible,
  setModalVisible
}) => {
  const [isStartConfirmation, setIsStartConfirmation] = useState(false)
  const [isFinishConfirmation, setIsFinishConfirmation] = useState(false)
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
                data={order?.order?.list}
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
        {windowWidth <= 480 && (
          <View style={{ position: 'absolute', bottom: 25, width: '100%' }}>
            <OperationContainer order={order} />
            <View style={{ ...styles.center, height: 75 }}>
              <View style={{ ...styles.container, backgroundColor: '#000' }}>
                <Text
                  style={{ fontFamily: 'Roboto', fontSize: 12, color: '#888' }}
                >
                  Work time on the order
                </Text>
                <Stopwatch
                  reset={!orderStarted}
                  start={orderStarted}
                  options={options}
                />
              </View>
              {orderStarted ? (
                <View style={{ width: '50%' }}>
                  {isFinishConfirmation ? (
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Pressable
                        style={{
                          width: '50%',
                          backgroundColor: '#029C6E',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onPress={() => setModalVisible(true)}
                      >
                        <Image source={okButton} />
                      </Pressable>
                      <Pressable
                        style={{
                          width: '50%',
                          backgroundColor: '#2D2D2D',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onPress={() => setIsFinishConfirmation(false)}
                      >
                        <Image source={closeButton} />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      style={{
                        ...styles.container,
                        backgroundColor: '#009C6D'
                      }}
                      onPress={() => setIsFinishConfirmation(true)}
                    >
                      <Text
                        style={{
                          fontFamily: 'Montserrat',
                          fontSize: 30,
                          color: '#fff'
                        }}
                      >
                        FINISH
                      </Text>
                    </Pressable>
                  )}
                </View>
              ) : (
                <View style={{ width: '50%' }}>
                  {isStartConfirmation ? (
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Pressable
                        style={{
                          width: '50%',
                          backgroundColor: '#0080FF',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onPress={() => startOrder()}
                      >
                        <Image source={okButton} />
                      </Pressable>
                      <Pressable
                        style={{
                          width: '50%',
                          backgroundColor: '#2D2D2D',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onPress={() => setIsStartConfirmation(false)}
                      >
                        <Image source={closeButton} />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      style={{
                        ...styles.container,
                        backgroundColor: '#0080FF'
                      }}
                      onPress={() => setIsStartConfirmation(true)}
                    >
                      <Text
                        style={{
                          fontFamily: 'Montserrat',
                          fontSize: 30,
                          color: '#fff'
                        }}
                      >
                        START
                      </Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
          </View>
        )}
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
