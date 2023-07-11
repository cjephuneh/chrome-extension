import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  retrieveMessages,
  sendMessage,
} from "../../redux/slice/chat/chatSlice";
import { IoIosSend } from "react-icons/io";
import { CloseCircleOutlined } from "@ant-design/icons";
import { IoPerson } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import Inbox from "./inbox";
// import { GrSend } from "react-icons/gr";
import { BackwardFilled, BackwardOutlined } from '@ant-design/icons';


const Chat = ({ selectedChat }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  // // retrieve chat_id from route
  const { chat_id } = router.query

  // retrieve messages
  useEffect(() => {
    selectedChat && dispatch(retrieveMessages( selectedChat ));
  }, [selectedChat, dispatch]);

  // retrieve data from store
  const { chatMessages, isChatMessagesLoading, isChatMessagesSuccess } =
    useSelector((state) => state.chat);

  const [message, setMessage] = useState(null);
                  
  const [showBack, setShowBack] = useState(false);


  const scrollViewRef = useRef();

  // send a message
  const sendClientMessage = () => {
    let trimmedMessage = message.trim();
    // setMessages([...messages, {
    //     message: trimmedMessage,
    //     sender: 'Me',
    //     typing: false
    // }])
    // setMessage(null)
    if (trimmedMessage.length === 0) return;

    dispatch(
      sendMessage({
        chat_id,
        text_content: trimmedMessage,
        voice_content: "",                
        message_sender: "client",
        escalated: "",
        channel: "Mobile",
        topic: "",
      })
    );

    setMessage(null);
  };


  const handleBack = () => {
    // Perform any necessary actions or processing related to the community
    setShowBack(true);
  };
  
  
  if (showBack){
    return <Inbox />
  }


  return (
    <div className="flex flex-col h-screen">
       <button onClick={() => handleBack()} className='mb-4'>
            <BackwardOutlined name="chevron-back" size={24} color="black" />
         </button>
      <div className="flex-1 bg-white pt-8 px-3 relative">
        <div className="flex-row items-center justify-between">
          {/* <button data-testid="close-button" onClick={handleInboxClick}>
            <CloseCircleOutlined name="close" size={24} color="black" />
          </button> */}
          {/* <IoPerson name="person-add-outline" size={24} color="black" /> */}
        </div>

        <div behavior="height" className="flex-1 w-full">
          <div
            // ref={scrollViewRef}
            // onContentSizeChange={() =>
            //   scrollViewRef.current.scrollToEnd({ animated: true })
            // }
            className="mt-3 space-y-2 relative mb-2 flex-1"
          >
            {isChatMessagesLoading ? (
              <h2>Loading messages...</h2>
            ) : (
              isChatMessagesSuccess &&
              chatMessages &&
              // sort the messages
              [...chatMessages]
                .sort((a, b) => a.message_id - b.message_id)
                .map((message, index) => (
                  <h2
                    key={index}
                    className={
                      message.message_sender === "client"
                        ? "bg-[#2DABB1] px-4 py-2 rounded text-white w-fit self-end"
                        : "bg-gray-300 px-4 py-2 rounded text-black w-fit self-start"
                    }
                  >
                    {message.text_content}
                  </h2>
                ))
            )}
          </div>

              
          <div className="my-9 flex-row items-end">
            <div className="flex flex-1 items-center border border-gray-300 px-4 py-2 rounded-md">
              <input
                placeholder="Type your message"
                className="flex-1 outline-none"
                multiline
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                // style={{
                //     maxHeight: 90,
                //     height: 'auto'
                // }}
                data-testid="message-input"
              />
              {/* <button activeOpacity={0.9}  onPress={recording ? stopRecording : startRecording} className={message ? 'hidden' : 'pl-2'}>
                    <FontAwesome name="microphone" size={24} color="#2DABB1" />
                </button>  */}
              <button
                data-testid="send-btn"
                disabled={!message}
                onClick={() => sendClientMessage()}
                className="px-2 py-1"
              >
                <FiSend name="send" size={24} color="#2DABB1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
