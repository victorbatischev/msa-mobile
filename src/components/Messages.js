import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  Platform
} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

import axios from 'axios'
import styles from '../styles/Styles'
import {
  windowHeight,
  windowWidth,
  currentMessages,
  earlierMessages
} from '../Constants'

const Messages = ({ activeOrderId }) => {
  const [messages, setMessages] = useState(currentMessages)

  // useEffect(() => {
  //   axios.get(`order_worker_message/${activeOrderId}`).then((res) => {
  //     console.log(res.data)
  //     if (res.data) {
  //       setMessages(res.data)
  //     } else {
  //       setMessages(currentMessages)
  //     }
  //   })
  // }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
  }, [])

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
              test
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            test2
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
            Operation: test3
          </Text>
          <Text style={{ fontFamily: 'Roboto', fontSize: 18, color: '#fff' }}>
            test4
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
              style={{ fontFamily: 'Roboto', fontSize: 17, color: '#8F8F8F' }}
            >
              test
            </Text>
          </View>
          <Text
            style={{ fontFamily: 'Roboto', fontSize: 14, color: '#A2A2A2' }}
          >
            test2
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
            Operation: test3
          </Text>
          <Text style={{ fontFamily: 'Roboto', fontSize: 18, color: '#000' }}>
            test4
          </Text>
        </View>
      </View>
    )
  }

  const EmptyChat = () => {
    return (
      <View
        style={{
          ...styles.center,
          flex: 1,
          width: windowWidth,
          transform: [{ rotateX: '180deg' }],
          backgroundColor: '#fff'
        }}
      >
        <Text style={{ fontFamily: 'Roboto', fontSize: 18, padding: 15 }}>
          You have not messages
        </Text>
      </View>
    )
  }

  const LoadingChat = () => {
    return (
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
    )
  }

  const MessageSend = () => {
    return (
      <Pressable>
        <Image
          style={{ width: 46, height: 46, margin: 10 }}
          source={require('../assets/images/send.png')}
        />
      </Pressable>
    )
  }

  return (
    <View
      style={{ ...styles.container, width: '100%', backgroundColor: '#888' }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1, name: 'Developer' }}
        scrollToBottom={true}
        infiniteScroll={true}
        alwaysShowSend={true}
        showAvatarForEveryMessage={true}
        isTyping={false}
        isLoadingEarlier={false}
        renderUsernameOnMessage={true}
        renderAvatarOnTop={true}
        inverted={Platform.OS !== 'web'}
        quickReplyStyle={{ borderRadius: 2 }}
        renderChatEmpty={EmptyChat}
        renderLoading={LoadingChat}
        renderSend={MessageSend}
        renderSystemMessage={ServerMessage}
        renderMessage={MyMessage}
      />
    </View>
  )
}

export default Messages
