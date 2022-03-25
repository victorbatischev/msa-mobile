import React, { useState } from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'

import styles from '../styles/Styles'
import CompleteWorkShift from './CompleteWorkShiftModal'
import UsersMenuModal from './UsersMenuModal'

const Header = ({ logOut, userName }) => {
  const [isModalWorkShiftVisible, setIsModalWorkShiftVisible] = useState(false)
  const [isUserMenuModal, setIsUserMenuModal] = useState(false)

  return (
    <View style={styles.headerContainer}>
      <View style={styles.center}>
        <Image
          style={{ width: 24, height: 23 }}
          source={require('../assets/images/person.png')}
        />
        <Text style={styles.headerName}>{userName}</Text>
      </View>
      <Pressable
        style={componentStyles.headerButton}
        onPress={() => setIsUserMenuModal(true)}
        hitSlop={10}
      >
        <View style={componentStyles.headerButtonLine}></View>
        <View style={componentStyles.headerButtonLine}></View>
      </Pressable>
      {isModalWorkShiftVisible && (
        <CompleteWorkShift
          logOut={logOut}
          setIsModalVisible={setIsModalWorkShiftVisible}
        />
      )}
      {isUserMenuModal && (
        <UsersMenuModal setModalVisible={setIsUserMenuModal} logOut={logOut} />
      )}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  headerButton: {
    width: 30,
    height: '100%',
    marginRight: 30
  },
  headerButtonLine: {
    backgroundColor: '#fff',
    height: 3,
    marginTop: 7
  }
})

export default Header
