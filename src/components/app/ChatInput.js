/**
 * Implements input box for user to interact with..
 */
import React from "react";
import TextField from '@mui/material/TextField';

const ChatInput = ({ message, setMessage, sendMessage, chatLog }) => {
  const handlePaste = (e) => {
    // log paste actions
    const pastedData = e.clipboardData || window.clipboardData;
    const pastedText = pastedData.getData('text');
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    chatLog.current.paste.push({text: pastedText, date: time})
    e.preventDefault();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents the default action (new line)
      sendMessage(e); // Calls the sendMessage function
    }
  };

  return (
    <form onSubmit={sendMessage} className="parent-input">
    <TextField
      placeholder="type here"
      multiline
      minRows={2}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onPaste={handlePaste}
      onKeyPress={handleKeyPress}
      variant="outlined"
      sx={{
        marginTop: '10px',
        marginBottom: '10px',
        boxSizing: 'border-box',
        flex: 1,
        marginRight: '10px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#8F8F9D',
          },
          '&:hover fieldset': {
            borderColor: '#8F8F9D',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#8F8F9D',
          },
        },
        '& .MuiInputBase-inputMultiline': { // Target the internal textarea
          maxHeight: 'calc(1.1876em * 4 + 12px)', // 1.1876em is default line height for TextField, and 12px is default padding (top + bottom)
          overflowY: 'auto', // Allow vertical scrolling
        }
      }}
    />
      <button className="chat-button" type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
