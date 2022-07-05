import React, { useEffect } from 'react'
import { View, Alert, Modal, Text } from 'react-native'
import Carousel from '../components/Carousel/CarouselComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import * as Updates from 'expo-updates'
import Header from '../components/Header/Header'
import Orders from '../components/Orders/Orders'
import ActiveOrder from '../components/ActiveOrder/ActiveOrder'
import BarCode from '../components/BarCode/BarCode'
import TechMaps from '../components/TechMaps/TechMaps'
import ActiveOrderHeader from '../components/Adaptive/ActiveOrderHeader'
import RightBlock from '../components/Adaptive/RightBlock'
import OrderCancelModal from '../components/OrderCancelModal/OrderCancelModal'
import Messages from '../components/Messages/Messages'
import OperationContainer from '../components/OperationContainer/OperationContainer'
import styles from '../styles/Styles'
import { windowWidth } from '../Constants'
import Materials from '../components/Materials/Materials'
import Equipment from '../components/Equipment/Equipment'
import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'
import * as Notifications from 'expo-notifications'
import Timer from '../components/Timer/Timer'
import StartFinishButton from '../components/StartFinishButton/StartFinishButton'
import OperationResult from '../components/OperationResult/OperationResult'
import { useSelector, useDispatch } from 'react-redux'
import {
  setOrders,
  setUser,
  setIsPlaySound,
  setActiveOrder,
  setOrderStarted,
  setModalVisible,
  setOrderCancelModalVisible,
  setPreviousOperation,
  setIsConfirmation,
  setEquipmentArr,
  setIsEquipmentVisible,
  setIsEquipmentEmpty
} from '../redux/actionCreators'

// Счетчик заказов

let ordersCount = 0

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'New order 📬',
      body: 'You have a new order'
    },
    trigger: { seconds: 2 }
  })
}

const BACKGROUND_FETCH_TASK = 'background-fetch'

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const user = await JSON.parse(await AsyncStorage.getItem('user'))
  axios.get(`order_worker/${user?.u_id}`).then((res) => {
    if (res.data.length > ordersCount) {
      schedulePushNotification()
      ordersCount = res.data.length
    }
  })

  return 2
})

function Main({ route }) {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.main.user)
  const orders = useSelector((state) => state.main.orders)
  const activeOrder = useSelector((state) => state.main.activeOrder)
  const activeIndex = useSelector((state) => state.main.activeIndex)
  const activeBarCode = useSelector((state) => state.main.activeBarCode)
  const modalVisible = useSelector((state) => state.main.modalVisible)
  const orderCancelModalVisible = useSelector((state) => {
    state.main.orderCancelModalVisible
  })
  const showMaterialsComponent = useSelector(
    (state) => state.main.showMaterialsComponent
  )
  const materialsArr = useSelector((state) => state.main.materialsArr)
  const equipmentArr = useSelector((state) => state.main.equipmentArr)
  const isEquipmentVisible = useSelector(
    (state) => state.main.isEquipmentVisible
  )
  const selectedItems = useSelector((state) => state.main.selectedItems)

  // For BackgroundFetch

  useEffect(() => {
    toggleFetchTask()
  }, [])

  const toggleFetchTask = async () => {
    await registerBackgroundFetchAsync()
  }

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1, // 1 minute
      stopOnTerminate: false, // android only,
      startOnBoot: true // android only
    })
  }

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
      dispatch(setOrders(res.data))
      if (res.data.length > ordersCount) {
        dispatch(setIsPlaySound(true))
        ordersCount = res.data.length
      }
      if (res.data.length) {
        getOrderInfo(res.data[0]._id, user.u_id)
        getPreviousOperation(user)
      }
    })
  }

  const getPreviousOperation = (user) => {
    axios.get(`order_prev_operation/${user.u_id}`).then((res) => {
      dispatch(setPreviousOperation(res.data))
    })
  }

  const getOrderInfo = (activeOrderId, userId) => {
    axios.get(`order_id_worker/${activeOrderId}/${userId}`).then((res) => {
      dispatch(setActiveOrder(res.data[0]))
    })
  }

  const startOrder = () => {
    dispatch(setIsEquipmentVisible(false))
    axios
      .put('order_worker_start', {
        order_id: activeOrder?._id,
        stream_id: activeOrder?.s_id,
        operation_id: activeOrder?.operation?._id
      })
      .then(() => {
        dispatch(setIsConfirmation(false))
        dispatch(setOrderStarted(true))
        const checkCancelOrder = setInterval(async () => {
          await axios
            .get(`order_worker_active/${user.u_id}`)
            .then(async (res) => {
              if (res.data.length) {
                clearInterval(checkCancelOrder)
                // Alert.alert('MSA Mobile', 'Your order has been cancelled.')
                dispatch(setOrderCancelModalVisible(true))
                dispatch(setOrderStarted(false))
              }
            })
        }, 10000)
      })
      .catch((err) => console.error(err))
    axios.put(
      'equipment_busy',
      selectedItems.map((item) => ({
        _id: item,
        occupied: true
      }))
    )
  }

  const finishOrder = (nextOperationId, relationId) => {
    axios
      .put('order_worker_finish', {
        order_id: activeOrder?._id,
        stream_id: activeOrder?.s_id,
        next_operation_id: nextOperationId,
        current_operation_id: activeOrder?.operation?._id,
        relation_id: relationId,
        function: materialsArr
      })
      .then(() => {
        Alert.alert('MSA Mobile', 'Your operation has been completed.', [
          {
            text: 'Ok',
            onPress: () => {
              dispatch(setModalVisible(false))
              dispatch(setOrderStarted(false))
            }
          }
        ])
      })
      .catch((err) => console.error(err))
    axios.put(
      'equipment_busy',
      selectedItems.map((item) => ({
        _id: item,
        occupied: false
      }))
    )
  }

  useEffect(() => {
    async function getData() {
      const tempUser = JSON.parse(await AsyncStorage.getItem('user'))
      dispatch(setUser(tempUser))

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
    if (modalVisible) dispatch(setIsConfirmation(false))
  }, [modalVisible])

  const equipmentRequest = (o_id) => {
    axios.get(`equipment_o_id/${o_id}`).then((res) => {
      dispatch(setEquipmentArr(res.data))
      res.data.length === 0 && dispatch(setIsEquipmentEmpty(true))
    })
  }

  useEffect(() => {
    if (activeOrder) {
      equipmentRequest(activeOrder.description.o_id)
    }
  }, [activeOrder?.description.o_id])

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
      <StatusBar style='light' translucent={false} />
      <Header logOut={logOut} userName={route.params.userName} />
      {!activeBarCode && <Orders />}
      <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
        <View style={{ flex: 3 }}>
          {!activeBarCode && <Carousel />}
          {activeIndex === 0 && orders.length && !activeBarCode ? (
            <Messages />
          ) : null}
          {activeIndex === 1 && orders.length && !activeBarCode ? (
            <>
              {windowWidth > 480 && <ActiveOrderHeader />}
              {equipmentArr.length === 0 || !isEquipmentVisible ? (
                <ActiveOrder
                  schedulePushNotification={schedulePushNotification}
                />
              ) : (
                <Equipment equipmentRequest={equipmentRequest} />
              )}
            </>
          ) : null}
          {activeIndex === 2 && !activeBarCode ? <TechMaps /> : null}
          {activeBarCode && orders.length ? <BarCode /> : null}
        </View>
        {windowWidth > 480 && <RightBlock startOrder={startOrder} />}
      </View>
      {windowWidth <= 480 && orders.length && !activeBarCode ? (
        <View style={{ width: '100%' }}>
          <OperationContainer />
          <View style={{ ...styles.center, height: 75 }}>
            <Timer />
            <StartFinishButton startOrder={startOrder} />
          </View>
        </View>
      ) : null}
      {orderCancelModalVisible && <OrderCancelModal />}
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => dispatch(setModalVisible(false))}
      >
        {showMaterialsComponent ? (
          <Materials finishOrder={finishOrder} />
        ) : (
          <OperationResult finishOrder={finishOrder} />
        )}
      </Modal>
    </View>
  )
}

export default Main
