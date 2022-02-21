import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { options, windowWidth } from '../Constants'
// import { StopWatch } from '../lib/react-native-stopwatch-timer'
import StopWatch from '../lib/react-native-stopwatch-timer/lib/stopwatch'
import styles from '../styles/Styles'

const StartBlock = ({ orderStarted, startOrder, setModalVisible }) => {
  return (
    <View
      style={{
        ...styles.center,
        height: windowWidth <= 480 ? 70 : '50%',
        flexDirection: windowWidth > 480 ? 'column' : 'row',
        paddingBottom: 15
      }}
    >
      <View
        style={{
          ...styles.container,
          backgroundColor: '#000',
          marginBottom: 10
        }}
      >
        <Text style={{ fontFamily: 'Roboto', fontSize: 12, color: '#888' }}>
          Work time on the order
        </Text>
        <StopWatch
          reset={!orderStarted}
          start={orderStarted}
          options={options}
        />
      </View>
      {orderStarted ? (
        <Pressable
          style={{
            ...styles.container,
            backgroundColor: '#009C6D'
          }}
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

export default StartBlock
