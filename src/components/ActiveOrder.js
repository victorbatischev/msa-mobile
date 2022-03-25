import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import JSONTree from 'react-native-json-tree'

import styles from '../styles/Styles'
import { windowWidth, jsonTreeTheme, windowHeight } from '../Constants'
import { Audio } from 'expo-av'

const ActiveOrder = ({ order, orderStarted }) => {
  const [sound, setSound] = useState()
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/sound.mp3')
    )
    setSound(sound)
    await sound.playAsync()
  }

  useEffect(() => {
    ;(async () => {
      await playSound()
    })()
  }, [])

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <ScrollView>
      <View
        style={{
          ...styles.container,
          width: '100%',
          height: windowHeight - 190
        }}
      >
        <View style={{ ...styles.container, justifyContent: 'flex-start' }}>
          {orderStarted ? (
            <ScrollView style={{ maxHeight: windowWidth }}>
              <JSONTree
                data={order?.order?.list || {}}
                theme={{
                  extend: jsonTreeTheme,
                  nestedNodeLabel: ({ style }, nodeType, expanded) => ({
                    style: {
                      ...style,
                      textTransform: expanded
                        ? 'uppercase'
                        : style.textTransform
                    }
                  })
                }}
                hideRoot={true}
                invertTheme={false}
                getItemString={() => <Text></Text>}
                labelRenderer={([label]) => (
                  <Text style={{ fontSize: 14, color: 'black' }}>{label}:</Text>
                )}
                valueRenderer={(raw) => (
                  <Text style={{ fontSize: 14, color: 'black' }}>{raw}</Text>
                )}
              />
            </ScrollView>
          ) : (
            <>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 20,
                  marginTop: 20
                }}
                source={require('../assets/images/warning.png')}
              />
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 20,
                  color: '#282A2D',
                  textAlign: 'center',
                  paddingHorizontal: 50
                }}
              >
                Complete order information will appear after clicking "START"
              </Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default ActiveOrder
