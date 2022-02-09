import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  ActivityIndicator
} from 'react-native'
import { windowWidth } from '../Constants'

const OrderCancelModal = ({ item, setOrderCanselModalVisible }) => {
  return (
    <Modal visible={true} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoBlockText}>Order cancelled!</Text>
          {item !== undefined ? (
            <>
              <Text style={styles.infoBlockText}>{item?.name}</Text>
              <Text style={styles.infoBlockTextId}>{item?._id}</Text>
            </>
          ) : (
            <ActivityIndicator size={'large'} color={'#000'} />
          )}

          <Pressable
            style={styles.button}
            onPress={() => setOrderCanselModalVisible(false)}
          >
            <Text style={styles.buttonText}>OK!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000d9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoBlock: {
    width: windowWidth > 480 ? '66%' : '90%',
    height: windowWidth * (windowWidth > 480 ? 0.38 : 1.3),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoBlockText: {
    fontFamily: 'Montserrat',
    fontSize: windowWidth > 480 ? 30 : 26,
    lineHeight: 37
  },
  infoBlockTextId: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontSize: 13,
    color: '#8F8F8F'
  },
  button: {
    marginTop: 30,
    width: 300,
    height: 80,
    backgroundColor: '#0080FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'Montserrat',
    color: '#fff',
    fontSize: 30
  }
})

export default OrderCancelModal
