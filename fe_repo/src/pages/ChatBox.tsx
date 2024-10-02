import {UploadIcon} from "../icons"
import {Textarea} from '../components'
import {useState} from "react";
import {uploadFile} from "../functions/api.tsx";

export const ChatBox = ({onSendMessage}) => {

  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() == "") {
      return;
    }
    onSendMessage(message);
    setMessage("");
  }

  return (
    <div className="border-2 p-fined flex items-center">
      <div
        className="w-16 flex justify-center cursor-pointer"
        onClick={() => {
          // Upload files
          const input = document.createElement("input");
          input.type = 'file';
          input.accept = 'image/*,.pdf,.doc,.docx';
          input.onchange = handleFiles;
          input.click();

          function handleFiles(event) {
            const file = event.target?.files[0];
            if (file) {
              uploadFile(file);
            }
          }
        }}
      >
        <UploadIcon/>
      </div>
      <Textarea
        className="flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
    </div>
  )
}

