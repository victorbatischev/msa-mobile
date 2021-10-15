import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from '../styles/Styles'

const Order = ({ item, idx }) => {
  return (
    <View
      style={{
        ...styles.orderContainer,
        backgroundColor: idx === 0 ? '#EEEEEE' : '#F8F8F8'
      }}
    >
      <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F', marginLeft: 31 }}>
        {item._id}
      </Text>
      <View style={styles.center}>
        {idx === 0 ? (
          <Image
            style={{ width: 24, height: 32 }}
            source={require('../assets/images/work_active_process.png')}
          />
        ) : (
          <Image
            style={{ width: 24, height: 32 }}
            source={require('../assets/images/work_active.png')}
          />
        )}

        <Text style={{ fontFamily: 'Roboto', fontSize: 16, marginLeft: 10 }}>
          {item.name}
        </Text>
      </View>
    </View>
  )
}

export default Order
