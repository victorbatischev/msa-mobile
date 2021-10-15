import React from 'react'
import { View, Text } from 'react-native'

import styles from '../styles/Styles'

const MenuItem = ({ item, index, activeIndex }) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: 'transparent',
        height: 10,
        padding: 0,
        margin: 0
      }}
    >
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: index === activeIndex ? 18 : 16,
          color: index === activeIndex ? '#000' : '#444'
        }}
      >
        {item.title}
      </Text>
    </View>
  )
}

export default MenuItem
