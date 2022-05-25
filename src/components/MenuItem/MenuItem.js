import React from 'react'
import { Text, Pressable } from 'react-native'
import { useSelector } from 'react-redux'

import styles from '../../styles/Styles'

const MenuItem = ({ item, index, carousel }) => {
  const activeIndex = useSelector((state) => state.main.activeIndex)
  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: 'transparent',
        height: 10,
        padding: 0,
        margin: 0
      }}
      onPress={() => carousel.snapToItem(index, true, true)}
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
    </Pressable>
  )
}

export default MenuItem
