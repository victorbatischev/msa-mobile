import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import OperationContainer from '../OperationContainer/OperationContainer'
import StartFinishButton from '../StartFinishButton/StartFinishButton'
import Timer from '../Timer/Timer'

const RightBlock = ({ startOrder }) => {
  const previousOperation = useSelector((state) => state.main.previousOperation)
  const isConfirmation = useSelector((state) => state.main.isConfirmation)
  const equipmentArr = useSelector((state) => state.main.equipmentArr)
  const selectedItems = useSelector((state) => state.main.selectedItems)

  return (
    <View style={styles.container}>
      <View>
        <OperationContainer />
        <View style={styles.previousOperation}>
          <Text style={styles.previousOperationTitle}>Previous operation</Text>
          <Text style={styles.previousOperationText}>
            {previousOperation.length > 0
              ? previousOperation.length[0].name_prev_operation
              : 'No previous operations'}
          </Text>
        </View>
        <View style={styles.resultPreviousOperation}>
          <Text style={{ ...styles.previousOperationTitle, paddingLeft: 10 }}>
            Result of previous operation
          </Text>
          <View style={styles.previousOperationTextContainer}>
            <Text style={styles.previousOperationText}>
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
  previousOperationTitle: {
    color: '#8F8F8F'
  },
  previousOperationText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  previousOperationTextContainer: {
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
