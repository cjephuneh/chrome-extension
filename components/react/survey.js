import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect } from 'react';
// import { Box, Text, TouchableOpacity, View } from '@mui/system';
import User from '../../assets/user.png'
import SurveyQuestions from './surveyQuestions';
import { useState } from 'react';
import { BackwardFilled, BackwardOutlined } from '@ant-design/icons';
import Surveys from './surveys';


function Survey({ selectedSurvey }) {
  const router = useRouter();

  console.log(selectedSurvey)

  // retrieve data passed via query parameters
  const { survey_topic, survey_description, survey_questions, community_id } = router.query;
  const [showSurveyQuestions, setShowSurveyQuestions] = useState(false);
  const [selectedQuestion, setShowSelectedQuestion] = useState(null)
  const [showBack, setShowBack] = useState(false);



  // const handleStartSurvey = () => {
  //   router.push({
  //     pathname: '/surveyQuestions',
  //     query: { survey_questions, community_id },
  //   });
  // };

  useEffect(() => {
    // Example of using router in useEffect
    // You can perform any necessary cleanup logic here

    // Cleanup the effect
    return () => {
      // Any necessary cleanup logic
    };
  }, [router, survey_questions, community_id]);

  const questionCount = selectedSurvey.survey_questions ? Object.keys(selectedSurvey.survey_questions).length : 0;

  const handleSurveyQuestionsClick = (QuestionsData) => {
    setShowSelectedQuestion(QuestionsData)
    // Perform any necessary actions or processing related to the community
    setShowSurveyQuestions(true);
  };

  if(showSurveyQuestions) {
    return <SurveyQuestions surveyQuestions={selectedSurvey.survey_questions}/>
  }

  const handleBack = () => {
    // Perform any necessary actions or processing related to the community
    setShowBack(true);
  };
  
  
  if (showBack){
    return <Surveys />
  }

  return (
    <div className="flex-1 bg-white pt-8 px-3 justify-between">
      <button onClick={() => handleBack()} className='mb-4'>
            <BackwardOutlined name="chevron-back" size={24} color="black" />
         </button>
      <div>
        <div className="font-semibold text-2xl text-center">{selectedSurvey.survey_topic}</div>
        <div className="text-center mt-3">{selectedSurvey.survey_description}</div>

        {/* <div className="mt-7 flex-row items-center ">
          <div className="flex-row">
            {[1, 2, 3].map((user, i) => (
              <div
                key={i}
                className={i > 0 ? '-mx-2 border-2 border-white rounded-full' : 'border-2 border-white rounded-full'}
              >
                <Image
                  key={i}
                  src={User}
                  alt="User"
                  width={100}
                  height={100}
                  testID="top-3-member-images"
                />
              </div>
            ))}
          </div>
          <h2 className="ml-5 text-[#2DABB1]">Completed by 15 people</h2>
        </div> */}

        <div className="mt-8 flex-row items-center justify-around">
          <div>
            <h2 className="text-center">Questions</h2>
            <h2 className="text-center font-semibold">{questionCount}</h2>
          </div>

          <div>
            <h2 className="text-center">Approximate time</h2>
            <h2 className="text-center font-semibold">20mins</h2>
          </div>
        </div>
      </div>
      <button
        onClick={handleSurveyQuestionsClick}
        className="mb-8 bg-[#2DABB1] py-2 w-48 rounded ml-[50px] mt-[300px]"
      >
        <h2 className="text-center font-semibold text-white">Start Survey</h2>
      </button>
    </div>
  );
}

export default Survey;