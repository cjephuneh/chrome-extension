import axios from "axios";
import { ApiUrls } from "../../../utils/ApiUrls";


const signinUser = async (userData) => {
  console.log(userData)
    try {
      const { data } = await axios.post(ApiUrls.LOGIN_ENDPOINT, userData)
      

      if(data.token){
          const storeUserInfo = async () => {
              try {
                  localStorage.setItem('user', JSON.stringify(data))
              } catch (error) {
                  console.log('error storing the value')
              }
          }
      
          await storeUserInfo()

          return data
         
      } else return { error: 'Incorrect credentials'}

    } catch (error) {
      throw error
    }
}


const registerUser = async (userData) => {
    try {
      const { data } = await axios.post(ApiUrls.REGISTER_ENDPOINT, userData);
  
      if (data.token) {
        const storeUserInfo = async () => {
          try {
            localStorage.setItem('user', JSON.stringify(data));
          } catch (error) {
            // console.log('Error storing the value');
          }
        };
  
        await storeUserInfo();
  
        return data;
      } else {
        if(data.errors.username){
            return { error: 'Username already taken' }
        } 
        
        if(data.errors.email && !data.errors.username){
            return { error: 'Email already registered'}
        } 
         
        else return { error: 'An error occurred. Please try again later'}
      }
    } catch (error) {
      throw error;
    }
  };
  
  

const sendAuthCode = async (userEmail) => {
    const response = await axios.post('/', userEmail)

    return response.data
}

const verifyAuthCode = async (userEmail) => {
    const response = await axios.post('/', userEmail)

    return response.data
}

const authService = {
    signinUser, 
    registerUser,
    sendAuthCode,
    verifyAuthCode
}

export default authService