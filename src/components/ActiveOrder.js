import React, { useState, useEffect } from 'react'
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

const ActiveOrder = ({ activeOrderId, userId }) => {
  const [orderInfo, setOrderInfo] = useState(null)
  const [orderData, setOrderData] = useState(null)
  const [orderOperation, setOrderOperation] = useState(null)
  const [description, setDescription] = useState(null)
  const [orderStarted, setOrderStarted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    getOrderInfo()
  }, [])

  const getOrderInfo = () => {
    axios.get(`order_id_worker/${activeOrderId}/${userId}`).then((res) => {
      console.log(res.data)
      setOrderInfo({
        order_id: res.data[0]?._id,
        stream_id: res.data[0]?.s_id,
        operation_id: res.data[0]?.operation?._id,
        next_operation_id: res.data[0]?.operation?.relation[0].so_id,
        relation_id: res.data[0]?.operation?.relation[0]._id
      })
      setOrderOperation(res.data[0]?.operation)
      setOrderData(res.data[0]?.order)
      setDescription(res.data[0]?.description?.name)
    })
  }

  const startOrder = () => {
    axios
      .put('order_worker_start', {
        order_id: orderInfo.order_id,
        stream_id: orderInfo.stream_id,
        operation_id: orderInfo.operation_id
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

  const finishOrder = () => {
    axios
      .put('order_worker_finish', {
        order_id: orderInfo.order_id,
        stream_id: orderInfo.stream_id,
        next_operation_id: orderInfo.next_operation_id,
        current_operation_id: orderInfo.operation_id,
        relation_id: orderInfo.relation_id
      })
      .then(() => {
        setOrderStarted(false)
        setModalVisible(false)
        clearInterval(checkCancelOrder)
        Alert.alert(
          'MSA Mobile',
          'Your order has been completed.',
          [{ text: 'Ok', onPress: () => getOrderInfo() }],
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
              data={orderData.list}
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
          {description}
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
          {orderOperation?.relation.map((item) => (
            <Pressable
              onPress={() => finishOrder()}
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

export default ActiveOrder
