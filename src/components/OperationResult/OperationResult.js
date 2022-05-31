import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import styles from '../../styles/Styles'
import axios from 'axios'
import componentStyles from './styles'

const OperationResult = ({
  setShowMaterialsComponent,
  activeOrder,
  user,
  setModalVisible,
  setFinishOrderParams,
  setMaterialsArr,
  finishOrder
}) => {
  const maretialsRequest = (index) => {
    if (activeOrder) {
      axios
        .get(`order_id_worker/${activeOrder._id}/${user?.u_id}/`)
        .then((res) =>
          setMaterialsArr(res.data[0].operation.relation[index].function)
        )
    }
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
      }}
    >
      <View style={componentStyles.resultContainer}>
        <Text style={componentStyles.resultText}>Operation result</Text>
      </View>
      {activeOrder?.operation.relation.map((item, index) => (
        <Pressable
          onPress={() => {
            setFinishOrderParams({
              nextOperationId: item.so_id,
              relationId: item._id
            })
            if (activeOrder?.operation.relation[index].function.length > 0) {
              maretialsRequest(index)
              setShowMaterialsComponent(true)
            } else {
              finishOrder(
                finishOrderParams.nextOperationId,
                finishOrderParams.relationId
              )
            }
          }}
          key={item._id}
          style={{
            ...styles.center,
            ...styles.operationItem,
            backgroundColor: item.bgr_color
          }}
        >
          <Text style={componentStyles.itemResultText}>{item.result}</Text>
          <Image
            style={componentStyles.arrowIcon}
            source={require('../../assets/images/arrow_white.png')}
          />
        </Pressable>
      ))}
      <View style={componentStyles.canselButtonContainer}>
        <Pressable
          style={{ ...styles.center, ...styles.cancelContainer }}
          onPress={() => {
            setModalVisible(false)
          }}
        >
          <Image
            style={componentStyles.closeIcon}
            source={require('../../assets/images/close.png')}
          />
          <Text style={componentStyles.cansetButtonTitle}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default OperationResult
