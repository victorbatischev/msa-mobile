import React from 'react'
import { View, Text } from 'react-native'
import { Stopwatch } from '../../lib/react-native-stopwatch-timer'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import { options } from '../../Constants'

const Timer = ({ orderStarted }) => {
  return (
    <View style={{ ...styles.container, backgroundColor: '#000' }}>
      <Text style={componentStyles.tytleText}>Work time on the order</Text>
      <Stopwatch reset={!orderStarted} start={orderStarted} options={options} />
    </View>
  )
}

export default Timer
