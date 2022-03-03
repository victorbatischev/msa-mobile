import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Image
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import * as Updates from 'expo-updates'
import { Stopwatch } from '../lib/react-native-stopwatch-timer'

import Header from '../components/Header'
import Order from '../components/Order'
import MenuItem from '../components/MenuItem'
import ActiveOrder from '../components/ActiveOrder'
import BarCode from '../components/BarCode'
import TechMaps from '../components/TechMaps'
import ActiveOrderHeader from '../components/Adaptive/ActiveOrderHeader'
import RightBlock from '../components/Adaptive/RightBlock'
import OrderCancelModal from '../components/OrderCancelModal'
import MyMessages from '../components/MyMessages'
import OperationContainer from '../components/OperationContainer'

import styles from '../styles/Styles'
import { carouselItems, windowWidth, options } from '../Constants'

import arrowMain from '../assets/icons/arrowMain.jpg'
import arrowNotMain from '../assets/icons/arrowNotMain.jpg'
import okButton from '../assets/images/ok.png'
import closeButton from '../assets/images/close.png'

function Orders({ route }) {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [activeOrder, setActiveOrder] = useState(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [activeBarCode, setActiveBarCode] = useState(false)
  const [orderStarted, setOrderStarted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [orderCancelModalVisible, setOrderCancelModalVisible] = useState(false)
  const [previousOperation, setPreviousOperation] = useState([])
  const [isStartConfirmation, setIsStartConfirmation] = useState(false)
  const [isFinishConfirmation, setIsFinishConfirmation] = useState(false)

  const carousel = useRef()

  const logOut = async () => {
    axios
      .put('worker_in', {
        _id: user.u_id,
        at_work: false
      })
      .then(async () => {
        await AsyncStorage.clear()
        // navigation.navigate('Auth')
        Updates.reloadAsync()
      })
  }

  const getOrders = (user) => {
    axios.get(`order_worker/${user.u_id}`).then((res) => {
      setOrders(res.data)
      if (res.data.length) {
        getOrderInfo(res.data[0]._id, user.u_id)
        getPreviousOperation(user)
      }
    })
  }

  const getPreviousOperation = (user) => {
    axios.get(`order_prev_operation/${user.u_id}`).then((res) => {
      setPreviousOperation(res.data)
    })
  }

  const getOrderInfo = (activeOrderId, userId) => {
    axios.get(`order_id_worker/${activeOrderId}/${userId}`).then((res) => {
      setActiveOrder(res.data[0])
    })
  }

  const startOrder = () => {
    axios
      .put('order_worker_start', {
        order_id: activeOrder?._id,
        stream_id: activeOrder?.s_id,
        operation_id: activeOrder?.operation?._id
      })
      .then(() => {
        setIsStartConfirmation(false)
        setOrderStarted(true)
        checkCancelOrder = setInterval(async () => {
          await axios
            .get(`order_worker_active/${user.u_id}`)
            .then(async (res) => {
              if (res.data.length) {
                clearInterval(checkCancelOrder)
                // Alert.alert('MSA Mobile', 'Your order has been cancelled.')
                setOrderCancelModalVisible(true)
                setOrderStarted(false)
              }
            })
        }, 10000)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    async function getData() {
      const tempUser = JSON.parse(await AsyncStorage.getItem('user'))
      setUser(tempUser)

      setInterval(() => {
        getOrders(tempUser)
      }, 2000)

      let checkLogout = setInterval(async () => {
        await axios.get(`worker_logout/${tempUser.u_id}`).then(async (res) => {
          if (res.data[0].at_work === false) {
            clearInterval(checkLogout)
            await AsyncStorage.clear()
            // navigation.navigate('Auth')
            Updates.reloadAsync()
            Alert.alert(
              'MSA Mobile',
              'You have been logged out by the administrator.'
            )
          }
        })
      }, 10000)
    }

    getData()
  }, [])

  useEffect(() => {
    if (modalVisible) setIsFinishConfirmation(false)
  }, [modalVisible])

  const renderCarouselItem = ({ item, index }) => {
    return (
      <MenuItem
        item={item}
        index={index}
        activeIndex={activeIndex}
        carousel={carousel.current}
      />
    )
  }
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar style='light' translucent={false} />
      <Header logOut={logOut} userName={route.params.userName} />
      <View style={{ ...styles.shadow, height: 80 }}>
        {windowWidth <= 480 ? (
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={windowWidth}
            snapToAlignment={'center'}
            style={{ height: 60, width: windowWidth }}
          >
            {orders.length ? (
              orders.map((item, idx) => {
                return (
                  <Order
                    item={item}
                    key={idx}
                    idx={idx}
                    activeBarCode={activeBarCode}
                    setActiveBarCode={setActiveBarCode}
                  />
                )
              })
            ) : (
              <View
                style={{
                  ...styles.center,
                  flex: 1,
                  width: windowWidth,
                  backgroundColor: '#fff',
                  paddingHorizontal: 10
                }}
              >
                <ActivityIndicator size='large' color='#000088' />
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 18,
                    padding: 15
                  }}
                >
                  Searching for available orders
                </Text>
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={{ width: windowWidth, flexDirection: 'row' }}>
            {orders.length ? (
              orders.map((item, idx) => {
                return (
                  <Order
                    item={item}
                    key={idx}
                    idx={idx}
                    activeBarCode={activeBarCode}
                    setActiveBarCode={setActiveBarCode}
                    icon={idx === 0 ? arrowMain : arrowNotMain}
                  />
                )
              })
            ) : (
              <View
                style={{
                  ...styles.center,
                  flex: 1,
                  paddingTop: 15,
                  backgroundColor: '#fff'
                }}
              >
                <ActivityIndicator size='large' color='#000088' />
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 18,
                    padding: 15
                  }}
                >
                  Searching for available orders
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
        <View style={{ flex: 3 }}>
          {!activeBarCode && (
            <View
              style={{
                height: 60,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#F5F5F5'
              }}
            >
              <Carousel
                ref={carousel}
                firstItem={1}
                activeSlideOffset={0}
                swipeThreshold={0}
                callbackOffsetMargin={20}
                data={carouselItems}
                sliderWidth={
                  windowWidth > 480 ? windowWidth * 0.75 : windowWidth
                }
                itemWidth={
                  windowWidth > 480 ? windowWidth * 0.25 : windowWidth / 3
                }
                sliderHeight={60}
                itemHeight={60}
                renderItem={renderCarouselItem}
                onSnapToItem={(index) => setActiveIndex(index)}
              />
            </View>
          )}
          {activeIndex === 0 && orders.length && !activeBarCode ? (
            <MyMessages orderId={activeOrder?._id} userId={user.u_id} />
          ) : null}
          {activeIndex === 1 && orders.length && !activeBarCode ? (
            <>
              {windowWidth > 480 && <ActiveOrderHeader item={orders[0]} />}
              <ActiveOrder
                order={activeOrder}
                orderStarted={orderStarted}
                setOrderStarted={setOrderStarted}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            </>
          ) : null}
          {activeIndex === 2 && !activeBarCode ? <TechMaps /> : null}
          {activeBarCode && orders.length ? (
            <BarCode activeBarCode={activeBarCode} orders={orders} />
          ) : null}
        </View>
        {windowWidth > 480 && (
          <View style={{ flex: 1 }}>
            <RightBlock
              order={activeOrder}
              orderStarted={orderStarted}
              setOrderStarted={setOrderStarted}
              startOrder={startOrder}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              previousOperation={previousOperation}
            />
          </View>
        )}
      </View>
      {windowWidth <= 480 && orders.length ? (
        <View style={{ width: '100%' }}>
          <OperationContainer order={activeOrder} />
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
              <View style={{ width: 160 }}>
                {isFinishConfirmation ? (
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Pressable
                      style={{
                        width: 80,
                        backgroundColor: '#029C6E',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => setModalVisible(true)}
                    >
                      <Image
                        source={okButton}
                        style={{ width: 36, height: 36, marginBottom: 10 }}
                      />
                    </Pressable>
                    <Pressable
                      style={{
                        width: 80,
                        backgroundColor: '#2D2D2D',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => setIsFinishConfirmation(false)}
                    >
                      <Image
                        source={closeButton}
                        style={{ width: 32, height: 32 }}
                      />
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
              <View style={{ width: 160 }}>
                {isStartConfirmation ? (
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Pressable
                      style={{
                        width: 80,
                        backgroundColor: '#0080FF',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => startOrder()}
                    >
                      <Image
                        source={okButton}
                        style={{ width: 36, height: 36, marginBottom: 10 }}
                      />
                    </Pressable>
                    <Pressable
                      style={{
                        width: 80,
                        backgroundColor: '#2D2D2D',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => setIsStartConfirmation(false)}
                    >
                      <Image
                        source={closeButton}
                        style={{ width: 32, height: 32 }}
                      />
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
      ) : null}
      {orderCancelModalVisible && (
        <OrderCancelModal
          item={orders[0]}
          setOrderCancelModalVisible={setOrderCancelModalVisible}
        />
      )}
    </View>
  )
}

export default Orders
