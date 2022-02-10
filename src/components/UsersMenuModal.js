import React from 'react'
import { StyleSheet, View, Text, Modal, Pressable, Image } from 'react-native'
import styles from '../styles/Styles'

const UsersMenuModal = ({ setModalVisible }) => {
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={myStyles.container}>
        <View style={myStyles.menuItemBlock}>
          <Pressable style={myStyles.menuItem}>
            <Text style={myStyles.menuItemText}>New order</Text>
          </Pressable>
          <Pressable style={myStyles.menuItem}>
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
    flexDirection: 'column',
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
