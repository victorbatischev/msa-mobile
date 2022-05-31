import React from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import styles from './styles'

const MaterialItem = ({ materials, setMaterialsArr, index }) => {
  const changeCondition = () => {
    setMaterialsArr((prev) => {
      let copy = Object.assign([], prev)
      copy[index] = {
        ...materials,
        condition: materials.condition == 'minus' ? 'plus' : 'minus'
      }
      return copy
    })
  }
  const changeValue = (inputValue) => {
    setMaterialsArr((prev) => {
      let copy = Object.assign([], prev)
      copy[index] = {
        ...materials,
        value: inputValue
      }
      return copy
    })
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
