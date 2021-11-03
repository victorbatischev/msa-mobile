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
import { windowWidth, jsonTreeTheme, options } from '../Constants'

var checkCancelOrder = null

const order = ({ order, userId, getOrders }) => {
  const [orderStarted, setOrderStarted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const startOrder = () => {
    axios
      .put('order_worker_start', {
        order_id: order?._id,
        stream_id: order?.s_id,
        operation_id: order?.operation?._id
      })
      .then(() => {
        setOrderStarted(true)
        checkCancelOrder = setInterval(async () => {
          await axios.get(`order_worker_active/${userId}`).then(async (res) => {
            if (res.data.length) {
              clearInterval(checkCancelOrder)
              Alert.alert('MSA Mobile', 'Your order has been cancelled.')
              setOrderStarted(false)
            }
          })
        }, 10000)
      })
      .catch((err) => console.error(err))
  }

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
        clearInterval(checkCancelOrder)
        // обновляем список заказов после завершения активной операции
        Alert.alert(
          'MSA Mobile',
          'Your operation has been completed.',
          [
            {
              text: 'Ok',
              onPress: () => getOrders()
            }
          ],
          { cancelable: false }
        )
      })
      .catch((err) => console.error(err))
  }

  return (
    <View style={{ ...styles.container, width: '100%' }}>
      <View style={styles.container}>
        {orderStarted ? (
          <ScrollView style={{ maxHeight: windowWidth }}>
            <JSONTree
              data={order?.order?.list}
              theme={{
                extend: jsonTreeTheme,
                nestedNodeLabel: ({ style }, nodeType, expanded) => ({
                  style: {
                    ...style,
                    textTransform: expanded ? 'uppercase' : style.textTransform
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
              style={{ width: 60, height: 60, marginBottom: 20 }}
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
      <View style={styles.operationContainer}>
        <Text style={{ fontFamily: 'Roboto', fontSize: 12, color: '#8F8F8F' }}>
          Operation
        </Text>
        <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>
          {order?.description?.name}
        </Text>
      </View>
      <View style={{ ...styles.center, height: 70 }}>
        <View style={{ ...styles.container, backgroundColor: '#000' }}>
          <Text style={{ fontFamily: 'Roboto', fontSize: 12, color: '#888' }}>
            Work time on the order
          </Text>
          <Stopwatch
            reset={!orderStarted}
            start={orderStarted}
            options={options}
          />
        </View>
        {orderStarted ? (
          <Pressable
            style={{ ...styles.container, backgroundColor: '#009C6D' }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{ fontFamily: 'Montserrat', fontSize: 30, color: '#fff' }}
            >
              FINISH
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{ ...styles.container, backgroundColor: '#0080FF' }}
            onPress={() => startOrder()}
          >
            <Text
              style={{ fontFamily: 'Montserrat', fontSize: 30, color: '#fff' }}
            >
              START
            </Text>
          </Pressable>
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
                style={{ fontFamily: 'Roboto', fontSize: 18, color: '#6C6F72' }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default order
