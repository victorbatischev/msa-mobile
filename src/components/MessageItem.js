import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { windowWidth } from "../Constants";

const MessageItem = ({ isYourMessage }) => {
  return (
    <View style={styles.container}>
      <Text>Это сообщение</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth <= 480 ? "87%" : 546,
    backgroundColor: "#0080FF",
  },
});

export default MessageItem;
