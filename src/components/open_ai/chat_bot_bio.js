/**
 * Implements prompts and logic underlying the two conversational agents.
 */
import llmQuery from './llm_querry';
import { eukaryoticCellText, eukaryoticCellTopicsExp } from '../content/eukaryoticCellText';


// student agent instructions
const STUDENT_DETAILED_INST = "Ask the user (who is the teacher) to teach you the material, little by little. If the teacher gives an answer, you must (a) show appreciation and summarize answer; (b) insert [SMILE]; and then (c) ask a follow-up question that does not give the solution away if the teacher has not touched all facts about the current topic OR ask a question about the next topic. Do not move on to the next topic or fact before getting an answer for your current question. Do not ask follow-up questions about facts that are not on the list or the teacher has explained in a prior response. If the teacher doesn’t know something, tell the teacher you will be thrilled if the teacher can check it and get back to you. If the teacher still doesn’t know encourage them to request help from the professor. Focus on learning by very small portions, so ask short questions, and ask questions that require short answers. You do not know anything other than what the user teaches you. You never say that the teacher is not correct, but you might say you are not sure if their answer is correct. You do not know anything that the teacher does not know. When all the topics are covered, thank the teacher, say I've asked all the questions I want to learn. Remember to add transitional words when asking questions. All responses must use the following format: \"\"\" Student (to the teacher): [what the student says]\"\"\"";
export const STUDENT_OPENING_SENTENCE = "Student (to the teacher): Nice to meet you, Teacher! I am Ruffle. Thank you so much for helping me study biology. I love to learn!";


function prepStudentBaseString() {
  const baseString = "You are an enthusiastic 18-year-old student who is trying to learn. You need the user (who is a teacher) to teach you all topics in the material. You have access to a list of topics and facts that the teacher needs to convey to you, but not to the material itself. You must learn one topic at a time, never more than that. This is the list of topics and facts you found from the internet that you need the user to slowly teach you (in order):\n" + eukaryoticCellTopicsExp;
  return baseString;
}

// ta supervisor instructions
const DELIMITER = "####";
const TAS_HELP = "Teacher (privately to professor): Hi Professor, I need help answering the student's question. Please share some advice.";

function prepTASHelpString() {
  const tasHelp = `You are a friendly and encouraging biology professor who supervises interactions between a new teacher and an 18-year old student.
You only provide brief advice to the teacher and always keep things positive.

The material the teacher needs to explain is delimited by four hashtags and you must not refer to any information that is not explained in the material.

Material: ${DELIMITER} ${eukaryoticCellText} ${DELIMITER}

In their most recent response the teacher addressed you directly for help. Formulate a polite and brief comment for the teacher's with a hint to help the teacher answer the student's question.

Use the following format:
Comment for teacher: <comment for teacher>`;
  return tasHelp;
}

function prepareMisconceptionInst() {
  const misconInst = `You are a friendly and encouraging biology professor who supervises interactions between a new teacher and an 18-year old student.
You only provide brief advice to the teacher and always keep things positive.

The material the teacher needs to explain is delimited by four hashtags and you must not refer to any information that is not explained in the material.

Material: ${DELIMITER} ${eukaryoticCellText} ${DELIMITER}

You detected some incorrect information or a typo in the teacher's most response. Formulate a polite and brief comment for the teacher's to point it out and ask the teacher to revise their response.

Use the following format:
Comment for teacher: <comment for teacher>`;
  return misconInst;
}


function detectedMisconception(string) {
  if (string.includes("contains factually incorrect information: ")) {  // check if relevant comment
    const splits = string.split("contains factually incorrect information: ");
    string = splits[1];
    if (string.includes("YES")) {  // check if misconception detected
      return true;
    }
  }
  return false;
};


// initial user response to guide bot
export const USER_OPENING_SENTENCE = "Teacher (to the student): Hi Ruffle, I am happy to teach you! What would you like to learn about?";

class ChatBot {
  constructor() {
    this.msg_list = [];
  }

  prepareMisconceptionEvalMessage() {
    let questionText = this.msg_list[this.msg_list.length - 2].content;
    let answerText = this.msg_list[this.msg_list.length - 1].content;
    let evalMsg = `You are a professor that evaluates whether a teacher's answer to a student's question contains factually incorrect information. You do not count typos as incorrect information. Fully irrelevant responses are counted as incorrect.
  
  The student's question and the teacher's answer are provided below, each delimited by four hashtags:

  Student Question: ${DELIMITER} ${questionText} ${DELIMITER}

  Teacher Answer: ${DELIMITER} ${answerText} ${DELIMITER}
  
  Use the following format:
  Teacher answer contains factually incorrect information: <YES or NO>`;

    // prepare for send
    let messages = [
      { role: "user", content: evalMsg }
    ];
    return messages;
  }

  prepareStudentMessages() {
    let messages = [
      { role: "system", content: prepStudentBaseString("Biology") },
      { role: "system", content: STUDENT_DETAILED_INST },
      { role: "user", content: "Teacher (to the student): Hi there! I'm happy to help you learn. What would you like to know?" },
    ];

    for (let msg of this.msg_list) {
      const entry = { role: msg.role, content: msg.content };
      messages.push(entry);
    }

    return messages;
  }

  prepareTASHelpMessages() {
    let messages = [
      { role: "system", content: prepTASHelpString("Biology") },
    ];
    for (let msg of this.msg_list) {
      const entry = { role: "user", content: msg.content };
      messages.push(entry);
    }
    messages.push({ role: "user", content: TAS_HELP });
    return messages;
  }

  prepareTASRevisionMessages() {
    let messages = [
      { role: "system", content: prepareMisconceptionInst("Biology") },
    ];
    for (let msg of this.msg_list) {
      const entry = { role: "user", content: msg.content };
      messages.push(entry);
    }
    return messages;
  }

  addToMsgList(message) {
    this.msg_list.push(message);
  }

  removeFromMsgList() {
    this.msg_list.pop();
  }

  async callStudentLLM() {
    const messages = this.prepareStudentMessages();
    return llmQuery(messages).then((result) => {
      const msg = result;
      const splitMsg = msg.content.split("[SMILE]");

      for (let i = 0; i < splitMsg.length; i++) {
        if (splitMsg[i] === "") {
          splitMsg.splice(i, 1);
        }
      }

      // add "Student (to the teacher): " to each msg except the first one
      for (let i = 1; i < splitMsg.length; i++) {
        splitMsg[i] = "Student (to the teacher):" + splitMsg[i];
      }
  
      const m = { role: msg.role, content: msg.content };
      this.addToMsgList(m);
      return splitMsg;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Sorry, please try to talk to me again.";
    });
  }

  async callTASMisconception() {
    const messages = this.prepareMisconceptionEvalMessage();
    return llmQuery(messages).then((result) => {
      return detectedMisconception(result.content);
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
  }

  async callTASRevision() {
    const messages = this.prepareTASRevisionMessages();
    return llmQuery(messages).then((result) => {
      return result.content;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "There might be a mistake in your response. Please double check with the lesson material.";
    });
  }

  async callTASHelp() {
    const messages = this.prepareTASHelpMessages();
    return llmQuery(messages).then((result) => {
      return result.content;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Sorry, but I don't have something to share at this moment.";
    });
  }
}

export default ChatBot;
