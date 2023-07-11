import React, { useState } from "react";
import { BiMessage, BiSearchAlt, BsChatDotsFill } from "react-icons/bi";
import { useRouter } from "next/router";
import { IoIosPeople } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import CreateIssue from "./createissue";
import Inbox from "../react/inbox";
import Communities from "./communities";
import FavoriteOrgs from "./fauvariteorg";
import { MessageFilled } from "@ant-design/icons";
import { IoPeopleCircle, IoPeopleOutline } from "react-icons/io5";
import ChatCreateModal from "../drawer/ChatCreateModal";

const Home = () => {
  const router = useRouter();
  const data = [];

  const [companies, setCompanies] = useState(data);
  const [searchWord, setSearchWord] = useState("");
  const [showCreateIssue, setShowSetProfile] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showCommunities, setShowCommunities] = useState(false)
  const [showFauvariteOrg, setShowFauvariteOrg ] = useState(false)

  const searchFilterFunction = (text) => {
    if (!text) setSearchWord(text);

    const newData = data.filter((item) => {
      const itemData = item.title ? item.title.toLowerCase() : "".toLowerCase;
      const searchData = text.toLowerCase();

      return itemData.indexOf(searchData) > -1;
    });

    setCompanies(newData);
    setSearchWord(text);
  };
  if (showInbox) {
    return <Inbox />;
  }

  if (showCreateIssue) {
    return <CreateIssue />;
  }

  if (showCommunities) {
    return <Communities />;
  }

  if (showFauvariteOrg) {
    return <FavoriteOrgs />;
  }

  return (
    <div className="flex-1 bg-white pt-8 px-3">
      <div className="flex-row items-center space-x-3">
        {/* <div className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <BiSearchAlt name="search" size={24} color="black" /> 
            <input
                className='flex-1'
                placeholder='Search Organizations'
                value={searchWord}
                onChangeText={(text) => searchFilterFunction(text)}
            />
        </div> */}
        {/* <button
         
          onPress={() => navigation.openDrawer()}
          data-testid="profile-pic"
        >
          <img source={require("../../assets/user.png")} />
        </button> */}
      </div>

      <h1 className="text-2xl font-bold mt-2">Find a chat</h1>
      <h2>Select who you want to chat with</h2>

      {/* hide this view when searching */}
      <div
        className={
          searchWord.length === 0
            ? "my-3 flex-row justify-between space-x-10"
            : "hidden"
        }
      >
        <button
          
          className="items-center justify-center"
          onClick={() => setShowInbox(true)}
        >
          <div className="bg-[#B2E0E3] p-4 rounded-full">
            <BiMessage name="message1" size={24} color="#2DABB1" />
          </div>
          <h3 className="font-semibold">Chats</h3>
        </button>
        <button
          
          className="items-center justify-center"
          onClick={() => setShowCommunities(true)}
        >
          <div className="bg-[#B2E0E3] p-4 rounded-full">
            <IoPeopleOutline name="groups" size={24} color="#2DABB1" />
          </div>
          <h2 className="font-semibold">Communities</h2>
        </button>
        <button
          className="items-center justify-center"
          onClick={() => setShowFauvariteOrg(true)}
        >
          <div className="bg-[#B2E0E3] p-4 rounded-full">
            <AiFillStar name="star" size={24} color="#2DABB1" />
          </div>
          <h3 className="font-semibold">Favorites</h3>
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {companies.length > 0 ? (
          companies.map((chat, i) => (
            <button key={i} onClick={() => router.push("companyProfile")}>
              <div className="flex-row space-x-3 items-center">
                {/* <Octicons name="organization" size={24} color="black" /> */}
                <div>
                  <h3>{chat.title}</h3>
                  <h3 className="text-gray-500 text-sm">{chat.location}</h3>
                </div>
              </div>
            </button>
          ))
        ) : (
          <h2 className="text-sm text-center bg-gray-300 p-2 rounded font-semibold italic">
            No recent chats
          </h2>
        )}
      </div>

      <button
        className="mb-2 mt-3 rounded-full bg-[#2DABB1] px-4 py-3"
        onClick={() => setShowSetProfile(true)}
      >
        <h2 className="text-center font-semibold text-white">
          Add an Instant Issue
        </h2>
      </button>
    </div>
  );
};

export default Home;
