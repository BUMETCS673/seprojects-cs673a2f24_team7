import { Header, Content, ChatBox } from './pages'
import {useState} from "react";
import {sendMessage} from "./functions/api.tsx";

function App() {

  const [messages, setMessages] = useState([])

  const onSendMessage = (message: string) => {
    setMessages((messages) => [...messages, {text: message, user: true}]);

    setTimeout(() => {
      // handle message sent, update conversation section
      const response = {text: sendMessage(message), user: false}
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
