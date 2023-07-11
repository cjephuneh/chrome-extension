import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { login, signin } from '../../redux/slice/auth/authSlice';
import { Formik } from 'formik';
import * as yup from 'yup';
import Goals from './goalOptions'
import Home from './home';
import Chats from './chat'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showGoals, setShowGoals] = useState(false);
  const [showHome, setShowHome] = useState(false); 

  const { isUserLoading, isUserError, isUserMessage } = useSelector((state) => state.auth);

  const loginValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().required('Required')
  });

  



  const handleLogin = async (values) => {
    dispatch(signin({ email: values.email, password: values.password })).then((response) => {
      if (response && response.payload) {
        // Render the Dashboard component instead of redirecting
        setShowHome(true);
      }
    });
    // const { data } = await axios.post('http://localhost:8000/api/auth/signin/', {
    //   email: 'k@e.com',
    //   password:"12345678"
    // })

    console.log(data)
  };




  // Display appropriate error messages
  useEffect(() => {
    if (isUserError) {
      if (isUserMessage === 'Incorrect credentials' && isUserLoading === false) {
        toast.error('Incorrect credentials. Please use the correct credentials or create an account.');
      }
    }
  }, [isUserError, isUserMessage, isUserLoading]);

  const handleSignUp = () => {
    setShowGoals(true); // Show the Goals component
  };

  if (showGoals) {
    // Render the Goals component in a new page
    return <Goals />;
  }

  if (showHome) {
    return <Home />;
  }

  return (
    <div className='bg-white flex-1 px-4'>
      <div className='pt-8 flex-row items-center'>
        <button onClick={() => router.push('/onBoarding')} data-testid='back-button'>
          <i className='chevron-back'></i>
        </button>
        <div className='-mx-6 w-full'>
          <h2 className='text-xl text-center' data-testid='screen-title'>
            Log in
          </h2>
        </div>
      </div>

      <div className='justify-between py-8'>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: 'test@test.com', password: 'test@test.com' }}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
            <div>
              <div className='border border-gray-300 p-2 rounded-xl '>
               
                <input
                  name='email'
                  placeholder='you@email.com'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='focus:outline-none'
                />
              </div>

              {errors.email && touched.email && (
                <p className='mt-2 ml-2 text-sm text-red-600' data-testid='email-validation-text'>
                  {errors.email}
                </p>
              )}

              <div className='border border-gray-300 mt-4 p-2 rounded-xl'>
                <input
                  name='password'
                  placeholder='password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='focus:outline-none'
                />
              </div>

              {errors.password && touched.password && (
                <p className='mt-2 ml-2 text-sm text-red-600' data-testid='password-validation-text'>
                  {errors.password}
                </p>
              )}

              <button className='mt-4 text-[#2DABB1]'>Forgot password?</button>

              <div className='mt-4 flex-row space-x-2'>
                <span>No account?</span>
                <button onClick={handleSignUp} data-testid='signup-button'>
                  <span className='text-[#2DABB1]'>Sign up</span>
                 
                </button>
              </div>

              <div className='mt-12'>
                <p>
                  By continuing, you agree to our <span className='text-[#2DABB1]'>Terms of Service</span> and our{' '}
                  <span className='text-[#2DABB1]'>Privacy Policy</span>.
                </p>

                <button
                   disabled={!isValid || isUserLoading}
                  onClick={handleSubmit}
                  className='bg-[#2DABB1] mt-8 px-6 py-3 w-full rounded-full'
                  data-testid='login-button'
                  type='submit'
                >
                  <span className='text-white text-center text-xl font-semibold'>
                    {isUserLoading ? 'Please wait...' : 'Log in'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </Formik>

        </div>
        <ToastContainer />
    </div>
  );
};

export default Login;



