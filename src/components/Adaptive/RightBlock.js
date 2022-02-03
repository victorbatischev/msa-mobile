import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { windowHeight } from '../../Constants'
import OperationContainer from '../OperationContainer'
import StartBlock from '../StartBlock'

const RightBlock = ({ order, orderStarted, startOrder, setModalVisible }) => {
  return (
    <View style={styles.container}>
      <View>
        <OperationContainer order={order} />
        <View style={styles.previousOperation}>
          <Text style={styles.previusOperationTitle}>Previous operation</Text>
          <Text style={styles.previusOperationText}>
            Embroidery of rhombuses
          </Text>
        </View>
        <View style={styles.resultPreviousOperation}>
          <Text style={styles.previusOperationTitle}>
            Result of previous operation
          </Text>
          <View style={styles.previusOperationTextContainer}>
            <Text style={styles.previusOperationText}>
              Alter (including double stitch)
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
    height: windowHeight - 125,
    paddingTop: 10,
    paddingHorizontal: 15,
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
    fontSize: 16
  },
  previusOperationTextContainer: {
    height: 55,
    backgroundColor: '#CF3B23',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 7
  },
  resultPreviousOperation: {
    marginTop: 10
  }
})

export default RightBlock
