import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import MessageItem from './MessageItem'
import NewMessagesItem from './NewMessageItem'

const MyMessages = ({ orderId, userId }) => {
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
          <Text style={{ fontFamily: 'Roboto', fontSize: 18, padding: 15 }}>
            You have not messages
          </Text>
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

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: 5
        }}
      >
        <NewMessagesItem orderId={orderId} userId={userId} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  scroll: {
    flex: 1,
    padding: 10,
    marginBottom: 0
  }
})

export default MyMessages
