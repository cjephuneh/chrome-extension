import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveCommunitySurveys } from '../../redux/slice/community/communitySlice';
import { useState } from 'react';
import Survey from './survey';
import Community from './community';
import { BackwardFilled, BackwardOutlined } from '@ant-design/icons';



const Surveys = ({ selectedCommunityId }) => {
  const router = useRouter();
  const dispatch = useDispatch();




  // retrieve data from the store
  const { communitysurveys, isCommunitySurveysLoading, isCommunitySurveysSuccess, isCommunitySurveysError, isCommunitySurveysMessage } =
    useSelector((state) => state.community);
    const [showSurvey, setShowSurvey] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null)
    const [showBack, setShowBack] = useState(false);

 // retrieve community surveys
useEffect(() => {
  selectedCommunityId && dispatch(retrieveCommunitySurveys({ tenant_id: selectedCommunityId }));
}, [selectedCommunityId, dispatch]);

    
  

  // useEffect(() => {
  //    dispatch(retrieveCommunitySurveys({ tenant_id: 1 }));
  // }, [ dispatch]);


  const handleSurveyClick = (surveyData) => {
    setSelectedSurvey(surveyData)
    // Perform any necessary actions or processing related to the community
    setShowSurvey(true);
  };

  if(showSurvey) {
    return <Survey  selectedSurvey={selectedSurvey}  />
  }

  const handleBack = () => {
    // Perform any necessary actions or processing related to the community
    setShowBack(true);
  };
  
  
  if (showBack){
    return <Community />
  }



  return (
    true && (
      <div className='flex-1 bg-white pt-8 px-3'>
        <button onClick={() => handleBack()} className='mb-4'>
            <BackwardOutlined name="chevron-back" size={24} color="black" />
         </button>
        <div className='flex-row items-center space-x-3'>
          <div className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            {/* EvilIcons component not available in Next.js, replace with appropriate icon */}
            <i className='fas fa-search text-black'></i>
            <input className='flex-1' placeholder='Search Surveys' />
          </div>
          {/* <button
            className='focus:outline-none'
            onClick={() => navigation.openDrawer()} // navigation.openDrawer() not available in Next.js, replace with appropriate logic
          >
            <img src={require('../../assets/user.png')} alt='Profile' />
          </button> */}
        </div>

        <h2 className='my-3 text-2xl font-semibold'>Surveys</h2>

        <div className=''>
          {isCommunitySurveysLoading ? (
            <p>Loading surveys...</p>
          ) : (
            <>
              {isCommunitySurveysSuccess && communitysurveys.data.length > 0 ? (
                <>
                  {communitysurveys.data.map((survey) => (
                    <div
                      key={survey.survey_id}
                      onClick={() =>
                        handleSurveyClick({
                            survey_topic: survey.survey_topic,
                            survey_description: survey.survey_description,
                            survey_questions: survey.survey_questions,
                        })
                      }
                      className='flex-row items-center gap-3 bg-gray-200 py-2 mt-2 mx-1 rounded'
                    >
                      {/* Ionicons component not available in Next.js, replace with appropriate icon */}
                      <i className='fas fa-newspaper text-black'></i>
                      <div>
                        <h3 className='font-semibold'>{survey.survey_topic}</h3>
                        <p className='text-gray-500 text-sm'>
                          {survey.survey_description.length > 40
                            ? survey.survey_description.slice(0, 40) + '...'
                            : survey.survey_description}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>No surveys available for this community</p>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default Surveys;
