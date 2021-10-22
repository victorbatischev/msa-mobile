import React from 'react'
import { View, Text, Image, Pressable, Alert } from 'react-native'

import styles from '../styles/Styles'

const Header = ({ logOut, userName }) => {
  const tryCompleteWorkShift = () => {
    Alert.alert(
      'MSA Mobile',
      'Do you really want to complete your work shift?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => logOut() }
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.center}>
        <Image
          style={{ width: 24, height: 23 }}
          source={require('../assets/images/person.png')}
        />
        <Text style={styles.headerName}>{userName}</Text>
      </View>
      <Pressable style={styles.center} onPress={() => tryCompleteWorkShift()}>
        <Text style={styles.headerComplete}>Complete work shift</Text>
        <Image
          style={{ width: 20, height: 20 }}
          source={require('../assets/images/close.png')}
        />
      </Pressable>
    </View>
  )
}

export default Header
