import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Alert, ScrollView, ActivityIndicator } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import Header from '../components/Header'
import Order from '../components/Order'
import MenuItem from '../components/MenuItem'
import ActiveOrder from '../components/ActiveOrder'

import styles from '../styles/Styles'
import { carouselItems, windowWidth } from '../Constants'
import Messages from '../components/Messages'
import TechMaps from '../components/TechMaps'

function Orders({ route, navigation }) {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [activeOrder, setActiveOrder] = useState(null)
  const [activeIndex, setActiveIndex] = useState(1)

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

  useEffect(() => {
    async function getData() {
      const tempUser = JSON.parse(await AsyncStorage.getItem('user'))
      setUser(tempUser)

      getOrders(tempUser) // получаем список заказов при авторизации

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
      }, 1000)
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
      <Header logOut={logOut} userName={route.params.userName} />
      <View style={{ ...styles.shadow, height: 60 }}>
        <ScrollView
          horizontal={true}
          decelerationRate={0}
          snapToInterval={windowWidth}
          snapToAlignment={'center'}
          style={{ height: 60, width: windowWidth }}
        >
          {orders.length ? (
            orders.map((item, idx) => {
              return <Order item={item} key={idx} idx={idx} />
            })
          ) : (
            <View
              style={{
                ...styles.center,
                flex: 1,
                width: windowWidth,
                backgroundColor: '#fff'
              }}
            >
              <ActivityIndicator size='large' color='#000088' />
              <Text style={{ fontFamily: 'Roboto', fontSize: 18, padding: 15 }}>
                Searching for available orders
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={{ height: 60, backgroundColor: '#fff' }}>
        <Carousel
          ref={carousel}
          firstItem={1}
          activeSlideOffset={0}
          swipeThreshold={0}
          callbackOffsetMargin={20}
          data={carouselItems}
          sliderWidth={windowWidth}
          itemWidth={windowWidth / 2.5}
          sliderHeight={60}
          itemHeight={60}
          renderItem={renderCarouselItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
      {activeIndex === 0 && orders.length ? (
        <Messages activeOrderId={orders[0]._id} />
      ) : null}
      {activeIndex === 1 && orders.length ? (
        <ActiveOrder
          order={activeOrder}
          userId={user.u_id}
          getOrders={() => getOrders(user)}
        />
      ) : null}
      {activeIndex === 2 && orders.length ? <TechMaps /> : null}
    </View>
  )
}

export default Orders
