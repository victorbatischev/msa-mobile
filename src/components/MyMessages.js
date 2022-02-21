import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import MessageItem from './MessageItem'
import NewMessagesItem from './NewMessageItem'

const MyMessages = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={{ fontFamily: 'Roboto', fontSize: 18, padding: 15 }}>
        You have not messages
      </Text> */}
      <ScrollView style={styles.scrool}>
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem isYourMessage />
        <MessageItem isYourMessage />
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 140,
          width: '100%',
          padding: 5
        }}
      >
        <NewMessagesItem />
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
    marginBottom: 235
  }
})

export default MyMessages
