import axios from 'axios'
import React from 'react'
import { View, Pressable, TextInput, Image, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setNewMessage } from '../../redux/actionCreators'
import sendButton from '../../assets/images/send.png'
import styles from './styles'

const NewMessagesItem = ({ orderId, userId }) => {
  const dispatch = useDispatch()
  const newMessage = useSelector((state) => state.NewMessagesItem?.newMessage)

  const buttonHendler = () => {
    Keyboard.dismiss()
    axios
      .post('order_worker_new_message', {
        _id: orderId,
        u_id: userId,
        message: newMessage
      })
      .then(() => dispatch(setNewMessage('')))
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='New message'
        value={newMessage}
        onChangeText={(text) => dispatch(setNewMessage(text))}
      />
      <Pressable style={styles.sendButton} onPress={buttonHendler}>
        <Image source={sendButton} style={styles.sendButtonImage} />
      </Pressable>
    </View>
  )
}

export default NewMessagesItem
