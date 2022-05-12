import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  AppState
} from 'react-native'
import JSONTree from 'react-native-json-tree'

import styles from '../styles/Styles'
import { windowWidth, jsonTreeTheme, windowHeight } from '../Constants'
import { Audio } from 'expo-av'
import * as Notifications from 'expo-notifications'

const ActiveOrder = ({
  order,
  orderStarted,
  isPlaySound,
  setIsPlaySound,
  setActiveBarCode
}) => {
  const [sound, setSound] = useState()
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/sound.mp3')
    )
    setSound(sound)
    await sound.playAsync()
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    })
  })
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'New order 📬',
        body: 'You have a new order'
      },
      trigger: { seconds: 2 }
    })
  }

  useEffect(() => {
    if (isPlaySound) {
      ;(async () => {
        await playSound()
        setIsPlaySound(false)
        await schedulePushNotification()
      })()
    }
  }, [isPlaySound])

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
        <View
          style={{
            ...styles.container,
            justifyContent: 'flex-start',
            backgroundColor: '#fff'
          }}
        >
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
              <Pressable
                onPress={() => {
                  setActiveBarCode(true)
                }}
              >
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginBottom: 20,
                    marginTop: 20
                  }}
                  source={require('../assets/images/qrcodeIcon.png')}
                />
              </Pressable>
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
