import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveFavoriteCommunities } from '../../redux/slice/community/communitySlice';
import Community from './community';

const FavoriteOrgs = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // fetch data from store
  const {
    favoritecommunities,
    isFavoriteCommunitiesLoading,
    isFavoriteCommunitiesSuccess,
  } = useSelector((state) => state.community);

  const [availableCommunities, setCommunities] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [showCommunity, setShowCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const filteredOrgs = availableCommunities.filter((item) =>
    item.tenant_id.tenant_name.toLowerCase().includes(searchWord.toLowerCase())
  );

  useEffect(() => {
    // fetch Communities
    dispatch(
      retrieveFavoriteCommunities({
        client_id: user?.id,
      })
    );
  }, [dispatch, user?.id]); // Add an empty dependency array here
  

  // update communities state
  useEffect(() => {
    if (isFavoriteCommunitiesSuccess && Array.isArray(favoritecommunities)) {
      setCommunities(favoritecommunities);
    }
  }, [isFavoriteCommunitiesSuccess, favoritecommunities]);

  const handleCommunityClick = (communityId) => {
    setSelectedCommunity(communityId);
    console.log(communityId)
    setShowCommunity(true);
  };

  if (showCommunity) {
    return <Community selectedCommunity={selectedCommunity} />;
  }

  return (
    <div className="flex-1 bg-white pt-8 px-3">
      <div className="flex-row items-center space-x-3">
        {/* <div className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            {/* <EvilIcons name="search" size={24} color="black" /> 
            <input
                className='flex-1'
                placeholder='Search your favorite organization'
                value={searchWord}
                onChangeText={(text) => setSearchWord(text)}
            />
        </div> 
     <button
        activeOpacity={0.9}
        onPress={() => navigation.openDrawer()}
    >
    </button> */}
      </div>

      <h3 className="text-2xl font-bold mt-2">Favorite Organizations</h3>
      <h3>Explore your favorite organizations</h3>

      <div className="mt-4 space-y-3">
        {isFavoriteCommunitiesLoading ? (
          <h3>Loading...</h3>
        ) : filteredOrgs.length > 0 ? (
          filteredOrgs.map((community, i) => (
            <button
              data-testid="community-btn"
              key={i}
              onClick={() => handleCommunityClick(community.community_id)}
              className="flex flex-col space-y-1"
            >
              {/* <MaterialIcons name="groups" size={24} color="black" /> */}
              <div>
                <h3 className="font-semibold mr-8">{community.tenant_id.tenant_name}</h3>
                <h3 className="text-gray-500 text-sm">
                  {community.description.length > 40
                    ? `${community.description.slice(0, 40)}...`
                    : community.description}
                </h3>
              </div>
            </button>
          ))
        ) : (
          <h3 className="text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic">
            No favorite communities found
          </h3>
        )}
      </div>
    </div>
  );
};

export default FavoriteOrgs;
