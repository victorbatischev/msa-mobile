import React, { useState, useEffect } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import {
  setSelectedItemsCheced,
  setSelectedItemsUnCheced
} from '../../redux/actionCreators'
import styles from './styles'

const EquipmentItem = ({ id, title, isBusy, setSelectedItems }) => {
  const dispatch = useDispatch()

  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setArr()
  }, [isChecked])

  const itemHandler = () => {
    if (!isBusy) {
      setIsChecked(!isChecked)
    }
  }

  const setArr = () => {
    if (isChecked) {
      // setSelectedItems((prev) => {
      //   let copy = Object.assign([], prev)
      //   copy.push(id)
      //   return copy
      // })
      dispatch(setSelectedItemsCheced(id))
    } else {
      // setSelectedItems((prev) => {
      //   return prev.filter((value) => value !== id)
      // })
      dispatch(setSelectedItemsUnCheced(id))
    }
  }

  return (
    <Pressable style={styles.container} onPress={itemHandler}>
      <View
        style={[
          styles.checkIcon,
          { backgroundColor: isChecked ? '#0080FF' : '#F2F2F2' }
        ]}
      >
        {isChecked && (
          <Image
            source={require('../../assets/images/ok.png')}
            style={styles.okButton}
          />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.busy, { opacity: isBusy ? 1 : 0 }]}>
        <Text style={styles.busyText}>busy</Text>
      </View>
    </Pressable>
  )
}

export default EquipmentItem
