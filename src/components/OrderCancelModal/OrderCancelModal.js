import React from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import styles from './styles'

const OrderCancelModal = ({ item, setOrderCancelModalVisible }) => {
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
            onPress={() => setOrderCancelModalVisible(false)}
          >
            <Text style={styles.buttonText}>OK!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default OrderCancelModal
