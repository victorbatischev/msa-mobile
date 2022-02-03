import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { StopWatch } from '../lib/react-native-stopwatch-timer'
import styles from '../styles/Styles'

const StartBlock = ({ orderStarted, startOrder, setModalVisible, options }) => {
  return (
    <View style={{ ...styles.center, height: 70 }}>
      <View style={{ ...styles.container, backgroundColor: '#000' }}>
        <Text style={{ fontFamily: 'Roboto', fontSize: 12, color: '#888' }}>
          Work time on the order
        </Text>
        {/* <StopWatch
          reset={!orderStarted}
          start={orderStarted}
          options={options}
        /> */}
      </View>
      {orderStarted ? (
        <Pressable
          style={{ ...styles.container, backgroundColor: '#009C6D' }}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{ fontFamily: 'Montserrat', fontSize: 30, color: '#fff' }}
          >
            FINISH
          </Text>
        </Pressable>
      ) : (
        <Pressable
          style={{ ...styles.container, backgroundColor: '#0080FF' }}
          onPress={() => startOrder()}
        >
          <Text
            style={{ fontFamily: 'Montserrat', fontSize: 30, color: '#fff' }}
          >
            START
          </Text>
        </Pressable>
      )}
    </View>
  )
}

const myStyles = StyleSheet.create({
  container: {}
})

export default StartBlock
