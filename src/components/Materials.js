import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView
} from 'react-native'
import axios from 'axios'

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
    <View style={materialItemStyles.container}>
      <Text style={materialItemStyles.title}>{materials.path}</Text>
      <Pressable style={materialItemStyles.sign} onPress={changeCondition}>
        <Text>{materials.condition == 'minus' ? '-' : '+'}</Text>
      </Pressable>
      <TextInput
        style={materialItemStyles.input}
        keyboardType='numeric'
        textAlign='center'
        value={materials.value.toString()}
        onChangeText={(text) => changeValue(text)}
      />
    </View>
  )
}

const materialItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  title: {
    width: '33.33%',
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  sign: {
    width: 42,
    height: 42,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21
  },
  input: {
    justifyContent: 'center',
    width: '30.4%',
    height: 60,
    backgroundColor: '#F2F2F2',
    borderRadius: 30
  }
})

const Materials = ({
  materialsArr,
  setMaterialsArr,
  setShowMaterialsComponent
}) => {
  return (
    <>
      <View style={materialsStyles.header}>
        <Text style={materialsStyles.headerText}>
          Materials, semi-finished products, finished products
        </Text>
      </View>
      <ScrollView style={materialsStyles.container}>
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
              style={materialsStyles.okButton}
              onPress={() => setShowMaterialsComponent(false)}
            >
              <Text style={materialsStyles.okButtonText}>Ok</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </>
  )
}

const materialsStyles = StyleSheet.create({
  header: {
    paddingHorizontal: 17,
    paddingTop: 30,
    paddingBottom: 19,
    borderBottomWidth: 4,
    borderBottomColor: '#00000020'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 17
  },
  okButton: {
    marginTop: 50,
    alignSelf: 'center',
    width: 200,
    height: 66,
    backgroundColor: '#009C6D',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  okButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto'
  }
})

export default Materials
