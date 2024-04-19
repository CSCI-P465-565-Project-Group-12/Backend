import { useEffect, useState } from "react";
import "./Chat.css";
import { initializeApp } from "firebase/app";
import {
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import {
  DatabaseReference,
  get,
  getDatabase,
  off,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

interface IGroupChatProps {
  sender?: string;
  event?: string;
  members: string[];
}
// interface IMessage {
//   message: string;
//   sender: string;
//   timestamp: number;
// }
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const GroupChat: React.FC<IGroupChatProps> = (props) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [membersMap, setMembersMap] = useState<any>({});
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);
  useEffect(() => {
    const db = getDatabase();
    const eventRef: DatabaseReference = ref(
      db,
      `group-chats/${props.event}/members`
    );
    if (props.members) {
      get(eventRef).then((snapshot) => {
        if (!snapshot.exists()) {
          set(eventRef, props.members);
          const membersData: any = {};
          props.members.forEach((member) => {
            membersData[member] = member;
          });
          setMembersMap(membersData); // Update state here
        } else {
          const membersData: any = snapshot.val();
          setMembersMap(membersData); // Update state here
        }
      });
    }
    return () => {
      off(eventRef);
    };
  }, [props.members, props.event]);
  useEffect(() => {
    const db = getDatabase();
    const chatRoomRef = ref(db, `group-chats/${props.event}/messages`);

    // Listen for new messages in the chat room
    onValue(chatRoomRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        setMessages(messagesArray);
      }
    });
    return () => {
      off(chatRoomRef);
    };
  }, []);
  console.log(props.members);
  const sendMessage = () => {
    // Push the new message to the chat room
    const db = getDatabase();
    const chatRoomRef = ref(db, `group-chats/${props.event}/messages`);
    push(chatRoomRef, {
      message: message,
      sender: props.sender,
      timestamp: new Date().getTime(),
    }).then(() => {
      setMessage("");
    });
  };

  return (
    <div className="chat-container">
      <ConversationHeader>
        <ConversationHeader.Content userName="Group Chat" info={props.event} />
      </ConversationHeader>
      <MainContainer>
        {/* fill with one dummy sender and one reciver message */}
        <ChatContainer>
          <MessageList>
            {messages.map((msg, index) => (
              <>
                <Message
                  key={index}
                  model={{
                    message: msg.message,
                    direction:
                      props.sender === msg.sender ? "outgoing" : "incoming",
                    sender: msg.sender ? membersMap[msg.sender] : "",
                    position: "single",
                  }}
                />
                <span
                  style={{
                    color: "#caf0f8",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {/* {msg.sender ? `@${membersMap[msg.sender]}` : ""} */}
                  {props.sender === msg.sender ? "" : `@${msg.sender}`}
                </span>
              </>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={message}
            onChange={(text) => setMessage(text)}
            onSend={sendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default GroupChat;
