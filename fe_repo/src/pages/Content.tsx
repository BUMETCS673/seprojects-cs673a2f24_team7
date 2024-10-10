import {useEffect, useRef} from "react";
import {Message} from "../App";

interface IContentProps {
  messages: Message[];
}

export const Content = ({messages}: IContentProps) => {
  const contentRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  const contentStyle = {
    borderWidth: '2px',
    padding: '16px',
    flex: 1,
    overflowY: 'auto' as const as 'auto',
    backgroundColor: '#ffffff', // White or off-white background
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  };

  return (
    <div ref={contentRef} style={contentStyle}>
      {messages.map((msg, index) => (
        <div
          key={index}
          /* set user's message to right and others to left */
          style={{
            padding: '8px',
            display: 'flex',
            justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
          }}
        >
          <div
            className="max-w-xs p-2 rounded-lg w-full"
            style={{
              padding: '8px',
              borderRadius: '12px',
              backgroundColor: msg.isUser ? '#3498db' : '#A8E6A1',
              color: msg.isUser ? 'white' : 'black',
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  )
}

