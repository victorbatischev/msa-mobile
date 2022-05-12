import axios from 'axios'
import React, { useState } from 'react'
import { View, Pressable, TextInput, Image, Keyboard } from 'react-native'
import sendButton from '../../assets/images/send.png'
import styles from './styles'

const NewMessagesItem = ({ orderId, userId }) => {
  const [newMessage, setNewMessage] = useState('')

  const buttonHendler = () => {
    Keyboard.dismiss()
    axios
      .post('order_worker_new_message', {
        _id: orderId,
        u_id: userId,
        message: newMessage
      })
      .then(() => setNewMessage(''))
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='New message'
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
      />
      <Pressable style={styles.sendButton} onPress={buttonHendler}>
        <Image source={sendButton} style={styles.sendButtonImage} />
      </Pressable>
    </View>
  )
}

export default NewMessagesItem
