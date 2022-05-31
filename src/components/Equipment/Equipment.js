import React, { useEffect } from 'react'
import { ScrollView, View, Text, Image, Pressable } from 'react-native'
import EquipmentItem from '../EquipmentItem/EquipmentItem'
import styles from './styles'

const Equipment = ({
  equipmentArr,
  setSelectedItems,
  o_id,
  equipmentRequest
}) => {
  const buttonHandler = () => {
    equipmentRequest(o_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headetText}>Choose equipment</Text>
        <Pressable style={styles.button} onPress={buttonHandler}>
          <Image source={require('../../assets/icons/equipment.png')} />
        </Pressable>
      </View>
      <ScrollView>
        {equipmentArr.map((item, index) => {
          return (
            <EquipmentItem
              key={item._id}
              title={item.name}
              isBusy={item.occupied}
              setSelectedItems={setSelectedItems}
              id={item._id}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Equipment
