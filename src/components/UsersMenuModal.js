import React, { useState } from 'react'
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
  const [isCompleteWorhShiftVisible, setIsCompleteWorhShiftVisible] =
    useState(false)
  const [orders, setOrders] = useState([])
  const [tempDetail, setTempDetail] = useState({})

  const addOrdersArr = (data) => {
    let arr = []
    for (let i = 0; ; i++) {
      if (data[0].value[`Delivery (detail ${i + 1})`]) {
        arr.push(data[0].value[`Delivery (detail ${i + 1})`])
      } else break
    }
    setOrders(arr)
  }

  const menuItemHandler = (item) => {
    setTempDetail(item)
    setIsModalGetDetails(true)
  }

  const getNewOrder = async () => {
    axios.get(`deskbook_info/61f5b6541f1d04747fffe837`).then((res) => {
      addOrdersArr(res.data)
    })
  }
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={myStyles.container}>
        <View style={myStyles.menuItemBlock}>
          <Pressable
            style={myStyles.menuItem}
            onPress={() => {
              getNewOrder()
              setIsModalNewOrder(true)
            }}
          >
            <Text style={myStyles.menuItemText}>New order</Text>
          </Pressable>
          <Pressable
            style={myStyles.menuItem}
            onPress={() => setIsCompleteWorhShiftVisible(true)}
          >
            <Text style={myStyles.menuItemText}>Logout</Text>
          </Pressable>
        </View>
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
                        {item.order.name}
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
                  {tempDetail.order?.name}
                </Text>
                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 15 }}
                >
                  <Text style={{ color: '#fff', fontSize: 14, width: '85%' }}>
                    What to deliver?
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail.order?.composition['What to deliver?']}
                    onChangeText={(text) => {}}
                  ></TextInput>
                </View>
                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 13 }}
                >
                  <Text style={{ color: '#fff', fontSize: 14, width: '85%' }}>
                    Detail id
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail.order?.composition['Detail id']}
                  ></TextInput>
                </View>
                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 13 }}
                >
                  <Text style={{ color: '#fff', fontSize: 14, width: '85%' }}>
                    Workplace
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail.order?.composition['Workplace']}
                  ></TextInput>
                </View>
                <Pressable
                  style={{
                    width: 204,
                    height: 70,
                    backgroundColor: '#0080FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30
                  }}
                  onPress={() =>
                    console.log(
                      tempDetail.order.composition['What to deliver?']
                    )
                  }
                >
                  <Text style={{ color: '#fff', fontSize: 24 }}>ОК!</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </Modal>
        {isCompleteWorhShiftVisible && (
          <CompleteWorkShift
            logOut={logOut}
            setIsModalVisible={setIsCompleteWorhShiftVisible}
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
    paddingTop: 35,
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
    paddingHorizontal: 17,
    fontSize: 16,
    fontFamily: 'Roboto'
  }
})

export default UsersMenuModal
