import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setUserConfirmPassword } from '../../redux/slice/auth/authSlice';
import SetProfile from './setprofile';
import { BiArrowBack } from 'react-icons/fa';
import { BackwardFilled } from '@ant-design/icons';
import SetPassword from './setpasswords';

function ConfirmPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const password = useSelector(state => state.auth.password);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationStyles, setValidationStyles] = useState('mt-2 ml-2 text-sm text-red-600 hidden');
  const [showSetProfile, setShowSetProfile] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);

  const validateConfirmPassword = () => {
    if (password !== confirmPassword || !confirmPassword) {
      setValidationStyles('mt-2 ml-2 text-sm text-red-600');
      return;
    }
    dispatch(setUserConfirmPassword(confirmPassword));
    setShowSetProfile(true);
  };

  if (showSetProfile) {
    return <SetProfile />;
  }


  const handleSetPasswordback = () => {
    // Perform any necessary actions or processing related to the community
    setShowSetPassword(true);
  };

  if (showSetPassword) {
    return <SetPassword />;
  }

  return (
    <div className='flex-1 pt-8 px-2 bg-white'>
      <div onClick={() => handleSetPasswordback()} className='mb-4'>
        <BackwardFilled name="chevron-back" size={24} color="black" />
      </div>
      <div className='w-full h-2 bg-gray-300 rounded'>
        <div className='w-5/6 h-2 bg-[#2DABB1] rounded'></div>
      </div>

      <h1 className='mt-3 text-xl font-bold'>Confirm password</h1>

      <input
        className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
        placeholder='confirm password'
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        type='password'
        data-testid='confirm-password-input'
      />

      <h2 data-testid='confirm-password-validation' className={validationStyles}>
        Passwords do not match
      </h2>
      <button
        data-testid='set-password'
        
        onClick={validateConfirmPassword}
        className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'
      >
        <h3 className='text-white text-center text-xl font-semibold'>Continue</h3>
      </button>
    </div>
  );
}

export default ConfirmPassword;
