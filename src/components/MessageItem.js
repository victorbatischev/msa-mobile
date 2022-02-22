import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import avatar from '../assets/images/avatar_server.png'
import { windowWidth } from '../Constants'

const MessageItem = ({ isYourMessage, userName, operation, date, message }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isYourMessage ? '#0080FF' : '#F5F5F5',
          borderTopLeftRadius: isYourMessage ? 14 : 0,
          borderTopRightRadius: isYourMessage ? 0 : 14
        }
      ]}
    >
      <View style={styles.infoBlock}>
        <View style={styles.leftPart}>
          <Image source={avatar} style={styles.avatar} />
          <Text style={[styles.text, isYourMessage && { color: '#ffffff' }]}>
            {userName}
          </Text>
          <Text
            style={[
              styles.text,
              { width: 100 },
              isYourMessage && { color: '#ffffff' }
            ]}
          >
            Operation: {operation}
          </Text>
        </View>
        <Text style={[styles.text, isYourMessage && { color: '#ffffff' }]}>
          {date}
        </Text>
      </View>
      <Text style={[styles.message, isYourMessage && { color: '#ffffff' }]}>
        {message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth <= 480 ? '98%' : '77%',
    borderRadius: 14,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginBottom: 15
  },
  infoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 20,
    height: 20
  },
  text: {
    fontSize: windowWidth <= 480 ? 8 : 14,
    marginHorizontal: 5,
    color: '#8F8F8F'
  },
  message: {
    marginLeft: 25,
    color: '#282A2D',
    fontSize: windowWidth <= 480 ? 14 : 18
  }
})

export default MessageItem
