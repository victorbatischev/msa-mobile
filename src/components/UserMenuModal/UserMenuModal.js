import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Pressable, Image, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import axios from 'axios'
import CompleteWorkShift from '../CompleteWorkShift/CompleteWorkShift'
import * as Application from 'expo-application'

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
      <View style={componentStyles.container}>
        <View style={componentStyles.menuItemBlock}>
          <Pressable
            style={componentStyles.menuItem}
            onPress={() => getNewOrder()}
          >
            <Text style={componentStyles.menuItemText}>New order</Text>
          </Pressable>
          <Pressable
            style={componentStyles.menuItem}
            onPress={() => setIsCompleteWorkShiftVisible(true)}
          >
            <Text style={componentStyles.menuItemText}>Logout</Text>
          </Pressable>
        </View>
        <View style={componentStyles.closeButtomContainer}>
          <Pressable
            style={{
              ...styles.center,
              ...styles.cancelContainer
            }}
            onPress={() => setModalVisible(false)}
          >
            <Image
              style={componentStyles.closeIcon}
              source={require('../../assets/images/close.png')}
            />
            <Text style={componentStyles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
        <Text style={styles.versionText}>
          Version: {Application.nativeApplicationVersion}
        </Text>
        <Modal
          animationType='slider'
          transparent={true}
          visible={isModalNewOrder}
        >
          <View style={componentStyles.container}>
            <View style={componentStyles.orderContainer}>
              <Text
                style={[
                  componentStyles.menuItemText,
                  componentStyles.newOrderText
                ]}
              >
                New order
              </Text>
              <View style={componentStyles.menuItemBlock}>
                {orders.map((item, index) => {
                  return (
                    <Pressable
                      style={componentStyles.menuItem}
                      key={index}
                      onPress={() => menuItemHandler(item)}
                    >
                      <Text style={componentStyles.menuItemText}>
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
                style={componentStyles.closeIcon}
                source={require('../../assets/images/close.png')}
              />
              <Text style={componentStyles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
          <Modal
            animationType='slider'
            transparent={false}
            visible={isModalGetDetails}
          >
            <View style={componentStyles.container}>
              <View style={componentStyles.orderContainer}>
                <Text style={componentStyles.orderNameText}>
                  {tempDetail?.order?.name}
                </Text>
                <View style={componentStyles.whatToDeliverContainer}>
                  <Text style={componentStyles.whatToDeliverText}>
                    What to deliver?
                  </Text>
                  <TextInput
                    style={componentStyles.input}
                    value={tempDetail?.order?.composition['What to deliver?']}
                    onChangeText={(text) => {
                      textInputHandler(text, 'What to deliver?')
                    }}
                  />
                </View>
                <View style={componentStyles.detailIdContainer}>
                  <Text style={componentStyles.detailIdText}>Detail id</Text>
                  <TextInput
                    style={componentStyles.input}
                    value={tempDetail?.order?.composition['Detail id']}
                    onChangeText={(text) => {
                      textInputHandler(text, 'Detail id')
                    }}
                  />
                </View>
                <View style={componentStyles.workplaceContainer}>
                  <Text style={componentStyles.workplaceText}>Workplace</Text>
                  <TextInput
                    style={componentStyles.input}
                    value={tempDetail?.order?.composition['Workplace']}
                    onChangeText={(text) => {
                      textInputHandler(text, 'Workplace')
                    }}
                  />
                </View>
                <Pressable
                  style={componentStyles.okButton}
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
                      source={require('../../assets/images/close.png')}
                    />
                    <Text style={componentStyles.cancelText}>Cancel</Text>
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

export default UsersMenuModal
