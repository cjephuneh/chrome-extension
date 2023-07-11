import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  clientJoinCommunity,
  clientLeaveCommunity,
  getACommunity,
  resetJoinCommunityState,
  resetLeaveCommunityState
} from '../../redux/slice/community/communitySlice';
import { useDispatch, useSelector } from 'react-redux';
import Surveys from './surveys';
import Issues from './issues';
import { BackwardFilled, BackwardOutlined } from '@ant-design/icons';
import Communities from './communities';



const Community = ({selectedCommunity}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // const [user, setUser] = useState(null);
  const [showSurveys, setShowSurveys] =useState(false)
  const [showIssues, setShowIssues] = useState(false)
  const [showBack, setShowBack] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [selectedCommunityIssues, setSelectedCommunityIssues] = useState(null);




  // const getInfo = async () => {
  //   try {
  //     const value =  localStorage.getItem('user');
  //     return value !== null ? JSON.parse(value) : null;
  //   } catch (error) {
  //     return null;
  //   }
  // };

  // const setUserInfo = async () => {
  //   let userInfo = await getInfo();
  //   setUser(userInfo);
  // };

  // useEffect(() => {
  //   setUserInfo();
  // }, []);

  // const { community_id } = router.query;

  const { community, isCommunityLoading } = useSelector((state) => state.community);

  useEffect(() => {
    selectedCommunity && dispatch(getACommunity({ community_id: selectedCommunity }));
  }, [selectedCommunity, dispatch]);

  const handleJoinCommunity = () => {
    dispatch(
      clientJoinCommunity({
        client_id: user.id,
        community_id: selectedCommunity
      })
    );
  };

  

  const { joincommunity, isJoinCommunityLoading, isJoinCommunitySuccess, isJoinCommunityError, isJoinCommunityMessage } =
    useSelector((state) => state.community);

  useEffect(() => {
    if (isJoinCommunityError || isJoinCommunityMessage) {
      window.alert('Unable to join community', 'Please try again later');
    }

    if (joincommunity && isJoinCommunitySuccess) {
      dispatch(getACommunity({ community_id: selectedCommunity }));
    }

    dispatch(resetJoinCommunityState());
  }, [dispatch, isCommunityLoading, isJoinCommunitySuccess, isJoinCommunityError, isJoinCommunityMessage, joincommunity]);

  const handleLeaveCommunity = () => {
    dispatch(
      clientLeaveCommunity({
        client_id: user.id,
        community_id: selectedCommunity
      })
    );
  };

  const { leavecommunity, isLeaveCommunityLoading, isLeaveCommunitySuccess, isLeaveCommunityError, isLeaveCommunityMessage } =
    useSelector((state) => state.community);

  useEffect(() => {
    if (isLeaveCommunityError || isLeaveCommunityMessage) {
      window.alert('Unable to leave community', 'Please try again later');
    }

    if (leavecommunity && isLeaveCommunitySuccess) {
      dispatch(getACommunity({ community_id: selectedCommunity }));
    }

    dispatch(resetLeaveCommunityState());
  }, [dispatch, isCommunityLoading, isLeaveCommunitySuccess, isLeaveCommunityError, isLeaveCommunityMessage, leavecommunity, selectedCommunity]);

  const handleSurveyClick = () => {
    // Perform any necessary actions or processing related to the community
    setSelectedCommunityId(selectedCommunity);
    setShowSurveys(true);
  };


if (showSurveys){
    return <Surveys selectedCommunityId={selectedCommunityId} />
}

const handleIssuesClick = () => {
  setSelectedCommunityIssues(selectedCommunity)
  // Perform any necessary actions or processing related to the community
  setShowIssues(true);
};


if (showIssues){
  return <Issues selectedCommunityIssues={selectedCommunityIssues}/>
}

  const handleBack = () => {
    // Perform any necessary actions or processing related to the community
    setShowBack(true);
  };
  
  
  if (showBack){
    return <Communities />
  }


  return (
    <div className='flex-1 pt-8'>
      <button onClick={() => handleBack()} className='mb-4'>
            <BackwardOutlined name="chevron-back" size={24} color="black" />
         </button>
      <div className='relative'>{/* Image and other elements */}</div>

      <div className='mt-4 px-3 flex-1 justify-between mb-2'>
        {!community ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <div>
              <div className='space-y-1'>
                <h2 className='text-2xl text-center font-bold'>{community[0].tenant_id.tenant_name}</h2>
                <h2 className='text-gray-500 text-center'>{community[0].description}</h2>
              </div>

              <div className='flex-row space-x-4 items-center mt-4 mx-auto'>
                <div className='flex-row'>{/* Icon */}</div>

                <button className='flex-row space-x-2'>
                  <h2 className='font-semibold text-[#2DABB1]'>{community[0].members.length} members</h2>
                </button>
              </div>
              <div className='mt-4 flex-row justify-around'>
                <div className='items-center'>
                  <h2 className='font-semibold'>Community Rating</h2>
                  <h2>4.65</h2>
                </div>
                <div className='items-center'>
                  <h2 className='font-semibold'>Issues Resolved</h2>
                  <h2>56/100</h2>
                </div>
              </div>

              <button
               
                onClick={() => handleSurveyClick(selectedCommunity)}
                className='mt-8 items-center border border-[#2DABB1] rounded-full w-48 mx-auto py-2'
              >
                <h2 className='font-semibold text-[#2DABB1]'>Community Surveys</h2>
              </button>

              {user &&
                community[0].members.some((member) => member.email === user.email) && (
                  <button
                    disabled={isLeaveCommunityLoading}
                    onClick={() => handleLeaveCommunity(user.id)}
                    className='mt-3 items-center border border-red-500 rounded-full w-48 mx-auto py-2'
                  >
                    <h2 className='font-semibold text-red-500'>Leave Community</h2>
                  </button>
                )}
            </div>

            {user && community[0].members.some((member) => member.email === user.email) ? (
              <button
                className='bg-[#2DABB1] px-6 py-2 rounded-full'
                
                onClick={() => handleIssuesClick(selectedCommunity )}
                
              >
                <h2 className='text-white mb-2 font-semibold text-center'>View Community Issues</h2>
              </button>
            ) : (
              <button
                className='bg-[#2DABB1] px-6  mb-6 py-2 rounded-full'
                disabled={isJoinCommunityLoading}
                onClick={() => handleJoinCommunity(user.id)}
              >
                <h2 className='text-white font-semibold text-center'>Join Community</h2>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Community;
