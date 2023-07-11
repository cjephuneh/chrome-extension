import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GrFormUpload, GrObjectGroup } from 'react-icons/gr';
import { GroupOutlined, HolderOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import Community from '../../components/react/community';
import { IoPeople } from 'react-icons/io5';
import {
  addOrRemoveFromFavs,
  getCommunities,
  resetAddOrRemoveFromFavs,
  retrieveFavoriteCommunities
} from '../../redux/slice/community/communitySlice';
import Home from './home';
import { BackwardFilled, BackwardOutlined } from '@ant-design/icons';



const Communities = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { communities, isCommunitiesLoading, isCommunitiesSuccess } = useSelector((state) => state.community);
  const { user } = useSelector((state) => state.auth);

  const [availableCommunities, setCommunities] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [showCommunity, setShowCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showBack, setShowBack] = useState(false);


  const filteredOrgs = availableCommunities?.filter((item) =>
    item.tenant_id.tenant_name.toLowerCase().includes(searchWord.toLowerCase())
  );

  useEffect(() => {
    // fetch Communities
    dispatch(getCommunities());
    dispatch(retrieveFavoriteCommunities({ client_id: user.id }));
  }, [dispatch, user.id]);

  useEffect(() => {
    // update communities state
    if (isCommunitiesSuccess && communities !== null) {
      setCommunities(communities);
    }
  }, [isCommunitiesSuccess, communities]);

  useEffect(() => {
    // fetch favorite communities from store
    if (isCommunitiesSuccess && communities !== null) {
      dispatch(retrieveFavoriteCommunities({ client_id: user.id }));
    }
  }, [dispatch, isCommunitiesSuccess, communities, user.id]);

  const { favoritecommunities, isFavoriteCommunitiesLoading, isFavoriteCommunitiesSuccess } = useSelector(
    (state) => state.community
  );

  const isFavoriteCommunity = (community) => {
    return favoritecommunities?.some((favoriteCommunity) => favoriteCommunity.community_id === community.community_id);
  };

  const handleFavoriteCommunities = (communityId) => {
    dispatch(
      addOrRemoveFromFavs({
        client_id: user.id,
        community_id: communityId,
      })
    );
  };

  useEffect(() => {
    // take action based on data return from adding or removing a community to favorites
    if (isFavoriteCommunitiesSuccess && favoritecommunities) {
      dispatch(retrieveFavoriteCommunities({ client_id: user.id }));
    }

    return () => {
      dispatch(resetAddOrRemoveFromFavs());
    };
  }, [dispatch, isFavoriteCommunitiesSuccess, favoritecommunities, user.id]);

  const handleCommunityClick = (communityId) => {
    setSelectedCommunity(communityId);
    console.log(communityId)
    setShowCommunity(true);
  };

  if (showCommunity) {
    // console.log(selectedCommunity)
    return <Community selectedCommunity={selectedCommunity} />;
  }

  const handleBack = () => {
    // Perform any necessary actions or processing related to the community
    setShowBack(true);
  };
  
  
  if (showBack){
    return <Home />
  }



    return (
        <div className='flex-1 bg-white pt-8 px-3'>
          <button onClick={() => handleBack()} className='mb-4'>
            <BackwardOutlined name="chevron-back" size={24} color="black" />
         </button>
          <h1 className='text-2xl font-bold mt-2'>Find a community</h1>
          <div className='mt-4'>
            <input
              type='text'
              className='border p-2 rounded w-96'
              placeholder='Search communities'
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </div>
          {isCommunitiesLoading ? (
            <p>Loading communities...</p>
          ) : (
            <div className='mt-6'>
              {filteredOrgs.map((community) => (
                <div key={community.community_id} className='flex items-center mb-4'>
                  <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-4'>
                    <GrObjectGroup className='text-3xl' />
                  </div>
                  <div>
                    <h2 className='text-xl font-semibold'>{community.tenant_id.tenant_name}</h2>
                    <p className='text-sm text-gray-500'>Description: {community.description}</p>
                  </div>
                  <div className='ml-auto'>
                    {isFavoriteCommunity(community) ? (
                      <StarFilled
                        className='text-yellow-500 text-2xl cursor-pointer'
                        onClick={() => handleFavoriteCommunities(community.community_id)}
                      />
                    ) : (
                      <StarTwoTone
                        className='text-yellow-500 text-2xl cursor-pointer'
                        onClick={() => handleFavoriteCommunities(community.community_id)}
                      />
                    )}
                    <GroupOutlined
                      className='text-blue-500 text-2xl ml-4 cursor-pointer'
                      onClick={() => handleCommunityClick(community.community_id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };
    
    export default Communities;