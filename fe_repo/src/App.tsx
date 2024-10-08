import { Header, Content, ChatBox } from './pages'
import { useState } from "react";
import { sendMessage } from "./functions/api.ts";

export type Message = {
  text: string,
  isUser: boolean,
}
function App() {

  const [messages, setMessages] = useState<Message[]>([])

  const onSendMessage = (message: string) => {
    setMessages((messages) => [...messages,
      {
        text: message,
        isUser: true
      },
      {
        text: 'Sending message...',
        isUser: false
      }]);

    setTimeout(() => {
      // handle message sent, update conversation section
      const response = {text: sendMessage(message), isUser: false}
      // remove sending prompt message
      setMessages((messages) => [...messages.slice(0, -1), response]);
    }, 1000);
  }

  return (
    <div className="main-container">
      <Header/>
      <Content messages={messages}></Content>
      <ChatBox onSendMessage={onSendMessage}></ChatBox>
    </div>
  )
}

export default App
