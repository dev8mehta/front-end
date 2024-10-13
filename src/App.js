import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  paddingLeft: 50px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #1a1a1a;
  height: 100vh;
`;

const Header = styled.div`
  background: #2394d9;
  color: white;
  padding: 20px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size:2vw;
`;

const MessagesContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  overflow: auto;
  height: 80vh;
  scroll-behavior: smooth;
`;

const Message = styled.div`
  background: ${(props) => (props.isBot ? '#e9ecef' : '#2394d9')};
  color: ${(props) => (props.isBot ? '#000' : '#fff')};
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  align-self: ${(props) => (props.isBot ? 'flex-start' : 'flex-end')};
  float: ${(props) => (props.isBot ? 'left' : 'right')};
  overflow-wrap: break-word;
  max-width: 75%;
  font-family: Arial, Helvetica, sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
`;

const TextInput = styled.textarea`
  width: 100%;
  padding: 15px;
  border: none;
  outline: none;
  display: flex;
  overflow-wrap: break-word;
  resize: none;
`;

const SendButton = styled.button`
  background: #2394d9;
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  outline: none;
`;

const App = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', isBot: true },
  ]);
  const [userInput, setUserInput] = useState('');

  // Handle sending a new message
  const handleSendMessage = () => {
    if (userInput.trim()) {
      const userMessage = { text: userInput, isBot: false };
      setMessages([userMessage, ...messages]);
      setUserInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage = { text: 'I am a function, not an AI. This is pre-written text.', isBot: true };
        setMessages((prevMessages) => [botMessage, ...prevMessages]);
      }, 1000); // Response delay to simulate real interaction
    }
  };

  return (
    <ChatContainer>
      <Header>ISOtope's RAG</Header>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} isBot={msg.isBot}>
            {msg.text}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <TextInput
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default App;
