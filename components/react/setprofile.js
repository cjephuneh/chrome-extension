import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  register,
  reset,
  setAuthCode,
  setGoal,
} from "../../redux/slice/auth/authSlice";
import { useFormik } from "formik";
import { Formik } from "formik";
import * as yup from "yup";
import Dropdown from "react-dropdown-select";
import { IoMdArrowDropdown } from "react-icons/io";
import DatePicker from "react-datepicker";
import Login from "./login";
import {
  BackwardFilled,
  CalendarFilled,
  CalendarTwoTone,
} from "@ant-design/icons";
import { BiCalendarEdit } from "react-icons/bi";
import ConfirmPassword from "./confirmpassword";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SetProfile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedGender, setSelectedGender] = useState("");

  // dropdown
  const [genderOpen, setGenderOpen] = useState(false);
  const [genders, setGenders] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  // date picker
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [userDate, setUserDate] = useState("YYYY-MM-DD");
  const [profileSetupSuccess, setProfileSetupSuccess] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate;
    setDate(currentDate);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    setUserDate(`${year}-${month}-${day}`);
  };

  const profileValidationSchema = yup.object().shape({
    username: yup.string().required("Required"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    // gender: yup
    //     .string()
    //     .required(),
    dateOfBirth: yup.string().required(),
    phoneNumber: yup.string().required(),
  });

  const {
    email,
    password,
    confirmPassword,
    isUserError,
    isUserSuccess,
    isUserMessage,
    isUserLoading,
  } = useSelector((state) => state.auth);

  const submitProfile = (values) => {
    const resetErrorInStore = (dispatch, action) =>
      new Promise((resolve, reject) => {
        dispatch(action());
        resolve();
      });

    resetErrorInStore(dispatch, reset).then(() => {
      dispatch(
        register({
          username: values.username,
          email,
          first_name: values.firstName,
          last_name: values.lastName,
          gender: selectedGender,
          phonenumber: values.phoneNumber,
          DOB: values.dateOfBirth,
          password,
          confirm_password: confirmPassword,
          user_type: "client",
        })
      ).then(() => {
        setProfileSetupSuccess(true);
      });
    });
   
  };

  useEffect(() => {
    if (isUserError) {
      if (isUserMessage === "Username already taken") {
        toast.error(
          "Username already registered. Please select another username"
        );
      }

      if (isUserMessage === "Email already registered") {
        toast.error("User already exists. Please log in.", {
          onClose: () => router.push("/login"),
          closeButton: "LOGIN",
        });
      }

      if (isUserMessage === "An error occurred. Please try again later") {
        toast.error(
          "An error occurred. Please make sure the form is fully filled out or try again later"
        );
      }
    }
  }, [isUserError, isUserMessage, router]);

  if (profileSetupSuccess) {
    return <Login />;
  }

  const handleConfimPasswordback = () => {
    // Perform any necessary actions or processing related to the community
    setShowConfirmPassword(true);
  };

  if (showConfirmPassword) {
    return <ConfirmPassword />;
  }

  return (
    <div className="flex-1 pt-8 px-2 bg-white">
      <div behavior="position" className="mt-2 space-y-3">
        <div className="">
          <button onClick={() => handleConfimPasswordback()} className="mb-4">
            <BackwardFilled name="chevron-back" size={24} color="black" />
          </button>
          <div className="w-full h-2 bg-gray-300 rounded">
            <div className="w-6/6 h-2 bg-[#2DABB1] rounded"></div>
          </div>
        </div>

        <h1 className="mt-3 text-xl font-bold">
          Finish setting up your profile
        </h1>
        <Formik
          initialValues={{
            username: "",
            firstName: "",
            lastName: "",
            gender: selectedGender,
            dateOfBirth: "",
            phoneNumber: "",
          }}
          validationSchema={profileValidationSchema}
          onSubmit={submitProfile}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <div className="mt-4 space-y-3">
              <div>
                <h2>Username</h2>
                <input
                  className="mt-2 border border-gray-300 px-4 py-2 rounded-lg"
                  placeholder="johndoe"
                  value={values.username}
                  onChange={handleChange("username")}
                  onBlur={handleBlur("username")}
                  data-testid="name-input"
                />
                {errors.username && touched.username && (
                  <h1
                    data-testid="username-validation-text"
                    className="mt-2 ml-2 text-sm text-red-600"
                  >
                    {errors.username}
                  </h1>
                )}
              </div>

              <div className="flex-row justify-between gap-2">
                <div className="flex-1">
                  <h3>First Name</h3>
                  <input
                    className="mt-2 border border-gray-300 px-4 py-2 rounded-lg"
                    placeholder="John"
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                  />
                  {errors.firstName && touched.firstName && (
                    <h3
                      data-testid="firstName-validation-text"
                      className="mt-2 ml-2 text-sm text-red-600"
                    >
                      {errors.firstName}
                    </h3>
                  )}
                </div>

                <div className="flex-1">
                  <h3>Last Name</h3>
                  <input
                    className="mt-2 border border-gray-300 px-4 py-2 rounded-lg"
                    placeholder="Doe"
                    value={values.lastName}
                    onChange={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                  />
                  {errors.lastName && touched.lastName && (
                    <h3
                      data-testid="lastName-validation-text"
                      className="mt-2 ml-2 text-sm text-red-600"
                    >
                      {errors.lastName}
                    </h3>
                  )}
                </div>
              </div>

              <div className="flex-row gap-2">
                <div className="flex-1">
                  <h3>Gender</h3>
                  <Dropdown
                    className="mt-2 px-4 py-2"
                    options={genders}
                    onChange={(selected) =>
                      setSelectedGender(selected[0].value)
                    }
                    placeholder="Select Gender"
                    labelField="label"
                    valueField="value"
                  />

                  {/* <h2 data-testid='name-val-text' className={validationStyles}>Your name is required</h2> */}
                </div>

                <div className="flex-1">
                  <div className="flex-row gap-2">
                    <h2>Date of Birth</h2>
                    <button onClick={() => setShow(true)}>
                      
                    </button>
                  </div>
                  <input
  type="date"
  className="mt-2 border border-gray-300 px-4 py-2 rounded-lg"
  value={values.dateOfBirth}
  onChange={handleChange("dateOfBirth")}
  onBlur={handleBlur("dateOfBirth")}
/>
                  {/* <div className="flex-row flex-1 items-center border border-gray-300 mt-2 rounded-lg px-2 py-2 ">
                    {/* <input editable={true} readOnly={false} value={userDate} />
                    {errors.dateOfBirth && touched.dateOfBirth && (
                      <h2
                        data-testid="dateOfBirth-validation-text"
                        className="mt-2 ml-2 text-sm text-red-600"
                      >
                        {errors.dateOfBirth}
                      </h2>
                    )} 
                  </div> */}
                </div>
              </div>

              <div>
                <h3>Phone Number</h3>
                <input
                  className="mt-2 border border-gray-300 px-4 py-2 rounded-lg"
                  placeholder="254712345678"
                  value={values.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  data-testid="name-input"
                />

                {errors.phoneNumber && touched.phoneNumber && (
                  <h3
                    data-testid="phoneNumber-validation-text"
                    className="mt-2 ml-2 text-sm text-red-600"
                  >
                    {errors.phoneNumber}
                  </h3>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="bg-[#2DABB1] z-0 mt-16 px-4 py-2 w-full rounded-full"
              >
                <h1 className="text-white text-center text-xl font-semibold">
                  {isUserLoading ? "Please wait..." : "Continue"}
                </h1>
              </button>
            </div>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
}
