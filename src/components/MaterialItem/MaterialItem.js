import React from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import {
  setMaterialsCondition,
  setMaterialsValue
} from '../../redux/actionCreators'
import styles from './styles'

const MaterialItem = ({ materials, setMaterialsArr, index }) => {
  const dispatch = useDispatch()
  const changeCondition = () => {
    dispatch(setMaterialsCondition(materials, index))
  }
  const changeValue = (inputValue) => {
    dispatch(setMaterialsValue(inputValue, materials, index))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{materials.path}</Text>
      <Pressable style={styles.sign} onPress={changeCondition}>
        <Text>{materials.condition == 'minus' ? '-' : '+'}</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        textAlign='center'
        value={materials.value.toString()}
        onChangeText={(text) => changeValue(text)}
      />
    </View>
  )
}

export default MaterialItem