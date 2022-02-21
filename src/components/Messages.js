import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native'
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import moment from 'moment'
import axios from 'axios'
import styles from '../styles/Styles'
import { windowWidth } from '../Constants'
import MessageItem from './MessageItem'
import NewMessagesItem from './NewMessageItem'

const Messages = ({ userName, userId, activeOrderId }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get(`order_worker_message/${activeOrderId}`).then((res) => {
      //console.log(res.data)
      if (res.data && res.data.length) {
        const newMessages = res.data.map((item, index) => {
          return {
            _id: index,
            text: `${item.operation}|${item.w_id}`,
            createdAt: moment(item.m_data, 'DD.MM.YYYY hh:mm'),
            user: {
              _id: item.w_m_id,
              name: item.worker
            },
            system: false,
            sent: false
          }
        })
        setMessages(newMessages)
      }
    })
  }, [])

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
          flex: 1,
          width: windowWidth <= 480 ? windowWidth : windowWidth * 0.95,
          transform: [{ rotateX: '180deg' }],
          backgroundColor: '#fff',
          flexDirection: 'column',
          paddingLeft: 5
        }}
      >
        <Text style={{ fontFamily: 'Roboto', fontSize: 18, padding: 15 }}>
          You have not messages
        </Text>
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem isYourMessage />
        <View
          style={{
            position: 'absolute',
            bottom: 90,
            width: '100%',
            padding: 5
          }}
        >
          <NewMessagesItem />
        </View>
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

  const MessageSend = (props) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <Image
          style={{ width: 23, height: 23 }}
          source={require('../assets/images/send.png')}
          resizeMode={'center'}
        />
      </Send>
    )
  }

  const MessageBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{ right: { color: 'white' } }}
        wrapperStyle={{ right: { backgroundColor: '#0080FF' } }}
      />
    )
  }

  return (
    <View
      style={{ ...styles.container, width: '100%', backgroundColor: '#888' }}
    >
      <GiftedChat
        messages={messages}
        placeholder={'New message...'}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userId, name: userName }}
        scrollToBottom={true}
        infiniteScroll={true}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        isTyping={false}
        renderUsernameOnMessage={true}
        renderAvatarOnTop={true}
        renderChatEmpty={EmptyChat}
        renderLoading={LoadingChat}
        renderSend={MessageSend}
        renderBubble={MessageBubble}
        // renderMessage={MyMessage}
      />
    </View>
  )
}

export default Messages
