import React, { useState } from 'react'
import { StyleSheet, View, Pressable, TextInput, Image } from 'react-native'
import sendButton from '../assets/images/send.png'
import { windowWidth } from '../Constants'

const NewMessagesItem = () => {
  const [newMessage, setNewMessage] = useState('')
  const buttonHendler = () => {
    console.log(newMessage)
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='New message'
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
      ></TextInput>
      <Pressable style={styles.sendButton} onPress={buttonHendler}>
        <Image source={sendButton} style={styles.sendButtonImage} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth <= 480 ? '100%' : '77%',
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    width: '90%'
  },
  sendButton: {
    width: 46,
    height: 46
  },
  sendButtonImage: {
    width: '100%',
    height: '100%'
  }
})

export default NewMessagesItem
