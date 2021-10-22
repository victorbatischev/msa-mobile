import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'

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

  const MessageItem = ({ message }) => {
    return (
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: '#F5F5F5',
          borderRadius: 7,
          borderTopLeftRadius: 0,
          width: '90%'
        }}
      >
        <Text>{message.worker}</Text>
        <Text>Operation: {message.operation}</Text>
        <Text>{message.m_data}</Text>
        <Text>{message.w_id}</Text>
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
              <MessageItem message={item} key={index} />
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
