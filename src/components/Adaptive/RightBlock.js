import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { windowHeight } from '../../Constants'
import OperationContainer from '../OperationContainer/OperationContainer'
import StartBlock from '../StartBlock/StartBlock'
import StartFinishButton from '../StartFinishButton/StartFinishButton'
import Timer from '../Timer/Timer'

const RightBlock = ({
  order,
  startOrder,
  previousOperation,
  isConfirmation,
  setIsConfirmation,
  selectedItems,
  equipmentArr
}) => {
  return (
    <View style={styles.container}>
      <View>
        <OperationContainer order={order} />
        <View style={styles.previousOperation}>
          <Text style={styles.previusOperationTitle}>Previous operation</Text>
          <Text style={styles.previusOperationText}>
            {previousOperation.length > 0
              ? previousOperation.length[0].name_prev_operation
              : 'No previous operations'}
          </Text>
        </View>
        <View style={styles.resultPreviousOperation}>
          <Text style={{ ...styles.previusOperationTitle, paddingLeft: 10 }}>
            Result of previous operation
          </Text>
          <View style={styles.previusOperationTextContainer}>
            <Text style={styles.previusOperationText}>
              {previousOperation.length > 0
                ? previousOperation.length[0].result_prev_operation
                : 'No previous operations'}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Timer />
        <StartFinishButton
          isConfirmation={isConfirmation}
          setIsConfirmation={setIsConfirmation}
          selectedItems={selectedItems}
          equipmentArr={equipmentArr}
          startOrder={startOrder}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    width: '25%',
    justifyContent: 'space-between'
  },
  previousOperation: {
    paddingHorizontal: 10
  },
  previusOperationTitle: {
    color: '#8F8F8F'
  },
  previusOperationText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  previusOperationTextContainer: {
    width: '88%',
    height: 55,
    backgroundColor: '#CF3B23',
    alignSelf: 'center',
    padding: 5
  },
  resultPreviousOperation: {
    marginTop: 5
  }
})

export default RightBlock
