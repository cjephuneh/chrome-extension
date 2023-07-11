import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveChats } from '../../redux/slice/chat/chatSlice';
import Chats from './chat';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import ChatCreateModal from '../drawer/ChatCreateModal';
import Home from './home';
import { BackwardFilled, BackwardOutlined } from '@ant-design/icons';


const Inbox = () => {
  const dispatch = useDispatch();
  const { chats, isChatsLoading, isChatsSuccess } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [availableChats, setChats] = useState([]);
  const [searchChat, setSearchChat] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null); // Update the initial state to null

  const filteredChats = availableChats.filter((item) =>
    item.tenant_id.tenant_name.toLowerCase().includes(searchChat.toLowerCase())
  );

  useEffect(() => {
    dispatch(retrieveChats({ chat_owner: user.id }));
  }, [dispatch, user]);

  useEffect(() => {
    if (isChatsSuccess && chats !== null) {
      setChats(chats);
    }
  }, [isChatsSuccess, chats]);

  const handleChatClick = (chat_id) => {
    setSelectedChat(chat_id);
    setShowChats(true);
  };

  if (showChats) {
    return <Chats  />;
  }

  const handleBack = () => {
    setShowBack(true);
  };

  if (showBack) {
    return <Home />;
  }

  return (
    <div className='pt-8 flex-1 bg-gray-200 rounded-lg px-3 relative h-full'>
      <button onClick={() => handleBack()} className='mb-4'>
        <BackwardOutlined name='chevron-back' size={24} color='black' />
      </button>
      <div className='flex-row space-x-3 items-center'></div>

      <div className='flex-row items-center justify-between mt-3'>
        <h1 className='text-2xl font-bold'>Inbox</h1>
      </div>

      <div className='space-y-3 flex-1'>
        <div className='space-y-3'>
          <div data-testid='unread-chats' className='space-y-4 mt-3'>
            {isChatsLoading ? (
              <h2>Chats loading...</h2>
            ) : isChatsSuccess && chats && filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div
                  onClick={() => handleChatClick(chat.chat_id)} // Pass the chat_id as an argument to handleChatClick
                  key={chat.chat_id}
                  className='flex flex-col space-y-2 items-start cursor-pointer overflow-x-auto'
                >
                  <div className='flex-1'>
                    <h2 className='font-semibold'>{chat.tenant_id.tenant_name}</h2>
                  </div>
                </div>
              ))
            ) : (
              <h3 className='text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic'>
                No chats available
              </h3>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowChat(true)} // Update the onClick handler to setShowChat(true)
        className='absolute bottom-6 right-6 bg-[#2DABB1] w-12 h-12 rounded-full p-2 items-center justify-center'
      >
        <MessageOutlined name='message-reply-text' size={40} color='white' />
      </button>
    </div>
  );
};

export default Inbox;
