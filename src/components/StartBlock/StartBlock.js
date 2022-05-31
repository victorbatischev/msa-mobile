import React from 'react'
import { View, Text } from 'react-native'
import { options } from '../../Constants'
import StopWatch from '../../lib/react-native-stopwatch-timer/lib/stopwatch'
import StartFinishButton from '../StartFinishButton/StartFinishButton'
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
