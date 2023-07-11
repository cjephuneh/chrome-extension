import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Surveys from "./surveys";


export default function SurveyQuestions({ surveyQuestions: currentSurveyQuestions }) {
  const router = useRouter();
   console.log(currentSurveyQuestions);
   const { survey_questions, community_id } = router.query;
   const surveyQuestions = Object.keys(currentSurveyQuestions).map((key) => ({
    key,
    value: currentSurveyQuestions[key],
  }));
   const [answers, setAnswers] = useState(Array(surveyQuestions.length).fill(''));
   const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const [showSurveys, setShowSurveys] = useState(false)


  const handleQusetionsSubmit = () => {
    // Perform any necessary actions or processing related to the community
    setShowSurveys(true);
  };

  if(showSurveys) {
    return <Surveys  />
  }

  const handleSubmit = () => {
    // Perform any necessary actions with the answers
    console.log(answers);
     toast.success('Thank you for participating', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Change the duration as per your requirement
      
    });
    setShowSurveys(true);

  };

   return (
    <div className='pt-8 px-3 flex-1 justify-between'>
      <div className='relative flex-1'>
        <div>
          <div className='space-y-3'>
            {surveyQuestions.map((question, index) => (
              <div key={index}>
                <h1 className='text-xl'>{index + 1}. {question.value}</h1>
                <input
                  placeholder='Type your answer'
                  className='border border-gray-200 p-2'
                  multiline
                  style={{
                    maxHeight: 90,
                    height: 'auto',
                  }}
                  data-testid='message-input'
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        
      </div>
       <button onClick={handleSubmit} className='mb-8 bg-[#2DABB1] py-2 mt-9 rounded'>
        <h2 className='text-center font-semibold text-white'>Complete</h2>
      </button>
      <ToastContainer />
    </div>
  );
}