import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { commentOnIssue, getIssueThread, getThreadComments, likeIssueComment, resetThreadCommentsState, resetThreadState } from '../../redux/slice/community/communitySlice';
import { HeartFilled, HeartOutlined, SendOutlined } from '@ant-design/icons';

const Issue = ({ selectedIssue }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const { issuethread, isIssueThreadSuccess, isIssueThreadLoading, isIssueThreadError, isIssueThreadMessage } = useSelector((state) => state.community);

  useEffect(() => {
    console.log(selectedIssue);
    selectedIssue && dispatch(getIssueThread(selectedIssue.issue_id));
  }, [selectedIssue, dispatch]);

  useEffect(() => {
    if (isIssueThreadError || isIssueThreadMessage) {
      window.alert('An error occurred. Please try again later.');
    }

    if (issuethread && isIssueThreadSuccess) {
      dispatch(getThreadComments(issuethread[0].thread_id));
    }

    dispatch(resetThreadState());
  }, [dispatch, issuethread, isIssueThreadError, isIssueThreadMessage, isIssueThreadSuccess]);

  const { threadcomments, isThreadCommentsLoading, isThreadCommentsSuccess, isThreadCommentsError, isThreadCommentsMessage, userLikeIssueComment } = useSelector((state) => state.community);

  useEffect(() => {
    if (isThreadCommentsError || isThreadCommentsMessage) {
      // Alert.alert('Unable to fetch thread comments', 'Please refresh or try again later');
    }

    dispatch(resetThreadCommentsState());
  }, [dispatch, isThreadCommentsError, isThreadCommentsMessage]);

  const [comment, setComment] = useState(null);

  const likeComment = (comment_id) => dispatch(likeIssueComment({ comment_id, client_id: user.id }));

  const addCommentToAThread = (thread_id) => {
    if (comment.trim().length === 0) return;

    dispatch(commentOnIssue({ thread_id, comment_description: comment, client_id: user.id }));

    setComment(null);
  };

  return (
    <div className='pt-8 px-3 flex-1 h-full'>
      <h1 className='text-xl font-bold'>
        {isIssueThreadLoading ? <span>Loading...</span> : (issuethread?.length > 0 && issuethread[0].issue.issue)}
      </h1>
      <h2 className='mt-2'>
        {isIssueThreadLoading ? <span>Loading...</span> : (issuethread?.length > 0 && issuethread[0].issue.description)}
      </h2>

      <div>
        {isThreadCommentsLoading ? (
          <h2>Loading comments...</h2>
        ) : (
          threadcomments &&
          threadcomments.map((comment, i) => (
            <div key={comment.comment_id} className='bg-gray-200 p-2 my-2 rounded-xl'>
              <div className='flex-row space-x-4 items-center'>
                <h1 className='font-bold'>
                  {comment.client.first_name} {comment.client.last_name}
                </h1>
              </div>
              <h2 className='mt-3'>{comment.comment_description}</h2>
              <div className='flex-row space-x-4 items-center mt-4'>
                <button data-testid='upvote-btn' onClick={() => likeComment(comment.comment_id)} className='flex-row space-x-1'>
                  <HeartFilled name='hearto' size={18} color='#2DABB1' />
                  <h2 className='font-semibold text-[#2DABB1]'>{comment.likes.length}</h2>
                </button>
              </div>
            </div>
          ))
        )}

        <div className='flex-row items-center space-x-2 h-full'>
          <textarea
            data-testd='comment-input'
            placeholder='Add your own thoughts'
            multiline={true}
            className='border border-gray-300 rounded-xl p-2 mt-2 flex-1'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            data-testid='send-btn'
            disabled={!comment}
            onClick={() => addCommentToAThread(issuethread[0].thread_id)}
            className='bg-[#2DABB1] rounded-xl p-2 flex items-center justify-center'
            style={{ width: '64px', height: '64px' }}
          >
            <SendOutlined name='send' size={24} color='white' />
          </button>
        </div>
        </div>


      {/* <div className='my-3 flex-row justify-between bg'>
        <button className='p-2'>
          <HeartOutlined name='hearto' size={100} color='#2DABB1' />
        </button>
      </div> */}
    </div>
  );
};

export default Issue;
