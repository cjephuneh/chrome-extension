import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { setUserPassword } from '../../redux/slice/auth/authSlice';
import ConfirmPassword from './confirmpassword';
import { BackwardOutlined } from '@ant-design/icons';
import Email from './email';

function SetPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const passwordValidationSchema = yup.object().shape({
    password: yup.string().min(6, 'Your password must be at least 6 characters long').required('Required'),
  });

  const submitPassword = (values) => {
    dispatch(setUserPassword(values.password));
    setShowConfirmPassword(true);
  };

  if (showConfirmPassword) {
    return <ConfirmPassword />;
  }

  const handleEmailback = () => {
    // Perform any necessary actions or processing related to the community
    setShowEmail(true);
  };
  
  
  if (showEmail){
    return <Email />
  }


  return (
    <div className="flex-1 pt-8 px-2 bg-white">
      <button onClick={() => handleEmailback()} className="mb-4">
        <BackwardOutlined name="chevron-back" size={24} color="black" />
      </button>
      <div className="w-full h-2 bg-gray-300 rounded">
        <div className="w-4/6 h-2 bg-[#2DABB1] rounded"></div>
      </div>

      <h1 className="mt-3 text-xl font-bold">Set a password</h1>

      <Formik
        initialValues={{ password: "" }}
        validationSchema={passwordValidationSchema}
        onSubmit={submitPassword}
      >
        {({
          values,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
        }) => (
          <>
            <input
              className="mt-4 border border-gray-300 px-4 py-2 rounded-lg"
              placeholder="your password"
              value={values.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              data-testid="password-input"
            />

            {errors.password && touched.password && (
              <h3
                data-testid="password-validation"
                className="mt-2 ml-2 text-sm text-red-600"
              >
                {errors.password}
              </h3>
            )}

            <button
              type='submit'
              onClick={handleSubmit}
              className="bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full"
            >
              <h3 className="text-white text-center text-xl font-semibold">
                Continue
              </h3>
            </button>
          </>
        )}
      </Formik>
    </div>
  );
}

export default SetPassword;
