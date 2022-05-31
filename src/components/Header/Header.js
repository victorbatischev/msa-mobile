import React, { useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'

import styles from '../../styles/Styles'
import componentStyles from './styles'
import CompleteWorkShift from '../CompleteWorkShift/CompleteWorkShift'
// import UsersMenuModal from '../UsersMenuModal'
import UsersMenuModal from '../UserMenuModal/UserMenuModal'

const Header = ({ logOut, userName }) => {
  const [isModalWorkShiftVisible, setIsModalWorkShiftVisible] = useState(false)
  const [isUserMenuModal, setIsUserMenuModal] = useState(false)

  return (
    <View style={styles.headerContainer}>
      <View style={styles.center}>
        <Image
          style={componentStyles.personIcon}
          source={require('../../assets/images/person.png')}
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

export default Header
