import React from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderCancelModalVisible } from '../../redux/actionCreators'
import styles from './styles'

const OrderCancelModal = () => {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.main.orders[0])
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

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => dispatch(setOrderCancelModalVisible(false))}
          >
            <Text style={styles.buttonText}>OK!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default OrderCancelModal
