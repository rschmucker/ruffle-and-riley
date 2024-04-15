/**
 * Parent component that initializes UI and application logic.
 */
import React, { useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import '../../assets/css/LBTApp.css';
import Paper from '@mui/material/Paper';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import TASBox from './TASBox';
import useChat from './UseChat';
import LessonPage, { LessonTitle } from './../content/eukaryoticCells';


const LBTApplication = () => {
  const wikipediaContainerRef = useRef(null);

  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { chat, TASText, requestHelp, message, setMessage, sendMessage, chatLog } = useChat({ scrollToBottom });
  // scroll to top of content page
  const topRef = useRef(null);
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest"});
  };
  useEffect(scrollToTop, []);


  return (
    <div className="app-container">
      <div className="main-container">
        <div className="chat-container">
          <div className="parent-vertical">
            <Typography>Student Chat:</Typography>
            <Paper variant="outlined" sx={{display: 'flex', flexDirection:'column', border:'2px solid black', padding:"10px", overflowY:"auto", flexGrow:1}}>
              <ChatBox chat={chat} scrollToBottom={scrollToBottom} />
              <div ref={chatEndRef} />
            </Paper>
          </div>
          <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} chatLog={chatLog} />
          <TASBox text={TASText} requestHelp={requestHelp}/>
        </div>
        <div className="wikipedia-container" ref={wikipediaContainerRef}>
          <AppBar position="sticky" sx={{ backgroundColor: '#7B7D80' }}>
          <Toolbar>
            <div className="content_header">
            <Typography variant="h4">{LessonTitle}</Typography>
            </div>
          </Toolbar>
          </AppBar>
          <div className="contentarea-wrapper">
            <div ref={topRef} className="top-ref"/>
            <LessonPage />
            <div>
              <Box sx={{ mt: 12 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LBTApplication;
