import {UploadIcon} from "../icons"
import {Textarea} from '../components'
import {useState} from "react";
import {uploadFile} from "../functions/api.ts";

interface IChatBoxProps {
  onSendMessage: (message: string) => void;
}

export const ChatBox = ({onSendMessage}: IChatBoxProps) => {

  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() == "") {
      return;
    }
    // call upper function to send message
    onSendMessage(message);
    setMessage("");
  }

  const chatBoxStyle = {
    borderWidth: '2px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center' as const as 'center',
    backgroundColor: '#ffffff', // White background for chat input
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={chatBoxStyle}>
      <div
        style={{width: '64px', display: 'flex', justifyContent: 'center', cursor: 'pointer'}}
        onClick={() => {
          // Upload files
          const handleFiles = (event: Event) => {
            const files = (event.target as HTMLInputElement)?.files;
            if (!files || files.length === 0) return;
            const file = files[0];
            if (file) {
              // upload if file is valid
              uploadFile(file);
            }
          }

          const input = document.createElement("input");
          input.type = 'file';
          input.accept = '.pdf';
          input.onchange = handleFiles;
          input.click();
        }}
      >
        <UploadIcon/>
      </div>
      <Textarea
        className="flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          // listen for enter key
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
    </div>
  )
}

