/**
 * Implements the dialog management between user, student and professor agents.
 */
import { useState, useRef, useEffect } from "react";
import ChatBot, { STUDENT_OPENING_SENTENCE, USER_OPENING_SENTENCE } from "../open_ai/chat_bot_bio.js";
import { WritingAnimationStudent, WritingAnimationProfessor } from '../misc/writingAnimation.js';
import Typewriter from '../misc/Typewriter';

const chatBot = new ChatBot();
const supervisorString = `Please help the student learn the material.`;

function splitString(string) {
  const splits = string.split("teacher): ");
  if (splits.length > 1) {
    return splits[1];
  } else {
    const splits = string.split("teacher: ");
    if (splits.length > 1) {
      return splits[1];
    } else {
      return string;
    }
  }
};


async function studentWorkflow(chatLog, setChat) {
  // save student LLM message
  setChat((prevChat) => [
    ...prevChat,
    { text: <WritingAnimationStudent />, type: "student", waiting: true },
  ]);
  const student_responses = await chatBot.callStudentLLM();
  // loop through student responses
  for (let i = 0; i < student_responses.length; i++) {
    const student_response = student_responses[i];
    let t3 = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    chatLog.current.main.push({text: student_response, type: "student", date: t3});
    setChat((prevChat) => [
      ...prevChat.slice(0, -1),
        { text: splitString(student_response), type: "student", waiting: false }
    ]);
    await new Promise((resolve) => setTimeout(resolve, 2200));
    // if it is not the last response, delay for 1 second
    if (i < student_responses.length - 1) {
      setChat((prevChat) => [
        ...prevChat,
        { text: <WritingAnimationStudent />, type: "student", waiting: true },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};


const useChat = ({ scrollToBottom }) => {
  const [message, setMessage] = useState("");
  const [removeMarker, setMarker] = useState(false);
  const [sendActive, setSend] = useState(false);
  const [chat, setChat] = useState([{ text: splitString(STUDENT_OPENING_SENTENCE), type: "student", waiting: false }]);
  const [TASText, setTASText] = useState(supervisorString);
  const didRun = useRef(false);
  let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const chatLog = useRef({
    main: [{text: USER_OPENING_SENTENCE, isUser: true, date: time}],
    help: [],
    supervisor: [{text: supervisorString, date: time}],
    paste: [],
  });

  useEffect(() => {
    const initChat = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setChat((prevChat) => [
          ...prevChat,
          { text: <WritingAnimationStudent />, type: "student", waiting: true },
        ]);
        const response = await chatBot.callStudentLLM();
        let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
        chatLog.current.main.push({text: response, type: "student", date: time});
        setChat((prevChat) => [
          ...prevChat.slice(0, -1),
          { text: splitString(response[0]), type: "student", waiting: false }
        ]);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSend(true);
      }
      catch (error) {
        console.error('Error fetching data:', error);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSend(true);
      }
    };
    if (!didRun.current) {
      initChat();
      didRun.current = true;
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (sendActive && (message.trim() !== "")) {  // add new user message to chain
      setSend(false);
      if (removeMarker) {
        setChat((prevChat) => [
          ...prevChat.slice(0, -2),
          { text: message, type: "user", misconception: false },
        ]);
        setMarker(false);
      } else {
        setChat((prevChat) => [ 
          ...prevChat,
          { text: message, type: "user", misconception: false },
        ]);
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
      setMessage("");
      // save user message
      let t1 = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      chatLog.current.main.push({text: "Teacher (to the student): " + message, isUser: true, date: t1});
      const msg = { role: "user", content: "Teacher (to the student): " + message };
      chatBot.addToMsgList(msg);

      // check for misconception
      const misconception = await chatBot.callTASMisconception();
      if (misconception) {
        setTASText(<WritingAnimationProfessor />);
        const teacher_response = await chatBot.callTASRevision();
        let t2 = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
        chatLog.current.supervisor.push({text: teacher_response, date: t2, misconception: misconception});
        // enter revision request workflow 
        chatBot.removeFromMsgList() // remove prior message from bot logic
        setChat((prevChat) => [ 
          ...prevChat.slice(0, -1),  // remove only the last element
          { text: prevChat[prevChat.length - 1].text, type: "user", misconception: true },
          { text: "Revision required", type: "alert" },
        ]);      
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTASText(<Typewriter text={splitString(teacher_response)} scroll={scrollToBottom} className="professor-alert" />);
        setMessage(message);
        setMarker(true); // mark message for removal
      } else {
        // move conversation forward
        setTASText(supervisorString);
        await studentWorkflow(chatLog, setChat);
        setMarker(false);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSend(true);
    }
  };

  const requestHelp = async (e) => {
    e.preventDefault();
    setTASText(<WritingAnimationProfessor />);
    const teacher_response = await chatBot.callTASHelp();
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    chatLog.current.help.push({text: teacher_response, date: time});
    setTASText(<Typewriter text={splitString(teacher_response)} scroll={scrollToBottom} className="professor-message" />);
  }

  return { chat, TASText, requestHelp, message, setMessage, sendMessage, chatLog };
};

export default useChat;
