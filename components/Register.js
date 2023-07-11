import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitSigninForm } from "../redux1/register/registerSlice";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import Chat from '../components/Chat';

function Register() {
  const [step, setStep] = useState(1); // Current step of the registration process
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phonenumber: "",
    gender: "",
    DOB: "",
    user_type: "",
    password: "",
    confirm_password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitSigninForm(userData));

    // Check if any field is empty
  const requiredFields = ["username", "email", "first_name", "last_name", "phonenumber", "gender", "DOB", "user_type", "password", "confirm_password"];
  const emptyFields = requiredFields.filter(field => !userData[field]);
  if (emptyFields.length > 0) {
    // Show error message or handle empty fields in your desired way
    console.log(`Empty fields: ${emptyFields.join(", ")}`);
    return;
  }

  // Check password match
  if (userData.password !== userData.confirm_password) {
    // Show error message or handle password mismatch in your desired way
    console.log("Passwords do not match");
    return;
  }

    setUserData({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      phonenumber: "",
      gender: "",
      DOB: "",
      user_type: "",
      password: "",
      confirm_password: "",
    });

    setIsAuthenticated(true);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  if (isAuthenticated) {
    return <Chat />;
  }

  return (
    
    <div className="min-h-fill flex items-center justify-center mt-37 py-12 px-4 sm:px-6 lg:px-8 aligh">
      <div className="max-w-nd w-full space-y-8">
        {/* Render progress bar */}
        <div className="flex justify-center mt-4">
          <div className="bg-gray-200 w-64 rounded-full">
            <div
              className={`bg-indigo-500 text-xs leading-none py-1 text-center text-white rounded-full ${
                step === 1 ? "w-1/4" : step === 2 ? "w-2/4" : step === 3 ? "w-3/4" : "w-full"
              }`}
            ></div>
          </div>
        </div>

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up now
          </h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a
              href="/Login"
              className="font-medium text-indigo-600 hover:text-indigo-500 px-2"
            >
              Sign in
            </a>
          </p> */}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Render fields based on the current step */}
          {step === 1 && (
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="username"
                  name="username"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs"
                  placeholder="Username"
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="firstname"
                  name="first_name"
                  autoComplete="firstname"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs"
                  placeholder="First Name"
                  value={userData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* Add more fields for step 1 */}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="lastname"
                  name="last_name"
                  autoComplete="none"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs"
                  placeholder="Last Name"
                  value={userData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phonenumber"
                  autoComplete="none"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs"
                  placeholder="Phone Number"
                  value={userData.phonenumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={userData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
            </div>
          )}

          {step === 3 && (
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              <div>
                <input
                  type="DOB"
                  name="DOB"
                  autoComplete="DOB"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs"
                  placeholder="DOB YYYY-MM-DD "
                  value={userData.DOB}
                  onChange={handleChange}
                />
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700">User Type</label>
                <select
                  name="user_type"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={userData.user_type}
                  onChange={handleChange}
                  required
                >
                   <option value="">Select user type</option>
                  <option value="admin">client</option>
                  <option value="employee">employee</option>
                  <option value="user">admin</option>
                </select>
              </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              <div>
                <input
                  type="password"
                  name="password"
                  autoComplete="none"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs"
                  placeholder="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="confirm_password"
                  autoComplete="none"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs"
                  placeholder="confirmpassword"
                  value={userData.confirm_password}
                  onChange={handleChange}
                />
              </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {/* Render navigation buttons */}
            {step !== 1 && (
              <button
                className="text-indigo-600 hover:text-indigo-500"
                onClick={handlePreviousStep}
              >
                <GrFormPreviousLink className="text-4xl" />
              </button>
            )}

            {step !== 4 ? (
              <button
                className="text-indigo-600 hover:text-indigo-500"
                onClick={handleNextStep}
              >
                <GrFormNextLink className="text-4xl" />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default Register;
