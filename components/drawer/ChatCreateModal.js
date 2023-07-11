import { useState } from 'react';
import { Modal } from 'react-modal';
import { useEffect } from 'react';
import { getCommunities } from '../../redux/slice/community/communitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, resetChatState, retrieveChats } from '../../redux/slice/chat/chatSlice';
import { useRouter } from 'next/router';
import { Backdrop } from '@mui/material';
import { BiGroup, BiSearchAlt } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';
import Chat from '../react/chat';

const ChatCreateModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // show search bar
  const [showSearch, setShowSearch] = useState(false);

  // fetch data from store
  const { communities, isCommunitiesLoading, isCommunitiesSuccess } = useSelector((state) => state.community);
  const { chats } = useSelector((state) => state.chat);
  const [showChat, setShowChat] = useState(false)

  // filter communities to make sure the ones with created chats are not displayed
  const communitiesToDisplay = communities?.filter((community) => (
    !chats?.some((cht) =>
      cht.tenant_id.tenant_id === community.tenant_id.tenant_id
    )
  ));
    // 
    useEffect(() => {
        // fetch Communities
        dispatch(getCommunities())
    }, [dispatch])

    // create chat
    const createClientChat = (tenantId) => {
        dispatch(createChat({
            tenant_id: tenantId,
            chat_owner: user.id,
            client_satisfaction: true,
        }))
    }

    // fetch data to track chat creation
    const { chat, isChatLoading, isChatSuccess, isChatError, isChatMessage } = useSelector((state) => state.chat)

    // check if chat was created and navigate
    useEffect(() => {
        console.log(chat)
        if(isChatError || isChatMessage){
            window.alert('Failed', 'Unable to create chat. Please try again later')
        }

        if (isChatSuccess && chat) {
          // fetch new chats
          dispatch(retrieveChats({ chat_owner: user.id }));
          // navigate to chat
          setShowChat({ chat_id: chat.chat_id });
        }

        // reset state values
        dispatch(resetChatState())
    }, [dispatch, isChatSuccess, chat, router, isChatError, isChatMessage])

    // handle search 
    const [searchText, setSearchText] = useState('')

    const filteredOrgs = communitiesToDisplay?.filter(item =>
        item.tenant_id.tenant_name.toLowerCase().includes(searchText.toLowerCase())
      )

      if (showChat) {
        return <Chat />;
      }
    

  return (
    // <Modal isOpen={showModal} onRequestClose={() => setShowModal(!showModal)}>
      <div className="flex-1 bg-white">
        {/* Nav */}
        <div className="flex-row items-center border-b border-gray-200 p-2">
          <div className="flex-1 flex-row gap-4 items-center">
            <button onClick={() => setShowModal(!showModal)}>
              <Backdrop name="arrow-back" size={24} color="black" />
            </button>

            <div className="flex-1">
              {showSearch ? (
                <input
                  placeholder="Search organizations"
                  className="py-[5px] border-gray-100"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              ) : (
                <>
                  <h3 className="font-semibold">Select organization</h3>
                  <p className="text-sm text-gray-500">
                    {communitiesToDisplay && communitiesToDisplay.length} Organizations
                  </p>
                </>
              )}
            </div>
          </div>

          <button onClick={() => setShowSearch(!showSearch)} className="ml-2">
            <BiSearchAlt name="search" size={24} color="black" />
          </button>
        </div>

        {/* communities */}
        <div className="px-3 mt-4 space-y-3" style={{ maxHeight: '100%', overflowY: 'auto' }}>
          {isCommunitiesLoading ? (
            <p>Loading...</p>
          ) : (
            filteredOrgs?.length > 0 ? (
              filteredOrgs.map((community, i) => (
                <button
                  disabled={isChatLoading}
                  key={i}
                  onClick={() => createClientChat(community.tenant_id.tenant_id)}
                  className="flex-row items-center gap-3 bg-gray-200 py-2 mt-2 mx-1 rounded"
                >
                  <BiGroup name="groups" size={24} color="#2DABB1" />
                  <div>
                    <p>{community.tenant_id.tenant_name}</p>
                    <p className="text-gray-500 text-xs">
                      {community.description.length > 40 ? `${community.description.slice(0, 40)}...` : community.description}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic">
                No organizations found.
              </p>
            )
          )}
        </div>
      </div>
    
  );
};

export default ChatCreateModal;
