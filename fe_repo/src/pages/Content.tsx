import {useEffect, useRef} from "react";

export const Content = ({messages}) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="border-2 p-fined flex-1 overflow-y-auto" ref={contentRef}>
      {messages.map((msg, index) => (
        <div
          key={index}
          {/* set user's message to right and others to left */}
          className={`p-2 flex ${msg.user ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs p-2 rounded-lg ${
              // set user's message to blue and others to green
              msg.user
                ? 'bg-blue-500 text-green'
                : 'bg-green-500 text-black'
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  )
}

