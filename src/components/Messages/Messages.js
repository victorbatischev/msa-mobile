import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import MessageItem from '../MessageItem/MessageItem'
import NewMessagesItem from '../NewMessageItem/NewMessageItem'
import styles from './styles'

const Messages = ({ orderId, userId }) => {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const getMessage = setInterval(() => {
      axios.get(`order_worker_message/${orderId}`).then((res) => {
        setMessages(res.data)
      })
    }, 1000)
    return () => {
      clearInterval(getMessage)
    }
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {messages.length === 0 ? (
          <Text style={styles.notMessageText}>You have not messages</Text>
        ) : (
          messages.map((item, index) => {
            return (
              <MessageItem
                key={index}
                isYourMessage={userId === item.w_id}
                userName={item.worker}
                operation={item.operation}
                date={item.m_data}
                message={item.message}
              />
            )
          })
        )}
        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.newMessageItemContainer}>
        <NewMessagesItem orderId={orderId} userId={userId} />
      </View>
    </View>
  )
}

export default Messages
