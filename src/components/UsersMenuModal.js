import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TextInput
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styles/Styles'
import axios from 'axios'
import CompleteWorkShift from './CompleteWorkShiftModal'

const UsersMenuModal = ({ setModalVisible, logOut }) => {
  const [isModalNewOrder, setIsModalNewOrder] = useState(false)
  const [isModalGetDetails, setIsModalGetDetails] = useState(false)
  const [isCompleteWorkShiftVisible, setIsCompleteWorkShiftVisible] =
    useState(false)
  const [orders, setOrders] = useState([])
  const [tempDetail, setTempDetail] = useState({})
  const [createdOrderId, setCreatedOrderId] = useState(null)

  const textInputHandler = (text, key) => {
    setTempDetail((prev) => ({
      ...prev,
      order: {
        ...prev.order,
        composition: {
          ...prev.order.composition,
          [key]: text
        }
      }
    }))
  }

  useEffect(() => {
    if (createdOrderId) sendingOrderForExecution()
  }, [createdOrderId])

  const menuItemHandler = async (item) => {
    const user = JSON.parse(await AsyncStorage.getItem('user'))
    item.order.composition['Worker'] = user.name
    item.order.composition['Worker id'] = user.u_id
    setTempDetail(item)
    setIsModalGetDetails(true)
  }

  const getNewOrder = async () => {
    axios.get('deskbook_info/61f5b6541f1d04747fffe837').then((res) => {
      setOrders(Object.values(res.data[0].value))
      setIsModalNewOrder(true)
    })
  }

  // const addingEmployeeToOrder = () => {
  //   axios
  //     .put('worker_order_worker_add', {
  //       _id: createdOrderId,
  //       worker: {
  //         o_id: tempDetail.worker.o_id,
  //         w_id: tempDetail.order.composition['Worker id'],
  //         name: tempDetail.order.composition['Worker']
  //       }
  //     })
  //     .then(() => setModalVisible(false))
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const sendingOrderForExecution = () => {
    axios
      .post('worker_order_execution', {
        _id: createdOrderId,
        s_id: tempDetail.stream,
        worker: {
          o_id: tempDetail.worker.o_id,
          w_id: tempDetail.order.composition['Worker id'],
          name: tempDetail.order.composition['Worker']
        }
      })
      .then(() => setModalVisible(false))
  }

  const sendFormData = () => {
    axios
      .post('worker_new_order_pending', {
        type: 'template',
        name: tempDetail.order.name,
        composition: {
          'What to deliver?': tempDetail.order.composition['What to deliver?'],
          'Detail id': tempDetail.order.composition['Detail id'],
          Workplace: tempDetail.order.composition['Workplace'],
          Worker: tempDetail.order.composition['Worker'],
          'Worker id': tempDetail.order.composition['Worker id']
        }
      })
      .then((res) => {
        setCreatedOrderId(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsModalGetDetails(false)
      })
  }

  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={myStyles.container}>
        <View style={myStyles.menuItemBlock}>
          <Pressable style={myStyles.menuItem} onPress={() => getNewOrder()}>
            <Text style={myStyles.menuItemText}>New order</Text>
          </Pressable>
          <Pressable
            style={myStyles.menuItem}
            onPress={() => setIsCompleteWorkShiftVisible(true)}
          >
            <Text style={myStyles.menuItemText}>Logout</Text>
          </Pressable>
        </View>
        <View style={{ marginTop: 20 }}>
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
        <Modal
          animationType='slider'
          transparent={true}
          visible={isModalNewOrder}
        >
          <View style={myStyles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Text
                style={[
                  myStyles.menuItemText,
                  { fontSize: 24, marginBottom: 45 }
                ]}
              >
                New order
              </Text>
              <View style={myStyles.menuItemBlock}>
                {orders.map((item, index) => {
                  return (
                    <Pressable
                      style={myStyles.menuItem}
                      key={index}
                      onPress={() => menuItemHandler(item)}
                    >
                      <Text style={myStyles.menuItemText}>
                        {item?.order?.name || ''}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
            </View>
            <Pressable
              style={{
                ...styles.center,
                ...styles.cancelContainer
              }}
              onPress={() => setIsModalNewOrder(false)}
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
          <Modal
            animationType='slider'
            transparent={false}
            visible={isModalGetDetails}
          >
            <View style={myStyles.container}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Text
                  style={{ color: '#fff', fontSize: 24, textAlign: 'center' }}
                >
                  {tempDetail?.order?.name}
                </Text>
                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 5 }}
                >
                  <Text style={{ color: '#fff', fontSize: 14, width: '85%' }}>
                    What to deliver?
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail?.order?.composition['What to deliver?']}
                    onChangeText={(text) => {
                      textInputHandler(text, 'What to deliver?')
                    }}
                  />
                </View>
                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 5 }}
                >
                  <Text style={{ color: '#fff', fontSize: 14, width: '85%' }}>
                    Detail id
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail?.order?.composition['Detail id']}
                    onChangeText={(text) => {
                      textInputHandler(text, 'Detail id')
                    }}
                  />
                </View>
                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 5 }}
                >
                  <Text style={{ color: '#fff', fontSize: 14, width: '85%' }}>
                    Workplace
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail?.order?.composition['Workplace']}
                    onChangeText={(text) => {
                      textInputHandler(text, 'Workplace')
                    }}
                  />
                </View>
                <Pressable
                  style={{
                    width: 204,
                    height: 70,
                    backgroundColor: '#0080FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20
                  }}
                  onPress={() => sendFormData()}
                >
                  <Text style={{ color: '#fff', fontSize: 24 }}>OK!</Text>
                </Pressable>
                <View style={{ marginTop: 20 }}>
                  <Pressable
                    style={{
                      ...styles.center,
                      ...styles.cancelContainer
                    }}
                    onPress={() => setIsModalGetDetails(false)}
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
            </View>
          </Modal>
        </Modal>
        {isCompleteWorkShiftVisible && (
          <CompleteWorkShift
            logOut={logOut}
            setIsModalVisible={setIsCompleteWorkShiftVisible}
          />
        )}
      </View>
    </Modal>
  )
}

const myStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 45
  },
  menuItemBlock: {
    width: '100%',
    alignItems: 'center'
  },
  menuItem: {
    width: '85%',
    height: 70,
    backgroundColor: '#242424',
    marginBottom: 15,
    justifyContent: 'center',
    paddingLeft: 20
  },
  menuItemText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 18
  },
  input: {
    width: '85%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Roboto'
  }
})

export default UsersMenuModal
