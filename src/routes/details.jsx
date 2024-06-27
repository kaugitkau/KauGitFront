import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../main/Layout';
import PostComponent from '../main/components/PostDetails';
import { useParams } from 'react-router-dom';

export default function Details() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams(); // URL 파라미터에서 postId를 받아옴
  // const postId = 1; // or get this from the route params if needed

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/hanzoomApi/community/${postId}`, { withCredentials: true });
        console.log("Post data : ");
        console.log(response.data);
        setPost(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading post: {error.message}</div>;
  }

  return (
    <Layout Content={<PostComponent post={post} isOwner={true} />} />
  );
}
