import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native'

import axios from 'axios'
import styles from '../styles/Styles'
import { windowHeight, windowWidth } from '../Constants'

const Messages = ({ activeOrderId }) => {
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    axios.get(`order_worker_message/${activeOrderId}`).then((res) => {
      setMessages(res.data)
    })
  }, [])

  const MessageItem = ({ message, index }) => {
    return index % 2 ? (
      <MyMessage message={message} />
    ) : (
      <ServerMessage message={message} />
    )
  }

  const MyMessage = ({ message }) => {
    return (
      <View style={styles.myMessage}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 24, height: 24, marginRight: 10 }}
              source={require('../assets/images/avatar_local.png')}
            />
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 17,
                color: 'rgba(255, 255, 255, 0.6)'
              }}
            >
              {message.worker}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            {message.m_data}
          </Text>
        </View>
        <View style={{ marginLeft: 35 }}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 13,
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: 8
            }}
          >
            Operation: {message.operation}
          </Text>
          <Text style={{ fontFamily: 'Roboto', fontSize: 18, color: '#fff' }}>
            {message.w_id}
          </Text>
        </View>
      </View>
    )
  }

  const ServerMessage = ({ message }) => {
    return (
      <View style={styles.serverMessage}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 24, height: 24, marginRight: 10 }}
              source={require('../assets/images/avatar_server.png')}
            />
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 17,
                color: '#8F8F8F'
              }}
            >
              {message.worker}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 14,
              color: '#A2A2A2'
            }}
          >
            {message.m_data}
          </Text>
        </View>
        <View style={{ marginLeft: 35 }}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 13,
              color: '#8F8F8F',
              marginTop: 8
            }}
          >
            Operation: {message.operation}
          </Text>
          <Text style={{ fontFamily: 'Roboto', fontSize: 18, color: '#000' }}>
            {message.w_id}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#fff'
      }}
    >
      <View style={{ ...styles.container, alignItems: 'flex-start' }}>
        {messages ? (
          messages.length ? (
            messages.map((item, index) => (
              <MessageItem message={item} key={index} index={index} />
            ))
          ) : (
            <Text style={{ fontFamily: 'Roboto', color: '#8F8F8F' }}>
              You have not messages
            </Text>
          )
        ) : (
          <View
            style={{
              ...styles.center,
              flex: 1,
              width: windowWidth,
              backgroundColor: '#fff'
            }}
          >
            <ActivityIndicator size='large' color='#000088' />
            <Text style={{ fontFamily: 'Roboto', fontSize: 18, padding: 15 }}>
              Loading messages
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default Messages
