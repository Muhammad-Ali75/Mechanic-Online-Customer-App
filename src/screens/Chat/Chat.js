import React, { useState, useEffect } from "react";
import useChat from "./useChat";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  GiftedChat,
  Bubble,
  Send,
  MessageImage,
} from "react-native-gifted-chat";
import NavigationBar from "react-native-navbar";
import { withNavigation } from "react-navigation";
import * as SecureStore from "expo-secure-store";

const Chat = ({ navigation }) => {
  const { messages, sendMessage } = useChat({order_id:navigation.getParam('orderID')});
  const [term, setTerm] = useState("");
  const order_id = navigation.getParam('orderID');

  console.log('chat');

  async function save() {
    await SecureStore.setItemAsync("order", order_id);
  }

  const onSend = (message) => {
    const messageObject = {
      order_id: "62c650fe699004bc1a5a3b10",
      text: message.text,
      user: "628b4c4bc3b820d70cc31bf7",
    };
    console.log('Chat',messageObject);
    sendMessage(messageObject, order_id);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#560CCE",
          },
          left: {
            borderWidth: 1,
            borderColor: "#560CCE",
            backgroundColor: "#E5E7E9",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={40}
            color="#560CCE"
          />
        </View>
      </Send>
    );
  };

  return (
    <>
      <NavigationBar
        title={{
          title: "Chat",
        }}
        rightButton={{
          title: "Send Image",
          handler: () => navigation.navigate("ImagePicker"),
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={(message) => onSend(message[0])}
        user={{
          _id: "628b4c4bc3b820d70cc31bf7",
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        scrollToBottom
      />
    </>
  );
};

export default withNavigation(Chat);
