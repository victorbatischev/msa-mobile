import React from 'react'
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import done from '../../assets/images/ok.png'
import cancel from '../../assets/images/no.png'
import styles from './styles'
import { useDispatch } from 'react-redux'
import { setIsCompleteWorkShiftVisible } from '../../redux/actionCreators'

const CompleteWorkShift = ({ logOut }) => {
  const dispatch = useDispatch()
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>
          Do you really want to complete your work shift?
        </Text>
        <View style={styles.buttonBlock}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.greenButton]}
            onPress={() => logOut()}
          >
            <Image source={done} style={styles.okButton} />
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.redButton]}
            onPress={() => dispatch(setIsCompleteWorkShiftVisible(false))}
          >
            <Image source={cancel} style={styles.noButton} />
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default CompleteWorkShift
