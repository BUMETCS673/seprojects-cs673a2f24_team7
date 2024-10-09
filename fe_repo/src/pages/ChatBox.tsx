import {UploadIcon} from "../icons"
import {Textarea} from '../components'
import {CSSProperties, useState} from "react";
import {uploadFile} from "../functions/api.ts";

interface IChatBoxProps {
  onSendMessage: (message: string) => void;
  onAnalyze: (jd: string) => void;
}

export const ChatBox = ({onSendMessage, onAnalyze}: IChatBoxProps) => {

  const [message, setMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const handleSend = () => {
    if (message.trim() == "") {
      return;
    }
    // call upper function to send message
    onSendMessage(message);
    setMessage("");
  }

  const handleAnalyze = () => {
    if (jobDescription.trim() !== "") {
      // Call the analyze function with job description
      onAnalyze(jobDescription);
    }
    setShowPrompt(false);
    setJobDescription(""); // Clear the input after submission
  };

  const chatBoxStyle = {
    borderWidth: '2px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const as 'column',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const iconRowStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px', // Add space between buttons
    marginBottom: '10px',
  };

  const iconStyle = {
    fontSize: '16px', // Set a smaller, consistent size for emoji icons
  };

  const iconButtonStyle = {
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '20px', // Rounded rectangle shape
    backgroundColor: '#3498db', // A nice blue color
    color: 'white',
    border: 'none',
    fontSize: '14px', // Ensure consistent font size
    display: 'flex',
    alignItems: 'center',
    gap: '5px', // Space between icon and text
  };

  const modalStyle: CSSProperties = {
    position: 'fixed', // Ensure position is a valid CSS value
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Translate accepts a string
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    width: '400px',
    display: showPrompt ? 'block' : 'none', // Ensure the value of 'display' is a valid CSS value
  };

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: showPrompt ? 'block' : 'none', // Ensure the value of 'display' is a valid CSS value
  };

  return (
    <div style={chatBoxStyle}>
      {/* Overlay and Modal for Job Description */}
      <div style={overlayStyle} onClick={() => setShowPrompt(false)}></div>
      <div style={modalStyle}>
        <h3>Enter a Job Description</h3>
        <Textarea
          className="flex-1"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description here..."
        />
        <button style={iconButtonStyle} onClick={handleAnalyze}>
          Submit
        </button>
      </div>
      {/* icon row */}
      <div style={iconRowStyle}>
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
        <button style={iconButtonStyle} onClick={() => setShowPrompt(true)}>
          <span style={iconStyle}>📄</span> Analyze my resume
        </button>
        {/*🛈 /!* Example icon - you can use actual icons here *!/*/}
        {/*💼 /!* Example icon for interview *!/*/}
      </div>
      {/* input row */}
      <div style={{display: 'flex', alignItems: 'center'}}>
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
    </div>
  )
}

