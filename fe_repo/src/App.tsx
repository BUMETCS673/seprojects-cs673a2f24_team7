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
    setMessages((messages) => [...messages, { text: message, isUser: true }]);

    setTimeout(() => {
      // handle message sent, update conversation section
      const response = { text: sendMessage(message), isUser: false }
      setMessages((messages) => [...messages, response]);
    }, 1000);
  }

  return (
    <div className="main-container">
      <Header></Header>
      <Content messages={messages}></Content>
      <ChatBox onSendMessage={onSendMessage}></ChatBox>
    </div>
  )
}

export default App
