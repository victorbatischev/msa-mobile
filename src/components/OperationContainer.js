import React from 'react'
import { View, Text } from 'react-native'
import { windowWidth } from '../Constants'
import styles from '../styles/Styles'

const OperationContainer = ({ order }) => {
  return (
    <View
      style={{
        ...styles.operationContainer,
        backgroundColor: windowWidth > 480 ? 'transparent' : '#F5F5F5'
      }}
    >
      <Text style={{ fontFamily: 'Roboto', fontSize: 12, color: '#8F8F8F' }}>
        Operation
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: 18,
          color: windowWidth > 480 ? '#fff' : '#000'
        }}
      >
        {order?.description?.name}
      </Text>
    </View>
  )
}

export default OperationContainer
