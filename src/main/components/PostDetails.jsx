import React, { useState, useEffect } from 'react';
import { FiTag, FiMapPin, FiClock, FiEdit2, FiTrash2, FiFlag, FiEye } from 'react-icons/fi';
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from "react-icons/fa";
import { Carousel, Button, Modal } from 'react-daisyui';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getRelativeTime } from '../utils/dateUtils'; // Adjust the path as necessary

axios.defaults.withCredentials = true;

export default function PostComponent({ post, isOwner = false }) {
  const [postdetailId, setPostId] = useState(null);
  const [likes, setLikes] = useState(post.recommendedCnt || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportContentId, setReportContentId] = useState(null);
  const [reportContentType, setReportContentType] = useState('');
  const [reportCategory, setReportCategory] = useState('');
  const [reportReason, setReportReason] = useState('');
  const { t, i18n } = useTranslation();

  const contentTypes = [
    'Online Abuse', 'Bullying or Harassment', 'Threats', 'Impersonation',
    'Unwanted Sexual Advances (Not Image Based)', 'Violent Content',
    'Self-Harm or Suicide Content', 'Pornographic Content'
  ];

  const contentCategories = ['buddy', 'share', 'community'];

  useEffect(() => {
    if (post && post.postingId) {
      setPostId(post.postingId);
      fetchLikeStatus(post.postingId)
      fetchComments(post.postingId);
    }
  }, [post]);

  const fetchLikeStatus = async (postId) => {
    try {
      const response = await axios.get('/hanzoomApi/likeStatus', { postId : postId },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response.data);
      setIsLiked(response.data);
    } catch (error) {
      console.error('Error fetching like status', error);
    }
  };

  const handleLike = async () => {
    if (!postdetailId) {
      setError('Invalid post ID');
      console.error('Post ID is null or undefined');
      return;
    }

    try {
      const response = await axios.post(
        '/hanzoomApi/like', 
        { postId: post.postingId }, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.redirected && response.url.includes('login')) {
        setError('Please log in to like posts.');
      } else if (response.status === 200) {
        setLikes(likes + (isLiked ? -1 : 1));
        setIsLiked(!isLiked);
      } else {
        setError('Error liking the post');
      }
    } catch (err) {
      setError('Error liking the post');
      console.error(err);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`/hanzoomApi/comment/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`/hanzoomApi/comment/${postdetailId}`, { content: newComment });
      if (response.redirected && response.url.includes('login')) {
        setError('Please log in to write comment.');
      } else if (response.status === 200) {
        fetchComments(post.postingId);
        setNewComment('');
      } 
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`/hanzoomApi/comment/${commentId}`);
      if (response.status === 200) {
        fetchComments(post.postingId);
      }
    } catch (error) {
      console.error('Error deleting comment', error);
    }
  };

  const openReportModal = (contentId, contentType) => {
    setReportContentId(contentId);
    setReportContentType(contentType);
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = async () => {
    try {
      const response = await axios.post('/report/request', {
        contentId: reportContentId,
        contentType: reportContentType,
        category: reportCategory,
        reason: reportReason,
        isBanUser: true,
      });
      if (response.status === 200) {
        alert('Reported successfully');
        setIsReportModalOpen(false);
        setReportCategory('');
        setReportReason('');
      }
    } catch (error) {
      console.error('Error reporting content', error);
      alert('Error reporting the content');
    }
  };

  return (
    <div className="max-w-2xl p-8 mx-auto mt-32 bg-white rounded-md shadow-md md:mt-12 min-w-min min-h-min px-10">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{post.title}</h1>
          <div>
          {isOwner ? (
            <>
              <Button className="btn btn-xs text-lg btn-ghost text-cyan-500"><FiEdit2 /></Button>
              <Button className="btn btn-xs text-lg btn-ghost text-red-500"><FiTrash2 /></Button>
            </>
          ) : (
            <Button onClick={() => openReportModal(post.postingId, 'post')} className="btn btn-xs btn-ghost text-lg text-red-400"><FiFlag /></Button>
          )}
          </div>
        </div>

        <div className="flex flex-wrap items-center space-x-2 space-y-1">
          <button onClick={handleLike} className="mt-1 flex items-center space-x-1 text-cyan-600">
            {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>{likes}</span>
          </button>
          <span className="mt-2 flex items-center space-x-1 text-gray-500">
            <FaRegComment className='text-cyan-600' />
            <span>{comments.length}</span>
          </span>
          {post.hashtags && post.hashtags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-blue-600 bg-blue-100 rounded-full">
              <FiTag className="inline mr-1" />{tag}
            </span>
          ))}
          {post.region && (
            <>
              <FiMapPin className="text-gray-400" />
              <span>{post.region}</span>
            </>
          )}
          <FiClock className="text-gray-400" />
          <span>{getRelativeTime(post.createdAt)}</span>
          <FiEye className="text-gray-400" />
          <span>{post.viewCnt}</span>
        </div>
      </div>

      <div className="p-4 my-4 border border-gray-100 bg-gray-50 min-h-36 py-6 text-left">
        <p>{post.content}</p>
      </div>

      <Carousel className="w-full">
        {(post.images || []).map((image, index) => (
          <img key={index} src={image} alt={`carousel-${index}`} className="object-cover w-full h-64" />
        ))}
      </Carousel>

      {post.contactEnabled && (
        <div className="flex justify-end mt-4">
          <Button className="btn btn-primary">Contact</Button>
        </div>
      )}

      <div className="my-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Comments</span>
          <select className="w-32 select select-bordered select-sm">
            <option>Recent</option>
            <option>Likes</option>
          </select>
        </div>

        {comments.map((comment, index) => (
          <div key={index} className="py-2 border-t text-left flex justify-between">
            <span>
              <span className="text-xs text-cyan-600">{comment.nickName || `Anonymous${comment.writerId}`}</span>
              <p className="text-gray-600">{comment.content}</p>
            </span>
            <div className="flex items-center justify-end space-x-2">
              <span className="text-sm text-gray-400">{getRelativeTime(comment.createdDate)}</span>
              <Button onClick={() => openReportModal(comment.commentId, 'comment')} className="btn btn-xs btn-ghost"><FiFlag className='text-gray-400'/></Button>
              <Button onClick={() => handleDeleteComment(comment.commentId)} className="btn btn-xs btn-danger"><FiTrash2 /></Button>
            </div>
          </div>
        ))}
        <div className="flex mt-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 mr-2 border border-gray-300 rounded"
            placeholder="Add a comment"
          />
          <Button onClick={handleAddComment} className="btn bg-cyan-400">Post</Button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <Modal open={isReportModalOpen} onClickBackdrop={() => setIsReportModalOpen(false)} className="bg-white rounded-xl p-12 w-3/5 md:w-1/2">
        
        <span className="w-full flex justify-end">
          <Button className="btn btn-sm btn-ghost text-2xl text-gray-400" onClick={() => setIsReportModalOpen(false)}>X</Button>
        </span>  
        <Modal.Header>
          <p className='font-bold mb-10 text-2xl'>Report Content</p>
        </Modal.Header>
        
        <Modal.Body>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-red-500">Content Type</label>
              <select
                value={reportContentType}
                onChange={(e) => setReportContentType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-center"
              >
                {contentTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-red-500">Content Category</label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-center"
              >
                {contentCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-red-500">Reason</label>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-center"
                placeholder="Reason"
              />
            </div>
          </div>
        </Modal.Body>
        <div className="flex justify-center space-x-4 mt-4">
            <Button className="btn bg-red-400 btn-md" onClick={handleReportSubmit}>Submit</Button>
          </div>
      </Modal>
    </div>
  );
}
