import React, { useState, useEffect } from 'react';
import './chatbot.css';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import Person from '../assets/Person.jpg';
import ChatPerson from '../assets/Chat_Person.png'
import ChatbotTop from '../assets/Chatbot_Top.png';
import chaticon from '../assets/ChatIcon.png';
import Bot from '../assets/chatbot_message.png';
import Chatbot from '../assets/Chatbot.png';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    // Set initial message when component mounts
    setMessages([{ text: "Hi, I Am GPTBot, How can I help you?", isUser: false }]);
    // setMessages([{ text: "How can I help you?", isUser: false }]);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const fetchResponse = async (question: string) => {
    try {
      // Simulate fetching response from an API
      const response = await axios.post(`${process.env.REACT_APP_CHATBOT_API}/chat?prompt=${question}`);
      const data = response.data;
      console.log(data.message);
      // Add bot response to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, isUser: false },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message to messages
    setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
    // Fetch response for user input
    fetchResponse(input);
    // Clear input field
    setInput('');
  };

  return (
    <div style={{ position: 'relative' }}>
      {isOpen && (
        <div style={{ position: 'fixed', bottom: '150px', right: '30px', zIndex: 95, maxWidth: '350px' }}>
          <div style={{ border: '2px solid black', borderRadius: '20px', padding: '10px', backgroundImage: `url(${Chatbot})`, backgroundSize: '50%', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}>
            <div className="chatbot-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid black' }}>
              <div className="person-icon">
                <img src={ChatbotTop} alt="Person" height={'35px'} width={'35px'} />
              </div>
              <Typography style={{ fontSize: "20px", marginTop: '5px', fontWeight: 'bold' }}>GPTBot</Typography>
              <IconButton style={{ color: 'black' }} onClick={toggleChat} className="close-button">
                <CloseIcon />
              </IconButton>
            </div>
            <div style={{ padding: '10px', height: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`} style={{ display: 'flex', alignItems: 'center' }}>
                  {message.isUser ? (
                    <>
                      <div className="user-message" style={{ marginLeft: 'auto' }}>
                        {message.text}
                      </div>
                      <div className="person-icon" style={{ marginLeft: '10px' }}>
                        <img src={ChatPerson} alt="Person" height={'35px'} width={'35px'} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bot-icon" style={{ marginRight: '10px' }}>
                        <img src={Bot} alt="Person" height={'35px'} width={'35px'} />
                      </div>
                      <div className="bot-message" style={{ marginRight: 'auto' }}>
                        {message.text}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <TextField
                fullWidth
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevent default Enter behavior (sending the message)
                    handleSendMessage();
                  } else if (e.key === 'Enter' && e.shiftKey) {
                    setInput((prevInput) => prevInput + '\n'); // Add newline character
                  }
                }}
              />
              <Button onClick={handleSendMessage} style={{ backgroundColor: '#25BFCB' }}>Send</Button>
            </div>
          </div>
        </div>
      )}
      <Button style={{ position: 'fixed', bottom: '60px', right: '30px', color: 'black', zIndex: 99 }} size='large' onClick={toggleChat}>
        <img src={chaticon} alt='Chat' height={'64px'} width={'64px'} />
      </Button>
    </div>
  );
};

export default ChatBot;
