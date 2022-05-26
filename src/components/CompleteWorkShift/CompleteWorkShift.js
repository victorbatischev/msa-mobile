import React from 'react'
import { View, Text, Modal, Pressable, Image } from 'react-native'
import done from '../../assets/images/ok.png'
import cancel from '../../assets/images/no.png'
import styles from './styles'
import { useDispatch } from 'react-redux'
import { setIsModalWorkShiftVisible } from '../../redux/actionCreators'

const CompleteWorkShift = ({ logOut }) => {
  const dispatch = useDispatch()
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>
          Do you really want to complete your work shift?
        </Text>
        <View style={styles.buttonBlock}>
          <Pressable
            style={[styles.button, styles.greenButton]}
            onPress={() => logOut()}
          >
            <Image source={done} style={styles.okButton} />
            <Text style={styles.buttonText}>Yes</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.redButton]}
            onPress={() => dispatch(setIsModalWorkShiftVisible(false))}
          >
            <Image source={cancel} style={noButton} />
            <Text style={styles.buttonText}>No</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default CompleteWorkShift
