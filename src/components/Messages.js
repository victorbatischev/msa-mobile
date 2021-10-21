import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles/Styles'

const Messages = () => {
  return (
    <View style={styles.center}>
      <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F', marginLeft: 31 }}>
        Messages
      </Text>
    </View>
  )
}

export default Messages
