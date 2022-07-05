import React, { useEffect } from 'react'
import { ScrollView, View, Text, Image, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import EquipmentItem from '../EquipmentItem/EquipmentItem'
import styles from './styles'

const Equipment = ({ equipmentRequest }) => {
  const equipmentArr = useSelector((state) => state.main.equipmentArr)
  const o_id = useSelector((state) => state.main.activeOrder.description.o_id)
  const buttonHandler = () => {
    equipmentRequest(o_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headetText}>Choose equipment</Text>
        <Pressable style={styles.button} onPress={buttonHandler}>
          <Image
            style={styles.buttonIcon}
            source={require('../../assets/icons/equipment.png')}
          />
        </Pressable>
      </View>
      <ScrollView>
        {equipmentArr.map((item, index) => {
          return <EquipmentItem key={item._id} index={index} />
        })}
      </ScrollView>
    </View>
  )
}

export default Equipment
