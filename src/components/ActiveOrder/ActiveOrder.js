import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import JSONTree from 'react-native-json-tree'
import componentStyles from './styles'

import styles from '../../styles/Styles'
import { windowWidth, jsonTreeTheme, windowHeight } from '../../Constants'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'

const ActiveOrder = ({ schedulePushNotification }) => {
  const dispatch = useDispatch()
  const orderStarted = useSelector((state) => state.main.orderStarted)
  const order = useSelector((state) => state.main.activeOrder)

  return (
    <ScrollView>
      <View
        style={{
          ...styles.container,
          width: '100%',
          height: windowHeight - 340
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
              <TouchableOpacity
                activeOpacity={0.5}
                style={{}}
                onPress={() => {
                  dispatch(setActiveBarCode(true))
                }}
              >
                <Image
                  style={componentStyles.qrcodeIcon}
                  source={require('../../assets/images/qrcodeIcon.png')}
                />
              </TouchableOpacity>
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
