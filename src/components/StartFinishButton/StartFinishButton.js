import React from 'react'
import { View, Pressable, Image, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setModalVisible, setIsConfirmation } from '../../redux/actionCreators'
import styles from '../../styles/Styles'
import componentStyles from './styles'

const StartFinishButton = ({ selectedItems, equipmentArr, startOrder }) => {
  const dispatch = useDispatch()
  const orderStarted = useSelector((state) => state.main.orderStarted)
  const isConfirmation = useSelector((state) => state.main.isConfirmation)
  return (
    <View style={componentStyles.container}>
      {isConfirmation ? (
        <View style={componentStyles.okCloseButtonsContainer}>
          <Pressable
            style={[
              componentStyles.buttonContainer,
              { backgroundColor: orderStarted ? '#029C6E' : '#0080FF' }
            ]}
            onPress={
              orderStarted
                ? () => dispatch(setModalVisible(true))
                : () => startOrder()
            }
          >
            <Image
              source={require('../../assets/images/ok.png')}
              style={componentStyles.okIcon}
            />
          </Pressable>
          <Pressable
            style={[
              componentStyles.buttonContainer,
              { backgroundColor: '#2D2D2D' }
            ]}
            onPress={() => dispatch(setIsConfirmation(false))}
          >
            <Image
              source={require('../../assets/images/close.png')}
              style={componentStyles.closeIcon}
            />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={{
            ...styles.container,
            backgroundColor: orderStarted
              ? '#009C6D'
              : selectedItems.length > 0 || equipmentArr.length === 0
              ? '#0080FF'
              : 'gray'
          }}
          onPress={() => {
            orderStarted
              ? dispatch(setIsConfirmation(true))
              : (equipmentArr.length === 0 || selectedItems.length > 0) &&
                dispatch(setIsConfirmation(true))
          }}
        >
          <Text style={componentStyles.tytleText}>
            {orderStarted ? 'FINISH' : 'START'}
          </Text>
        </Pressable>
      )}
    </View>
  )
}

export default StartFinishButton
