import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TextInput,
  ScrollView
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import axios from 'axios'
import CompleteWorkShift from '../CompleteWorkShift/CompleteWorkShift'
import * as Application from 'expo-application'
import {
  setIsUserMenuModal,
  setIsCompleteWorkShiftVisible,
  setUserMenuOrders,
  setTempDetail,
  setCreatedOrderId
} from '../../redux/actionCreators'
import { useDispatch, useSelector } from 'react-redux'

const UsersMenuModal = ({ logOut }) => {
  const [isModalNewOrder, setIsModalNewOrder] = useState(false)
  const [isModalGetDetails, setIsModalGetDetails] = useState(false)

  const dispatch = useDispatch()
  const isCompleteWorkShiftVisible = useSelector(
    (state) => state.usersMenuModal.isCompleteWorkShiftVisible
  )
  const orders = useSelector((state) => state.usersMenuModal.orders)
  const tempDetail = useSelector((state) => state.usersMenuModal.tempDetail)
  const createdOrderId = useSelector(
    (state) => state.usersMenuModal.createdOrderId
  )

  const textInputHandler = (text, key) => {
    dispatch(setTempDetail(text, key))
  }

  useEffect(() => {
    if (createdOrderId) sendingOrderForExecution()
  }, [createdOrderId])

  const menuItemHandler = async (item) => {
    const user = JSON.parse(await AsyncStorage.getItem('user'))
    item.order.composition['Worker'] = user.name
    item.order.composition['Worker id'] = user.u_id
    dispatch(setTempDetail(item))
    setIsModalGetDetails(true)
  }

  const getNewOrder = async () => {
    axios.get('deskbook_info/61f5b6541f1d04747fffe837').then((res) => {
      dispatch(setUserMenuOrders(Object.values(res.data[0].value)))
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
      .then(() => dispatch(setIsUserMenuModal(false)))
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
        dispatch(setCreatedOrderId(res.data))
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
            onPress={() => dispatch(setIsCompleteWorkShiftVisible(true))}
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
            onPress={() => dispatch(setIsUserMenuModal(false))}
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
            <ScrollView style={componentStyles.scrollViewStyle}>
              <View style={componentStyles.container}>
                <View style={componentStyles.orderContainer}>
                  <Text style={componentStyles.orderNameText}>
                    {tempDetail?.order?.name}
                  </Text>
                  {tempDetail.order &&
                    Object.entries(tempDetail.order.composition)
                      .sort()
                      .map(([key, value]) => (
                        <View
                          style={componentStyles.whatToDeliverContainer}
                          key={key}
                        >
                          <Text style={componentStyles.whatToDeliverText}>
                            {key}
                          </Text>
                          <TextInput
                            style={componentStyles.input}
                            value={value}
                            onChangeText={(text) => {
                              textInputHandler(text, key)
                            }}
                          />
                        </View>
                      ))}

                  {/* <View style={componentStyles.whatToDeliverContainer}>
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
                </View> */}
                  {/* <View style={componentStyles.detailIdContainer}>
                  <Text style={componentStyles.detailIdText}>Detail id</Text>
                  <TextInput
                    style={componentStyles.input}
                    value={tempDetail?.order?.composition['Detail id']}
                    onChangeText={(text) => {
                      textInputHandler(text, 'Detail id')
                    }}
                  />
                </View> */}
                  {/* <View style={componentStyles.workplaceContainer}>
                  <Text style={componentStyles.workplaceText}>Workplace</Text>
                  <TextInput
                    style={componentStyles.input}
                    value={tempDetail?.order?.composition['Workplace']}
                    onChangeText={(text) => {
                      textInputHandler(text, 'Workplace')
                    }}
                  />
                </View> */}
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
            </ScrollView>
          </Modal>
        </Modal>
        {isCompleteWorkShiftVisible && <CompleteWorkShift logOut={logOut} />}
      </View>
    </Modal>
  )
}

export default UsersMenuModal
