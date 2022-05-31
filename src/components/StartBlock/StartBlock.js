import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { options, windowWidth } from '../../Constants'
import StopWatch from '../../lib/react-native-stopwatch-timer/lib/stopwatch'
import StartFinishButton from '../StartFinishButton/StartFinishButton'
import styles from '../../styles/Styles'
import componentStyles from './styles'

const StartBlock = ({
  orderStarted,
  startOrder,
  setModalVisible,
  isConfirmation,
  setIsConfirmation,
  selectedItems,
  equipmentArr
}) => {
  return (
    <View>
      <View>
        <Text style={componentStyles.workTimeonThOrderText}>
          Work time on the order
        </Text>
        <StopWatch
          reset={!orderStarted}
          start={orderStarted}
          options={options}
        />
      </View>
      {/* {orderStarted ? (
        <Pressable
          style={{
            ...styles.container,
            backgroundColor: '#009C6D'
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={componentStyles.startFinishText}>FINISH</Text>
        </Pressable>
      ) : (
        <Pressable
          style={{ ...styles.container, backgroundColor: '#0080FF' }}
          onPress={() => startOrder()}
        >
          <Text style={componentStyles.startFinishText}>START</Text>
        </Pressable>
      )} */}
      <StartFinishButton
        orderStarted={orderStarted}
        isConfirmation={isConfirmation}
        setIsConfirmation={setIsConfirmation}
        selectedItems={selectedItems}
        equipmentArr={equipmentArr}
        startOrder={startOrder}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

export default StartBlock
