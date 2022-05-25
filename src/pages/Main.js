import React, { useState, useEffect } from 'react'
import { View, Alert, Modal, Text } from 'react-native'
import Carousel from '../components/Carowsel/CarowselComponent'
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
import { useSelector } from 'react-redux'

// Счетчик заказов

let ordersCount = 0

///////

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
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])

  const [isPlaySound, setIsPlaySound] = useState(false)

  const [activeOrder, setActiveOrder] = useState(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [activeBarCode, setActiveBarCode] = useState(false)
  const [orderStarted, setOrderStarted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [orderCancelModalVisible, setOrderCancelModalVisible] = useState(false)
  const [previousOperation, setPreviousOperation] = useState([])
  const [isConfirmation, setIsConfirmation] = useState(false)
  const [materialsArr, setMaterialsArr] = useState([])
  const [showMaterialsComponent, setShowMaterialsComponent] = useState(false)
  const [equipmentArr, setEquipmentArr] = useState([])
  const [isEquipmentVisible, setIsEquipmentVisible] = useState(true)
  const [selectedItems, setSelectedItems] = useState([])
  const [finishOrderParams, setFinishOrderParams] = useState(null)

  //////////////////////Для BackgroundFetch

  const [isRegistered, setIsRegistered] = useState(false)
  const [status, setStatus] = useState(null)

  const myapp = useSelector((state) => state.app.app)

  useEffect(() => {
    toggleFetchTask()
  }, [])

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync()
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    )
    setStatus(status)
    setIsRegistered(isRegistered)
  }

  const toggleFetchTask = async () => {
    await registerBackgroundFetchAsync()
    checkStatusAsync()
  }

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1, // 1 minute
      stopOnTerminate: false, // android only,
      startOnBoot: true // android only
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      if (res.data.length > ordersCount) {
        setIsPlaySound(true)
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
      setPreviousOperation(res.data)
    })
  }

  const getOrderInfo = (activeOrderId, userId) => {
    axios.get(`order_id_worker/${activeOrderId}/${userId}`).then((res) => {
      setActiveOrder(res.data[0])
    })
  }

  const startOrder = () => {
    setIsEquipmentVisible(false)
    axios
      .put('order_worker_start', {
        order_id: activeOrder?._id,
        stream_id: activeOrder?.s_id,
        operation_id: activeOrder?.operation?._id
      })
      .then(() => {
        setIsConfirmation(false)
        setOrderStarted(true)
        const checkCancelOrder = setInterval(async () => {
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
        setOrderStarted(false)
        setModalVisible(false)
        // обновляем список заказов после завершения активной операции
        Alert.alert('MSA Mobile', 'Your operation has been completed.')
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
    if (modalVisible) setIsConfirmation(false)
  }, [modalVisible])

  const maretialsRequest = (index) => {
    if (activeOrder) {
      axios
        .get(`order_id_worker/${activeOrder._id}/${user?.u_id}/`)
        .then((res) =>
          setMaterialsArr(res.data[0].operation.relation[index].function)
        )
    }
  }

  const equipmentRequest = (o_id) => {
    axios.get(`equipment_o_id/${o_id}`).then((res) => {
      setEquipmentArr(res.data)
    })
  }

  useEffect(() => {
    if (activeOrder) {
      equipmentRequest(activeOrder.description.o_id)
    }
  }, [activeOrder?.operation._id])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar style='light' translucent={false} />
      <Header logOut={logOut} userName={route.params.userName} />
      {!activeBarCode && (
        <Orders
          orders={orders}
          activeBarCode={activeBarCode}
          setActiveBarCode={setActiveBarCode}
        />
      )}
      <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
        <View style={{ flex: 3 }}>
          {!activeBarCode && (
            <Carousel
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          )}
          {activeIndex === 0 && orders.length && !activeBarCode ? (
            <Messages orderId={activeOrder?._id} userId={user.u_id} />
          ) : null}
          {activeIndex === 1 && orders.length && !activeBarCode ? (
            <>
              {windowWidth > 480 && (
                <ActiveOrderHeader
                  item={orders[0]}
                  activeBarCode={activeBarCode}
                  setActiveBarCode={setActiveBarCode}
                />
              )}
              {equipmentArr.length === 0 || !isEquipmentVisible ? (
                <ActiveOrder
                  isPlaySound={isPlaySound}
                  setIsPlaySound={setIsPlaySound}
                  order={activeOrder}
                  orderStarted={orderStarted}
                  setActiveBarCode={setActiveBarCode}
                  schedulePushNotification={schedulePushNotification}
                />
              ) : (
                <Equipment
                  equipmentArr={equipmentArr}
                  setSelectedItems={setSelectedItems}
                  o_id={activeOrder?.description.o_id}
                  equipmentRequest={equipmentRequest}
                />
              )}
            </>
          ) : null}
          {activeIndex === 2 && !activeBarCode ? (
            <TechMaps operationId={activeOrder?.description?.o_id} />
          ) : null}
          {activeBarCode && orders.length ? (
            <BarCode
              activeBarCode={activeBarCode}
              setActiveBarCode={setActiveBarCode}
              orders={orders}
            />
          ) : null}
        </View>
        {windowWidth > 480 && (
          <RightBlock
            order={activeOrder}
            orderStarted={orderStarted}
            setOrderStarted={setOrderStarted}
            startOrder={startOrder}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            previousOperation={previousOperation}
            isConfirmation={isConfirmation}
            setIsConfirmation={setIsConfirmation}
            selectedItems={selectedItems}
            equipmentArr={equipmentArr}
          />
        )}
      </View>
      {windowWidth <= 480 && orders.length && !activeBarCode ? (
        <View style={{ width: '100%' }}>
          <OperationContainer order={activeOrder} />
          <View style={{ ...styles.center, height: 75 }}>
            <Timer orderStarted={orderStarted} />
            <StartFinishButton
              orderStarted={orderStarted}
              isConfirmation={isConfirmation}
              setIsConfirmation={setIsConfirmation}
              selectedItems={selectedItems}
              equipmentArr={equipmentArr}
              startOrder={startOrder}
              setModalVisible={setModalVisible}
            />
          </View>
        </View>
      ) : null}
      {orderCancelModalVisible && (
        <OrderCancelModal
          item={orders[0]}
          setOrderCancelModalVisible={setOrderCancelModalVisible}
        />
      )}
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {showMaterialsComponent ? (
          <Materials
            materialsArr={materialsArr}
            setMaterialsArr={setMaterialsArr}
            finishOrderParams={finishOrderParams}
            finishOrder={finishOrder}
          />
        ) : (
          <OperationResult
            setShowMaterialsComponent={setShowMaterialsComponent}
            activeOrder={activeOrder}
            user={user}
            setModalVisible={setModalVisible}
            setFinishOrderParams={setFinishOrderParams}
            setMaterialsArr={setMaterialsArr}
            finishOrder={finishOrder}
          />
        )}
      </Modal>
    </View>
  )
}

export default Main
