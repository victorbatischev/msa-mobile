import React from 'react'
import { View, Pressable, Image, Text } from 'react-native'
import styles from '../../styles/Styles'
import componentStyles from './styles'

const StartFinishButton = ({
  orderStarted,
  isConfirmation,
  setIsConfirmation,
  selectedItems,
  equipmentArr,
  startOrder,
  setModalVisible
}) => {
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
              orderStarted ? () => setModalVisible(true) : () => startOrder()
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
            onPress={() => setIsConfirmation(false)}
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
              ? setIsConfirmation(true)
              : (equipmentArr.length === 0 || selectedItems.length > 0) &&
                setIsConfirmation(true)
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
