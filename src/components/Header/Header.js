import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'

import styles from '../../styles/Styles'
import componentStyles from './styles'
import { setIsUserMenuModal } from '../../redux/actionCreators'
import CompleteWorkShift from '../CompleteWorkShift/CompleteWorkShift'
import UsersMenuModal from '../UserMenuModal/UserMenuModal'
import { useDispatch, useSelector } from 'react-redux'

const Header = ({ logOut, userName }) => {
  const dispatch = useDispatch()
  const isModalWorkShiftVisible = useSelector(
    (state) => state.header.isModalWorkShiftVisible
  )
  const isUserMenuModal = useSelector((state) => state.header.isUserMenuModal)

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
        onPress={() => dispatch(setIsUserMenuModal(true))}
        hitSlop={10}
      >
        <View style={componentStyles.headerButtonLine}></View>
        <View style={componentStyles.headerButtonLine}></View>
      </Pressable>
      {isModalWorkShiftVisible && <CompleteWorkShift logOut={logOut} />}
      {isUserMenuModal && <UsersMenuModal logOut={logOut} />}
    </View>
  )
}

export default Header
