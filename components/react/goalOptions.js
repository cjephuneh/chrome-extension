// GoalSelection.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGoal } from '../../redux/slice/auth/authSlice';
import Email from './email';

const GoalSelection = () => {
  const dispatch = useDispatch();
  const [showEmailComponent, setShowEmailComponent] = useState(false);

  const handleGoalSelection = (selectedGoal) => {
    dispatch(setGoal(selectedGoal));
    setShowEmailComponent(true); // Show the <Email /> component
  };

  if (showEmailComponent) {
    // Render the Email component
    return <Email />;
  }

  return (
    <div className='flex-1 pt-12 px-2 bg-white'>
      <div className='w-full h-2 bg-gray-300 rounded'>
        <div className='w-1/6 h-2 bg-[#2DABB1] rounded'></div>
      </div>

      <h1 data-testid='goal-header' className='mt-3 text-2xl font-bold tracking-wider'>
        Tell us your goal
      </h1>
      <h2>What would you like to do with proxima?</h2>

      <div className='mt-8 space-y-4'>
        <button
          
          onClick={() => handleGoalSelection('Chat with in-house organizations')}
          className='bg-blue-200 px-6 py-4 rounded-full'
        >
          <h3 className='font-bold'>Chat with in-house organizations</h3>
        </button>

        <button
          
          onClick={() => handleGoalSelection('Join Organization community')}
          className='bg-[#F2F4F5] px-6 py-4 rounded-full'
        >
          <h3 className='font-bold'>Join Organization community</h3>
        </button>

        <button
          
          onClick={() => handleGoalSelection('Explore other organizations')}
          className='bg-[#F2F4F5] px-6 py-4 rounded-full'
        >
          <h3 className='font-bold'>Explore other organizations</h3>
        </button>
      </div>
    </div>
  );
};

export default GoalSelection;
