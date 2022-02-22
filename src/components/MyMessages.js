import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import MessageItem from './MessageItem'
import NewMessagesItem from './NewMessageItem'

const MyMessages = ({ orderId, userId }) => {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    axios.get(`order_worker_message/${orderId}`).then((res) => {
      setMessages(res.data)
    })
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrool}>
        {/* <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem isYourMessage />
        <MessageItem isYourMessage /> */}
        {messages.length === 0 ? (
          <Text style={{ fontFamily: 'Roboto', fontSize: 18, padding: 15 }}>
            You have not messages
          </Text>
        ) : (
          messages.map((item, index) => {
            return (
              <MessageItem
                key={index}
                isYourMessage={userId === item.w_m_id}
                userName={item.worker}
                operation={item.operation}
                date={item.m_data}
                message={item.w_id}
              />
            )
          })
        )}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 135,
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
  scrool: {
    flex: 1,
    marginBottom: 230
  }
})

export default MyMessages
