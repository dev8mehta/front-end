import React, {useState} from 'react';
import './App.css';

function App() {
    const [inputValue, setInputValue] = useState('');

    const [messages, setMessages] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    };

    const handleSend = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, inputValue]);
            setInputValue(''); 
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };
    
  return (
    <div className="App">
        <h1 className='title'>ISOtope</h1>

        <div className='displayText'>
            {messages.length > 0 ? 
                (messages.map((message, index) => 
                (<p key={index} className="message-text">{message}</p>))) :
                (<p></p>)}
        </div>

        <div className='inputBubble'>
            <input 
            type="text" 
            placeholder="Ask a question!" 
            className="input-box"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            />
            <button className="send-button" onClick={handleSend}>Send</button>
        </div>

    </div>
  );
}

export default App;
