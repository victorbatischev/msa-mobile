import React from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import MaterialItem from '../MaterialItem/MaterialItem'
import styles from './styles'

const Materials = ({
  materialsArr,
  setMaterialsArr,
  finishOrderParams,
  finishOrder
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Materials, semi-finished products, finished products
        </Text>
      </View>
      <ScrollView style={styles.container}>
        {materialsArr.length === 0 ? (
          <Text>Loading... Please wait</Text>
        ) : (
          <>
            {materialsArr.map((item, index) => {
              return (
                <MaterialItem
                  key={item._id}
                  materials={materialsArr[index]}
                  setMaterialsArr={setMaterialsArr}
                  index={index}
                />
              )
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
