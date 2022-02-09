import React, { useState } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from '../styles/Styles'
import CompleteWorkShift from './CompleteWorkShift'

const Header = ({ logOut, userName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const tryCompleteWorkShift = () => {
    // Alert.alert(
    //   'MSA Mobile',
    //   'Do you really want to complete your work shift?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel'
    //     },
    //     { text: 'Yes', onPress: () => logOut() }
    //   ],
    //   { cancelable: false }
    // )
    setIsModalVisible(true)
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
      <Icon.Button
        name='exit-outline'
        color={'#000'}
        backgroundColor={'#fff'}
        style={{ padding: 2, marginRight: -10 }}
        size={20}
        onPress={() => tryCompleteWorkShift()}
      />
      {isModalVisible && (
        <CompleteWorkShift
          logOut={logOut}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </View>
  )
}

export default Header
