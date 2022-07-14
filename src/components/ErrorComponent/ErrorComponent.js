import React from 'react'
import { View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useDispatch, useSelector } from 'react-redux'
import { setIsErrorComponentVisible } from '../../redux/actionCreators'
import styles from './styles'

const ErrorComponent = () => {
  const dispatch = useDispatch()

  const message = useSelector((state) => state.error.errorMessage)
  return (
    <Animatable.View
      style={styles.container}
      animation='wobble'
      onAnimationEnd={() => {
        setTimeout(() => dispatch(setIsErrorComponentVisible(false)), 3000)
      }}
    >
      <Text style={styles.errorText}>Network error {message}</Text>
    </Animatable.View>
  )
}

export default ErrorComponent
