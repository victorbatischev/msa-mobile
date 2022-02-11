import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, Pressable, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styles/Styles'
import axios from 'axios'
import CompleteWorkShift from './CompleteWorkShiftModal'

const UsersMenuModal = ({ setModalVisible, logOut }) => {
  const [isModal, setIsModal] = useState(false)
  const [isCompleteWorhShiftVisible, setIsCompleteWorhShiftVisible] =
    useState(false)

  const getNewOrder = async () => {
    const tempUser = JSON.parse(await AsyncStorage.getItem('user'))
    axios.get(`deskbook_info/61f5b6541f1d04747fffe837`).then((res) => {
      console.log(res.data)
    })
  }
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={myStyles.container}>
        <View style={myStyles.menuItemBlock}>
          <Pressable
            style={myStyles.menuItem}
            onPress={() => {
              setIsModal(true)
              getNewOrder()
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
        <Modal animationType='slider' transparent={true} visible={isModal}>
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
                <Pressable style={myStyles.menuItem}>
                  <Text style={myStyles.menuItemText}>Get details 1</Text>
                </Pressable>
                <Pressable style={myStyles.menuItem}>
                  <Text style={myStyles.menuItemText}>Get details 2</Text>
                </Pressable>
                <Pressable style={myStyles.menuItem}>
                  <Text style={myStyles.menuItemText}>Get details 3</Text>
                </Pressable>
              </View>
            </View>
            <Pressable
              style={{
                ...styles.center,
                ...styles.cancelContainer
              }}
              onPress={() => setIsModal(false)}
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
  }
})

export default UsersMenuModal
