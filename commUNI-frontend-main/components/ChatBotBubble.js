import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { initDialogflow } from "../dialogflowConfig";
import axios from 'axios';

const ChatBotBubble = ({ userId }) => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me about clubs at USTP!" },
  ]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef();

  useEffect(() => {
    if (!userId) console.warn("ChatBotBubble: userId is undefined");
  }, []);

  useEffect(() => {
    initDialogflow();
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    Dialogflow_V2.requestQuery(
      text,
      async (res) => {
        const reply = res.queryResult.fulfillmentText;
        const botMessage = { sender: "bot", text: reply };
        setMessages((prev) => [...prev, botMessage]);
 
        try {
          await axios.post("http://10.0.2.2:5003/save-interaction", {
            userId: userId,
            message: text,
            response: reply,
          });
        } catch (err) {
          console.error("Failed to save chat interaction:", err);
        }
      },
      (err) => {
        console.error("Dialogflow Error:", err);
        const errorMessage = {
          sender: "bot",
          text: "Oops! Something went wrong.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.bubbleButton}
      >
        <Text style={{ color: "white", fontSize: 20 }}>💬</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modal}>
          <View style={styles.chatContainer}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.messagesContainer}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((msg, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageBubble,
                    msg.sender === "user"
                      ? styles.userBubble
                      : styles.botBubble,
                  ]}
                >
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Ask me something..."
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => sendMessage(input)}>
                <Text style={styles.send}>Send</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeBtn}
            >
              <Text style={{ color: "#888", fontWeight: "600" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bubbleButton: {
    position: "absolute",
    bottom: 70,
    right: 15,
    backgroundColor: "#1e90ff",
    padding: 16,
    borderRadius: 50,
    elevation: 5,
    zIndex: 999,
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  chatContainer: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    maxHeight: "75%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messagesContainer: {
    paddingBottom: 20,
  },
  messageBubble: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 16,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#1e90ff",
    borderTopRightRadius: 0,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e1e1e1",
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: "#000",
    fontSize: 15,
  },
  inputRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    fontSize: 15,
  },
  send: {
    fontWeight: "600",
    color: "#1e90ff",
    fontSize: 16,
  },
  closeBtn: {
    alignItems: "center",
    padding: 10,
  },
});

export default ChatBotBubble;
