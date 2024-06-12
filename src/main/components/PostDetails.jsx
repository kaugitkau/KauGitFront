import React, { useState, useEffect } from 'react';
import { FiTag, FiMapPin, FiClock, FiEdit2, FiTrash2, FiFlag } from 'react-icons/fi';
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { Carousel, Button } from 'react-daisyui';
import axios from 'axios';

export default function PostComponent({ post, isOwner = false }) {
  const [likes, setLikes] = useState(post.recommendedCnt || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://15.165.117.224:8080/myinfo', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          },
          withCredentials: true
        });
        if (response.headers['content-type'].includes('application/json')) {
          setUserInfo(response.data);
          const likeResponse = await axios.get(`http://15.165.117.224:8080/like/${post.postingId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            },
            withCredentials: true
          });
          setIsLiked(likeResponse.data.isLiked);
        } else {
          console.error('Received unexpected HTML response');
          setError('Authentication required. Please log in again.');
        }
      } catch (err) {
        if (err.response) {
          console.error('Error fetching user info:', err.response.data);
        } else if (err.request) {
          console.error('No response received:', err.request);
        } else {
          console.error('Error setting up request:', err.message);
        }
      }
    };

    fetchUserInfo();
  }, [post.postingId]);

  const handleLike = async () => {
    if (!userInfo) {
      setError('You need to log in to like this post');
      return;
    }

    try {
      const response = await axios.post(`http://15.165.117.224:8080/like/${post.postingId}`, {
        name: userInfo.name,
        email: userInfo.email,
        userId: userInfo.userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      if (response.status === 200) {
        setLikes(likes + (isLiked ? -1 : 1));
        setIsLiked(!isLiked);
      }
    } catch (err) {
      setError('Error liking the post');
      console.error(err);
    }
  };
  
  return (
    <div className="max-w-2xl p-4 mx-auto bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{post.title}</h1>
        <div className="flex items-center space-x-2">
          <button onClick={handleLike} className="flex items-center space-x-1 text-blue-500">
            {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>{likes}</span>
          </button>
          <FiTag className="text-gray-400" />
          <span className="px-2 py-1 text-blue-600 bg-blue-100 rounded-full pill">{post.tag}</span>
          <FiMapPin className="text-gray-400" />
          <span>{post.location}</span>
          <FiClock className="text-gray-400" />
          <span>{post.uploadTime}</span>
          {isOwner ? (
            <>
              <Button className="btn btn-xs btn-primary"><FiEdit2 /></Button>
              <Button className="btn btn-xs btn-danger"><FiTrash2 /></Button>
            </>
          ) : (
            <Button className="btn btn-xs btn-warning"><FiFlag /></Button>
          )}
        </div>
      </div>

      <div className="p-4 my-4 border border-gray-100 bg-gray-50">
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

        {(post.comments || []).map((comment, index) => (
          <div key={index} className="py-2 border-t">
            <div className="flex items-center justify-between">
              <span>{comment.user}</span>
              <span className="text-sm text-gray-400">{comment.time}</span>
            </div>
            <p>{comment.text}</p>
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-2 ml-4">
                {comment.replies.map((reply, idx) => (
                  <div key={idx} className="py-2 border-t">
                    <div className="flex items-center justify-between">
                      <span>{reply.user}</span>
                      <span className="text-sm text-gray-400">{reply.time}</span>
                    </div>
                    <p>{reply.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
