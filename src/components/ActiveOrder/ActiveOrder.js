import React, { useEffect } from 'react'
import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import JSONTree from 'react-native-json-tree'
import componentStyles from './styles'

import styles from '../../styles/Styles'
import { windowWidth, jsonTreeTheme, windowHeight } from '../../Constants'
import { Audio } from 'expo-av'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsPlaySound,
  setActiveBarCode,
  setSound
} from '../../redux/actionCreators'

const ActiveOrder = ({ schedulePushNotification }) => {
  const dispatch = useDispatch()
  const isPlaySound = useSelector((state) => state.main.isPlaySound)
  const orderStarted = useSelector((state) => state.main.orderStarted)
  const order = useSelector((state) => state.main.activeOrder)
  const sound = useSelector((state) => state.activeOrder?.sound)

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/sound.mp3')
    )
    dispatch(setSound(sound))
    await sound.playAsync()
  }

  useEffect(() => {
    if (isPlaySound) {
      ;(async () => {
        await playSound()
        dispatch(setIsPlaySound(false))
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
          height: windowHeight - 360
        }}
      >
        <View
          style={{
            ...styles.container,
            justifyContent: 'center',
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
                  <Text style={componentStyles.labelText}>{label}:</Text>
                )}
                valueRenderer={(raw) => (
                  <Text style={componentStyles.labelText}>{raw}</Text>
                )}
              />
            </ScrollView>
          ) : (
            <>
              <Pressable
                style={{}}
                onPress={() => {
                  dispatch(setActiveBarCode(true))
                }}
              >
                <Image
                  style={componentStyles.qrcodeIcon}
                  source={require('../../assets/images/qrcodeIcon.png')}
                />
              </Pressable>
              <Text style={componentStyles.mainText}>
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
