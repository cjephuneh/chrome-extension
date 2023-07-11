import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons'
import { FaCross, FaInfo } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { getCommunities, raiseIssue, resetIssueStatus } from '../../redux/slice/community/communitySlice'
import { BiCrosshair, BiStopCircle } from 'react-icons/bi'
import { CircularProgress } from '@mui/material'
import Home from './home'
import { BackwardOutlined } from '@ant-design/icons';


const CreateIssue = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { community_id } = router.query

  const { user } = useSelector((state) => state.auth)

  // fetch all communities on initial page load
  useEffect(() => {
    dispatch(getCommunities())
  }, [dispatch])

  // retrieve communities data from store
  const { communities, isCommunitiesLoading, isCommunitiesSuccess, isRaiseIssueLoading, isRaiseIssueSuccess, isRaiseIssueError } = useSelector((state) => state.community)

  const [selectedOrg, setSelectedOrg] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [issueTitle, setIssueTitle] = useState(null)
  const [issueDescription, setIssueDescription] = useState(null)
  const [showBack, setShowBack] = useState(false);

  

  const filteredOrgs = communities && communities.filter(org =>
    org.tenant_id.tenant_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const createIssue = () => {
    if (!selectedOrg || !issueTitle?.trim().length === 0 || issueDescription?.trim().length === 0) {
      window.alert('Missing details', 'Please fill out the required details')
      return;
    }

    dispatch(raiseIssue({
      client_id: user.id,
      community_id: selectedOrg.community_id,
      issue: issueTitle,
      description: issueDescription,
      solved: false
    }))
  }

  // Alert user if issue was raised
  useEffect(() => {
    if (isRaiseIssueSuccess) {
      window.alert('Success', 'Issue raised successfully')

      // reset issue status
      dispatch(resetIssueStatus())

      setSelectedOrg(null)
      setSearchText('')
      setIssueTitle(null)
      setIssueDescription(null)
    }

    if (isRaiseIssueError) {
      window.alert('Failed', 'Failed to raise issue. Please try again later')
      // reset issue status
      dispatch(resetIssueStatus())

      setSelectedOrg(null)
      setSearchText('')
      setIssueTitle(null)
      setIssueDescription(null)
    }
  }, [isRaiseIssueSuccess, isRaiseIssueError, dispatch])


  const handleBack = () => {
    // Perform any necessary actions or processing related to the community
    setShowBack(true);
  };
  
  
  if (showBack){
    return <Home />
  }




  return (
    <div className='pt-8 px-3'>
      <h1 className='text-2xl font-bold text-center'>Create an issue</h1>

      <div className='mt-3 flex-row space-x-3 items-center'>
      <button onClick={() => handleBack()} className='mb-4'>
            <BackwardOutlined name="chevron-back" size={24} color="black" />
         </button>
        <h2 className='font-semibold text-lg'>{user?.first_name} {user?.last_name}</h2>
      </div>

      {
        isCommunitiesLoading ? <h3>Loading available communities...</h3> :

          (
            isCommunitiesSuccess && communities &&

            <div className='space-y-3' behavior='height'>
              <div className='flex-row items-center mt-3 space-x-3 bg-gray-200 px-2 py-1 rounded'>
                <SearchOutlined style={{ fontSize: 24, color: 'black' }} />
                <input
                  className='flex-1'
                  placeholder='Search Community'
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
              </div>

              <div className='horizontal' style={{ overflowX: 'scroll' }}>
                {
                  filteredOrgs.map(org => (
                    <button key={org.community_id} onClick={() => {
                      setSelectedOrg(org)
                      setSearchText(org.tenant_id.tenant_name)
                    }} className='px-2 py-1 bg-gray-200 mx-1 rounded'>
                      <h3>{org.tenant_id.tenant_name}</h3>
                    </button>
                  ))
                }
              </div>
              {
                selectedOrg ?
                  <button  onClick={() => setSelectedOrg(null)} className='relative bg-[#2DABB1] px-4 py-2 font-semibold text-white self-start rounded'>
                    <h3 className='font-semibold text-white'>{selectedOrg?.tenant_id.tenant_name}</h3>
                    <button className='absolute right-0 top-0'  onClick={() => setSelectedOrg(null)}>
                      <BiStopCircle style={{ fontSize: 18, color: 'red' }} />
                    </button>
                  </button> :

                  <div className='flex items-center gap-2 bg-blue-200 pr-2 pb-2 rounded w-fit self-start ml-1'>
                    <FaInfo style={{ fontSize: 16, color: 'black' }} />
                    <h3 className=''>Please select a community</h3>
                  </div>
              }

              <input
                className='bg-gray-200 px-4 py-2 rounded'
                placeholder={selectedOrg === null ? 'Please select a community' : 'Add a title for your issue'}
                value={issueTitle}
                onChange={e => setIssueTitle(e.target.value)}
                disabled={selectedOrg === null ? true : false}
              />

              <textarea
                className='bg-gray-200 px-4 py-2 rounded'
                placeholder={selectedOrg === null ? 'Please select a community' : 'Add a description for your issue'}
                style={{
                  maxHeight: 90,
                  height: 'auto',
                }}
                value={issueDescription}
                onChange={e => setIssueDescription(e.target.value)}
                disabled={selectedOrg === null ? true : false}
              ></textarea>

              <button disabled={isRaiseIssueLoading} onClick={() => createIssue()} className='flex space-x-2 items-center bg-[#2DABB1] self-start px-8 py-2 rounded-full  '>
                <h3 className='text-white font-semibold'>{isRaiseIssueLoading ? 'Please wait...' : 'Raise Issue'}</h3>
                <IoSend style={{ fontSize: 16, color: 'white' }} />
              </button>
            </div>
          )
      }
    </div>
  )
}

export default CreateIssue
