import {UploadIcon} from "../icons"
import {Textarea} from '../components'
import {useState} from "react";

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
          input.addEventListener("change", handleFiles, false);

          function handleFiles() {
            if ((input.files?.length ?? 0) > 0) {
              console.log(input.files![0]);
            }
          }

          input.click();
        }}
      >
        <UploadIcon/>
      </div>
      {/* chat input */}
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

