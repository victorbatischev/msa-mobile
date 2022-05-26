import React, { useEffect } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedItemsCheced,
  setSelectedItemsUnCheced,
  setIsChecked,
  setIsCheckedArr
} from '../../redux/actionCreators'
import styles from './styles'

const EquipmentItem = ({ index }) => {
  const dispatch = useDispatch()

  const isChecked = useSelector((state) => state.equipmentItem.isChecked)
  const isBusy = useSelector((state) => state.main.equipmentArr[index].occupied)
  const title = useSelector((state) => state.main.equipmentArr[index].name)
  const id = useSelector((state) => state.main.equipmentArr[index].id)

  useEffect(() => {
    dispatch(setIsCheckedArr())
    setArr()
  }, [isChecked[index]])

  const itemHandler = () => {
    console.log(title)
    if (!isBusy) {
      dispatch(setIsChecked(index))
    }
  }

  const setArr = () => {
    if (isChecked[index]) {
      dispatch(setSelectedItemsCheced(id))
    } else {
      dispatch(setSelectedItemsUnCheced(id))
    }
  }

  return (
    <Pressable style={styles.container} onPress={itemHandler}>
      <View
        style={[
          styles.checkIcon,
          { backgroundColor: isChecked[index] ? '#0080FF' : '#F2F2F2' }
        ]}
      >
        {isChecked[index] && (
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