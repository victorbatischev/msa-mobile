import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'

import Header from '../components/Header'
import Order from '../components/Order'
import MenuItem from '../components/MenuItem'
import ActiveOrder from '../components/ActiveOrder'
import BarCode from '../components/BarCode'

import styles from '../styles/Styles'
import { carouselItems, windowWidth } from '../Constants'
import Messages from '../components/Messages'
import TechMaps from '../components/TechMaps'
import ActiveOrderHeader from '../components/Adaptive/ActiveOrderHeader'
import RightBlock from '../components/Adaptive/RightBlock'
import arrowMain from '../assets/icons/arrowMain.jpg'
import arrowNotMain from '../assets/icons/arrowNotMain.jpg'

function Orders({ route, navigation }) {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [activeOrder, setActiveOrder] = useState(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [activeBarCode, setActiveBarCode] = useState(false)
  const [orderStarted, setOrderStarted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const carousel = useRef()

  const logOut = async () => {
    axios
      .put('worker_in', {
        _id: user.u_id,
        at_work: false
      })
      .then(async () => {
        await AsyncStorage.clear()
        navigation.navigate('Auth')
      })
  }

  const getOrders = (user) => {
    axios.get(`order_worker/${user.u_id}`).then((res) => {
      setOrders(res.data)
      if (res.data.length) {
        getOrderInfo(res.data[0]._id, user.u_id)
      }
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
        setOrderStarted(true)
        checkCancelOrder = setInterval(async () => {
          await axios
            .get(`order_worker_active/${user.u_id}`)
            .then(async (res) => {
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
            navigation.navigate('Auth')
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
      {orders.length ? (
        <View style={{ flexDirection: 'row', width: '100%', height: '100%' }}>
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
              <Messages
                userName={route.params.userName}
                userId={user.id}
                activeOrderId={orders[0]._id}
              />
            ) : null}
            {activeIndex === 1 && orders.length && !activeBarCode ? (
              <>
                {windowWidth > 480 && <ActiveOrderHeader item={orders[0]} />}
                <ActiveOrder
                  order={activeOrder}
                  orderStarted={orderStarted}
                  setOrderStarted={setOrderStarted}
                  startOrder={startOrder}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              </>
            ) : null}
            {activeIndex === 2 && orders.length && !activeBarCode ? (
              <TechMaps />
            ) : null}
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
              />
            </View>
          )}
        </View>
      ) : null}
    </View>
  )
}

export default Orders
