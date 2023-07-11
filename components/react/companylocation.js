
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineClose, AiFillStar } from 'react-icons/ai';

const CompanyLocation = () => {
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

export default CompanyLocation;
