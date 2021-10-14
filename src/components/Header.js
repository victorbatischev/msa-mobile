import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View, Text, Image, Pressable, Alert } from 'react-native'
import axios from 'axios'

import styles from '../styles/Styles'

const Header = ({ navigation, user, userName }) => {
  const tryCompleteWorkShift = () => {
    Alert.alert(
      'MSA Mobile',
      'Are you sure you want to complete your work shift?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => tryLogOut() }
      ],
      { cancelable: false }
    )
  }

  const tryLogOut = async () => {
    axios
      .put('worker_in', {
        _id: user.u_id,
        at_work: false
      })
      .then(async () => {
        await AsyncStorage.clear()
        navigation.navigate('Auth')
      })
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
          style={{ width: 24, height: 24 }}
          source={require('../assets/images/close.png')}
        />
      </Pressable>
    </View>
  )
}

export default Header
