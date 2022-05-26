import React from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Pressable
} from 'react-native'
import { useSelector } from 'react-redux'
import MaterialItem from '../MaterialItem/MaterialItem'
import styles from './styles'

const Materials = ({ finishOrder }) => {
  const materialsArr = useSelector((state) => state.main.materialsArr)
  const finishOrderParams = useSelector((state) => state.main.finishOrderParams)
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Materials, semi-finished products, finished products
        </Text>
      </View>
      <ScrollView style={styles.container}>
        {materialsArr.length === 0 ? (
          <ActivityIndicator size='large' color='#000088' />
        ) : (
          <>
            {materialsArr.map((item, index) => {
              return <MaterialItem key={item._id} index={index} />
            })}
            <Pressable
              style={styles.okButton}
              onPress={() =>
                finishOrder(
                  finishOrderParams.nextOperationId,
                  finishOrderParams.relationId
                )
              }
            >
              <Text style={styles.okButtonText}>Ok</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </>
  )
}

export default Materials
