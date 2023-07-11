import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { retrieveChats } from '../../redux/slice/chat/chatSlice';
import { useRouter } from 'next/router';
import { FiSearch, FiPlus, FiSend, FiX } from 'react-icons/fi';
import { ReconciliationFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';


export default function Inbox  () {
  const dispatch = useDispatch()
  const router = useRouter()
  
  // manage chat create modal
  const [showModal, setShowModal] = useState(false)

    const { chats, isChatsLoading, isChatsSuccess } = useSelector((state) => state.chat)

    const { user } = useSelector((state) => state.auth)

    const [availableChats, setChats] = useState([])
    const [searchChat, setSearchChat] = useState('')

    // const searchFilterFunction = (text) => {
    //   // setSearchChat(text);
    //   console.log(text)
    //   // if(!text) {
    //   //   setSearchChat(text);
    //   //   setChats(chats) // Reset to original communities when the search field is empty
    //   //   return
    //   // }
      

    //   const newData = availableChats.filter(item => {
    //     const tenantName = item.tenant_id.tenant_name ? item.tenant_id.tenant_name.toLowerCase() : ''
    //     const searchData = text.toLowerCase()

    //     console.log(tenantName)

    //     return tenantName.indexOf(searchData) > -1
    //   })
    //   console.log(newData)

    //   setChats(newData)
    //   setSearchChat(text)
    // }
    const filteredChats = availableChats.filter(item =>
      item.tenant_id.tenant_name.toLowerCase().includes(searchChat.toLowerCase())
    )

    useEffect(() => {
      dispatch(retrieveChats({chat_owner: user.id}))
    }, [dispatch, router])

    // update chats state
    useEffect(() => {
      if(isChatsSuccess && chats !== null){
          setChats(chats)
      }
  }, [isChatsSuccess, chats])

  return (
    <div className='pt-8 flex-1 bg-white px-3 relative h-full'>
      {/* <ChatCreateModal showModal={showModal} setShowModal={setShowModal} /> */}
      <div className='flex-row space-x-3'>
        {/* <div className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            {/* <EvilIcons name="search" size={24} color="black" /> 
            <input
              placeholder='Search chats'
              value={searchChat}
              onChangeText={(text) => setSearchChat(text)}
             />
        </div> */}
        <button
            activeOpacity={0.9}
            onPress={() => router.openDrawer()}
            testID='profile-pic'
        >
            <img source={require('../../assets/user.png')} />
        </button>
      </div>

      <div className='flex-row items-center justify-between mt-6'>
        <h1 className='text-2xl font-bold'>Inbox</h1>
        <h2 className='text-xl font-bold bg-[#2DABB1] text-white px-5 py-1 text-center rounded-full'>Chat</h2>
      </div>

      <div className='space-y-3 flex-1' showsVerticalScrollIndicator={false}>
        <div className='space-y-3'>
          {/* <Text className='mt-4 mb-2 font-bold text-lg'>
            Unread - 
          <Text testID='unread-chats-count'>{data.filter(dt => dt.read === false).length}</Text>
          </Text> */}
          <div testID='unread-chats' className='space-y-3 mt-3'>
          {
            isChatsLoading ? <h3>Chats loading...</h3> :

            ( isChatsSuccess && chats &&
              filteredChats.length > 0 ?
              filteredChats.map((chat) => (
                <button
                    onPress={() => navigation.navigate('chat', { chat_id: chat.chat_id })} 
                    key={chat.chat_id}
                    className='flex-row space-x-2 items-center'
                    testID='open-chat'
                >
                    {/* <Image source={require('../assets/user.png')} /> */}
                    {/* <Octicons name="organization" size={24} color="#2DABB1" /> */}
                    <div className='flex-1'>
                        <h2 className='font-semibold'>{chat.tenant_id.tenant_name}</h2>
                        {/* <Text className='font-bold'>{message.subject}</Text> */}
                        {/* <Text>{message.message.length > 30 ? message.message.slice(0, 30)+'...' : message.message}</Text> */}
                    </div>
                    {/* <Text>{message.time}</Text> */}
                </button>
            )) :
            <h2 className='text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic'>No chats available</h2>
            )
          }
          </div>
        </div>
      </div>
      <button onPress={() => setShowModal(!showModal)} className='absolute bottom-6 right-6 bg-[#2DABB1] w-12 h-12 rounded-full p-2 items-center justify-center'>
        <ReconciliationFilled name="message-reply-text" size={35} color="white" />
      </button>
    </div>
  )
}









export default function CreateIssue () {
    // const tagsData = [
    //     'milk',
    //     'food',
    //     'general'
    // ]

    const organizations = [
      {
        title: '18th Street Brewery',
        location: 'Dakley Avenue, Hammond, IN'
      },
      {
          title: '16th Street',
          location: 'Brooklyn, NY'
      },
      {
          title: '169th Street',
          location: 'Brooklyn, NY'
      },
      {
          title: '18th Street Brewery',
          location: 'Dakley Avenue, Hammond, IN'
      },
      {
          title: '16th Street',
          location: 'Brooklyn, NY'
      },
      {
          title: '169th Street',
          location: 'Brooklyn, NY'
      },
    ]

    const [selectedOrg, setSelectedOrg] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [issueTitle, setIssueTitle] = useState(null)
    const [issueDescription, setIssueDescription] = useState(null)
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState('')

    const filteredOrgs = organizations.filter(org => org.title.toLowerCase().includes(searchText.toLowerCase()))

    const createIssue = () => {
      if(!selectedOrg || !issueTitle || issueDescription){
        Alert.alert('Missing details','Please fill out the required details')
        return;
      }
    }
  return (
    <div className='pt-8 px-3'>
      <h1 className='text-2xl font-bold text-center'>Create an issue</h1>

      <div className='mt-3 flex-row space-x-3 items-center'>
        <img source={require('../../assets/user.png')} />
        <h2 className='font-semibold text-lg'>Kevin Kimani</h2>
      </div>

      {/* <div className='space-y-3' behavior='height'>
        <div className='flex-row items-center mt-3 space-x-3 bg-gray-200 px-2 py-1 rounded'>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
                className='flex-1'
                placeholder='Search Organization'
                value={searchText}
                onChangeText={text => setSearchText(text)}
            />
        </View> */}

        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            filteredOrgs.map(org => (
              <TouchableOpacity key={filteredOrgs.indexOf(org)} onPress={() => {
                  setSelectedOrg(org.title)
                  setSearchText(org.title)
                }} activeOpacity={0.9} className='px-2 py-1 bg-gray-200 mx-1 rounded'>
                  <Text>{org.title}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView> */}

        {/* {
          selectedOrg &&

          <TouchableOpacity activeOpacity={0.9} className='relative bg-[#2DABB1] px-4 py-2 font-semibold text-white self-start rounded'>
            <Text className='font-semibold text-white'>{selectedOrg}</Text>
            <TouchableOpacity className='absolute right-0 top-0' activeOpacity={0.9} onPress={() => setSelectedOrg(null)}>
              <Entypo name="cross" size={18} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        } */}

        <input
            className='bg-gray-200 px-4 py-2 rounded'
            placeholder='Add a title for your issue'
            value={issueTitle}
            onChangeText={text => setIssueTitle(text)}
        />

        <input
            multiline={true}
            numberOfLines={3}
            className='bg-gray-200 px-4 py-2 rounded'
            placeholder='Add a description for your issue'
            style={{
              maxHeight: 90,
              height: 'auto',
            }}
            textAlignVertical='top'
            value={issueDescription}
            onChangeText={text => setIssueDescription(text)}
        />

        <p>Add tags for your issue to make it easy to find</p>

        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row gap-2 flex-wrap'>
            {
                tags.map((tag, i) => (
                  <View key={i} className='bg-gray-200 flex-row items-center rounded'>
                      <Text className= 'px-2 py-1 rounded font-semibold'>{tag}</Text>
                      <TouchableOpacity activeOpacity={0.9} className='p-1' onPress={() => setTags(tags.filter(tg => tg !== tag))}>
                        <MaterialCommunityIcons name="delete" size={16} color="red" />
                      </TouchableOpacity>
                  </View>
                ))
            }
        </ScrollView> */}

        <div className='space-y-3'>
          <div className='flex-row items-center gap-3'>
            <input
                className='flex-1 bg-gray-200 px-4 py-2 rounded'
                placeholder='Add your issue tag here'
                value={tag}
                onChangeText={text => setTag(text)}
            />
            <button disabled={tag === ''} activeOpacity={0.9} onPress={() => setTags([...tags, tag])} className='p-2 bg-[#2DABB1] rounded'>
              <FiPlus name="plus" size={24} color="white" />
            </button>
          </div>
        </div>

        

        <button activeOpacity={0.9} onPress={() => createIssue()} className='flex-row space-x-2 items-center bg-[#2DABB1] self-start px-4 py-2 rounded-full mt-2'>
            <p className='text-white font-semibold'>Send</p>
            <FiSend name="send" size={16} color="white" />
        </button>
      </div>
    // </div>
  )
}



export default function CompanyLocation  () {
    const router = useRouter();
  
    return (
      <div className="flex-1 pt-8 px-3 relative">
        <button
          onClick={() => router.push('/company')}
          className="absolute top-12 left-6 z-10"
        >
          <AiOutlineClose size={24} color="black" />
        </button>
        <div className="h-2/3 bg-gray-300 rounded-t-xl" />
        <div className="-mt-8 ml-4 shadow-lg bg-white w-[150px] rounded">
          <Image
            src="/company.png"
            alt="Company Logo"
            width={150}
            height={100}
            className="w-[150px] h-[100px]"
          />
          <div className="p-1">
            <h2 className="font-bold">Maziwa Industries LTD</h2>
            <p className="text-sm text-gray-500">Nairobi, Kenya</p>
            <div className="flex flex-row space-x-2">
              <AiFillStar size={18} color="yellow" />
              <span className="font-bold">4.65</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
