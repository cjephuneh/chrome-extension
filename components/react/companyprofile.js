import React from 'react'
//  import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const CompanyProfile = () => {
    return (
      <div>
        {/* <div className="relative">
          <img
            src="../../assets/companyBg.png"
            alt="Company Background"
            className="h-40 w-full"
          />
          <div className="justify-center items-center">
            <div className="absolute -bottom-8 justify-center items-center bg-white rounded-full p-1">
              <i className="fas fa-user-circle text-gray text-5xl"></i>
            </div>
          </div>
        </div>
   */}
        <div className="mt-10 px-3">
          <div className="space-y-1">
            <h2 className="text-2xl text-center font-bold">
              Maziwa Industries Limited
            </h2>
            <p className="text-gray-500 text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              cumque
            </p>
          </div>
  
          <div className="space-y-4 mt-4 items-center">
            <div className="flex-row space-x-16">
              <div>
                <p className="font-semibold">Community Rating</p>
                <div className="flex-row space-x-2 mx-auto">
                  <i className="icon ion-md-star text-black"></i>
                  <span>4.65</span>
                </div>
              </div>
              <a href="/issues">
                <p className="font-semibold">Issues Resolved</p>
                <p className="text-center">56/100</p>
              </a>
            </div>
  
            <div>
              <p className="font-semibold">Percentage Resolved</p>
              <p className="text-center">56%</p>
            </div>
          </div>
  
          <div className="border border-gray-300 my-4"></div>
  
          <div className="space-y-3">
            <div className="flex-row justify-between">
              <p>Support Email</p>
              <p>maziwa@domain.com</p>
            </div>
            <div className="flex-row justify-between">
              <p>Location</p>
              <p>Nairobi</p>
            </div>
          </div>
  
          <div className="border border-gray-300 my-4"></div>
  
          <div>
            <p className="bg-gray-200 px-4 py-2">LANGUAGE PREFERENCES</p>
  
            <div className="flex-row mt-2 items-center justify-between">
              <div>
                <p className="font-semibold">Language</p>
                <p className="text-sm text-gray-500">English</p>
              </div>
              <i className="icon ion-md-navigate-next"></i>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CompanyProfile;
  