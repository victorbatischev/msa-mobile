import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { windowHeight } from '../../Constants'
import OperationContainer from '../OperationContainer/OperationContainer'
// import StartBlock from '../StartBlock'
import StartBlock from '../StartBlock/StartBlock'

const RightBlock = ({
  order,
  orderStarted,
  startOrder,
  setModalVisible,
  previousOperation
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
      <StartBlock
        orderStarted={orderStarted}
        startOrder={startOrder}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    height: windowHeight - 145,
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
