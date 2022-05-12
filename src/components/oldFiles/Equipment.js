import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable
} from 'react-native'

const EquipmentItem = ({ id, title, isBusy, setSelectedItems }) => {
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
      setSelectedItems((prev) => {
        let copy = Object.assign([], prev)
        copy.push(id)
        return copy
      })
    } else {
      setSelectedItems((prev) => {
        return prev.filter((value) => value !== id)
      })
    }
  }

  return (
    <Pressable style={stylesItem.container} onPress={itemHandler}>
      <View style={[stylesItem.checkIcon, { opacity: isChecked ? 1 : 0 }]}>
        <Image
          source={require('../assets/images/ok.png')}
          style={{ width: '80%', height: '80%' }}
        />
      </View>
      <Text style={stylesItem.title}>{title}</Text>
      <View style={[stylesItem.busy, { opacity: isBusy ? 1 : 0 }]}>
        <Text style={stylesItem.busyText}>busy</Text>
      </View>
    </Pressable>
  )
}

const stylesItem = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingHorizontal: 15
  },
  checkIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#0080FF',
    alignItems: 'center',
    borderRadius: 4
  },
  title: {
    width: '62%',
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  busy: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 24,
    backgroundColor: '#EC0000',
    borderRadius: 2
  },
  busyText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: '#fff'
  }
})

const Equipment = ({ equipmentArr, setSelectedItems }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headetText}>Choose equipment</Text>
        <Image source={require('../assets/icons/equipment.png')} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },
  headetText: {
    fontSize: 18,
    fontFamily: 'Montserrat'
  }
})

export default Equipment
