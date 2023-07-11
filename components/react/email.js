import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as yup from 'yup';
import { setUserEmail } from '../../redux/slice/auth/authSlice';
import Setpassword from './setpasswords';
import { BackwardFilled, BackwardOutlined } from '@ant-design/icons';
import GoalOptions from './goalOptions'


export default function Email() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [showGoalOptions, setShowGoalOptions] = useState(false);


  const emailValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Required'),
  });

  const submitEmail = (values) => {
    dispatch(setUserEmail(values.email));
    setShowSetPassword(true); // Show the Setpassword component
  };

  if (showSetPassword) {
    // Render the Setpassword component in a new page
    return <Setpassword />;
  }

  const handleGoalOPtionsback = () => {
    // Perform any necessary actions or processing related to the community
    setShowGoalOptions(true);
  };
  
  
  if (showGoalOptions){
    return <GoalOptions />
  }

  return (
    <div className='flex-1 pt-8 px-2 bg-white'>
      <button onClick={() => handleGoalOPtionsback()} className='mb-4'>
        <BackwardOutlined name="chevron-back" size={24} color="black" />
      </button>
      <div className='w-full h-2 bg-gray-300 rounded'>
        <div className='w-2/6 h-2 bg-[#2DABB1] rounded'></div>
      </div>

      <h1 className='mt-3 text-xl font-bold'>What is your email address?</h1>

      <Formik
        validationSchema={emailValidationSchema}
        initialValues={{ email: '' }}
        onSubmit={submitEmail}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <>
            <input
              className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
              placeholder='you@email.com'
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              data-testid='email-input'
            />

            {errors.email && touched.email && (
              <h1 data-testid='email-validation-text' className='mt-2 ml-2 text-sm text-red-600'>
                {errors.email}
              </h1>
            )}

            <button
              data-testid='submit-email-btn'
              onClick={handleSubmit} // Use onClick instead of onPress for a button element
              className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'
            >
              <h1 className='text-white text-center text-xl font-semibold'>Continue</h1>
            </button>
          </>
        )}
      </Formik>
    </div>
  );
}
