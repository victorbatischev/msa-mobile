import React from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import EquipmentItem from '../EquipmentItem/EquipmentItem'
import styles from './styles'

const Equipment = ({ equipmentArr, setSelectedItems }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headetText}>Choose equipment</Text>
        <Image source={require('../../assets/icons/equipment.png')} />
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
