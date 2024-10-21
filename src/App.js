//import logo from './logo.svg';
//import './App.css';
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

//Char Limit
const maxLength = 1000;

//THEMES
const lightTheme = {
  background: "#ffffff",
  textColor: "#000000",
  headerBackground: "#2394d9",
  messageBackgroundUser: "#2394d9",
  messageBackgroundBot: "#e9ecef",
};

const darkTheme = {
  background: "#1a1a1a",
  textColor: "#ffffff",
  headerBackground: "#2394d9",
  messageBackgroundUser: "#2394d9",
  messageBackgroundBot: "#555555",
};

const ChatContainer = styled.div`
  paddingleft: 50px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textColor};
  height: 100vh;
`;

const Header = styled.div`
  background: ${(props) => props.theme.headerBackground};
  color: white;
  padding: 20px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 2vw;
  position: relative;
`;
//This is just for the title of the website because I wanted the switch themes button
//up top with it but not centered
const Title = styled.div`
  text-align: center;
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
  background: ${(props) =>
    props.isBot
      ? props.theme.messageBackgroundBot
      : props.theme.messageBackgroundUser};
  color: ${(props) => (props.isBot ? props.theme.textColor : "#fff")};
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  align-self: ${(props) => (props.isBot ? "flex-start" : "flex-end")};
  float: ${(props) => (props.isBot ? "left" : "right")};
  overflow-wrap: break-word;
  max-width: 75%;
  font-family: Arial, Helvetica, sans-serif;
  white-space: pre-wrap;
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
  background: ${(props) => props.theme.headerBackground};
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  outline: none;
`;

const CharCount = styled.div`
  text-align: center;
  color: ${(props) => (props.remaining < 0.05 * maxLength ? "red" : "green")};
  font-size: 12px;
  padding: 10px 1px;
  background: ${(props) => props.theme.background};
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1em;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`;

const App = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", isBot: true },
  ]);
  const [userInput, setUserInput] = useState("");
  const [theme, setTheme] = useState(darkTheme);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (userInput.trim()) {
      const userMessage = { text: userInput, isBot: false };
      setMessages([userMessage, ...messages]);
      setUserInput("");

      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          text: "I am a function, not an AI. This is pre-written text.",
          isBot: true,
        };
        setMessages((prevMessages) => [botMessage, ...prevMessages]);
      }, 1000); // Response delay to simulate real interaction
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.ctrlKey) {
        // Ctrl + Enter makes new line
        const cursorPos = e.target.selectionStart;
        setUserInput(
          userInput.slice(0, cursorPos) + "\n" + userInput.slice(cursorPos)
        );
        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = cursorPos + 1;
        }, 0);
      } else {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatContainer>
        <Header>
          <Title>ISOtope's RAGatouille Chatbot</Title>
          <ThemeToggleButton onClick={toggleTheme}>
            {theme === darkTheme ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </ThemeToggleButton>
        </Header>
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
            maxLength={maxLength}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={handleKeyPress}
          />
          <CharCount remaining={maxLength - userInput.length}>
            {maxLength - userInput.length} Characters Remaining
          </CharCount>
          <SendButton onClick={handleSendMessage}>Send</SendButton>
        </InputContainer>
      </ChatContainer>
    </ThemeProvider>
  );
};

export default App;
