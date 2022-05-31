import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { Stopwatch } from '../../lib/react-native-stopwatch-timer'
import componentStyles from './styles'
import { options } from '../../Constants'

const Timer = () => {
  const orderStarted = useSelector((state) => state.main.orderStarted)
  return (
    <View style={componentStyles.container}>
      <Text style={componentStyles.titleText}>Work time on the order</Text>
      <Stopwatch reset={!orderStarted} start={orderStarted} options={options} />
    </View>
  )
}

export default Timer
