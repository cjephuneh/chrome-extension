import React, { useState } from 'react';
import { styles } from './styles';
import Register from '../../components/Register';
import Chat from '../../components/Chat';

function EmailForm() {
  const [showChat, setShowChat] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleQuickChatClick = () => {
    setShowChat(true);
    setShowRegister(false);
  };

  const handleSecureChatClick = () => {
    setShowChat(false);
    setShowRegister(true);
  };

  if (showChat) {
    return <Chat />;
  }

  if (showRegister) {
    return <Register />;
  }

  return (
    <div
            style={{
                ...styles.emailFormWindow,
                ...{
                    height: '100%',
                    opacity: '1',
                }
            }}
            
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />


                 <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                

                <div style={styles.topText}>
                    Welcome to my <br /> support 👋
                </div>
          <div className="flex flex-col items-center -m-40">
            <button
              onClick={handleQuickChatClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Quickchat?
            </button>
            <button
              onClick={handleSecureChatClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              SecureChat?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailForm;
