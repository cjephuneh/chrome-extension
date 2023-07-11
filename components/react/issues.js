import React, { useEffect } from 'react'
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityIssues } from '../../redux/slice/community/communitySlice';
import { BiSearchAlt } from 'react-icons/bi';
import { GrDocument, GrDocumentCloud, GrDocumentCsv } from 'react-icons/gr';
import Issue from './issue';
import { useState } from 'react';
import CreateIssue from './createissue';

const Issues = ({ selectedCommunityIssues }) => {
    
    const dispatch = useDispatch()
    const router = useRouter()
    const [showIssue, setShowIssue] = useState(false)
    const [showCreateIssue, setShowCreateIssue] = useState(false)
    const [selectedIssue, setShowSelectedIssue] = useState(false)



    // const { community_id } = router.query

    const { communityIssues, isCommunityIssuesLoading } = useSelector((state) => state.community)

    useEffect(() => {
        selectedCommunityIssues && dispatch(getCommunityIssues(selectedCommunityIssues))
    }, [])

    // useEffect(() => {
    //     dispatch(getCommunityIssues(1))
    // }, [])


    const handleIssueClick = (issueData) => {
        setShowSelectedIssue(issueData)
      // Perform any necessary actions or processing related to the community 
      setShowIssue(true);
    };
    
    
    if (showIssue){
      return <Issue selectedIssue={selectedIssue}/>
    }

    const handleCreateIssueClick = () => {

      // Perform any necessary actions or processing related to the community
      setShowCreateIssue(true);
    };
    
    
    if (showCreateIssue){
      return <CreateIssue />
    }

  return (
    <div className='pt-8 px-3 flex-1 '>
        { isCommunityIssuesLoading ? 

            <h1>Loading...</h1> :

            communityIssues &&
            (
                communityIssues.length === 0 ?

                <div className='flex-1 items-center justify-center space-y-12'>
                    <BiSearchAlt name="clipboard-text-search-outline" size={60} color="black" />
                    <h2 className='text-sm bg-gray-300 p-2 rounded font-semibold italic'>No issues raised for this community</h2>
                    <button onClick={() => handleCreateIssueClick({ selectedCommunityIssues })} className='bg-[#2DABB1] px-4 py-2 rounded'>
                        <h3 className='text-white font-semibold'>Raise the first issue</h3>
                    </button>
                </div> :
                <>
                    <h3 className='font-semibold text-lg'>{communityIssues.length>0 && communityIssues[0].community_id.community_name}</h3>

                    <div className='mt-4 space-y-2 flex-1' >
                            {
                                [...communityIssues].sort((a, b) => b.issue_id - a.issue_id).map(issue => (
                                    <button 
                            data-testid='issue-btn' 
                            onClick={() => handleIssueClick(issue)}
                            key={issue.issue_id}
                            className='p-2 rounded'
                            style={{
                                backgroundColor: 'white',
                                width: '100%',
                                elevation: 60,
                                shadowColor: 'white',
                            }}
                        >
                            <div className='flex items-center gap-3'>
                                <GrDocumentCloud name="documents" size={24} color="#2DABB1" />
                                <div>
                                    <h3 className='font-semibold'>{issue.issue}</h3>
                                    <h3 className='text-xs'>{issue.description.length > 50 ? issue.description.slice(0, 50)+'...' : issue.description}</h3>
                                    <h3 className='text-xs text-gray-500'>Raised by: {issue.client_id.first_name} {issue.client_id.last_name}</h3>
                                </div>
                            </div>
                        </button>
                                ))
                            }
                    </div>
                </>
            )
        }
    </div>
  )
}

export default Issues