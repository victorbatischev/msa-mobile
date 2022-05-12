import React from 'react'
import { View, Text } from 'react-native'
import { windowWidth } from '../../Constants'
import styles from '../../styles/Styles'
import componentStyles from './styles'

const OperationContainer = ({ order }) => {
  return (
    <View
      style={{
        ...styles.operationContainer,
        paddingLeft: 10,
        backgroundColor: windowWidth > 480 ? 'transparent' : '#F5F5F5'
      }}
    >
      <Text style={componentStyles.operationText}>Operation</Text>
      <Text style={componentStyles.descriptionNameText}>
        {order?.description?.name}
      </Text>
    </View>
  )
}

export default OperationContainer
