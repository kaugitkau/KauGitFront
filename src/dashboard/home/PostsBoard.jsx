import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-daisyui';
import { Carousel } from 'react-responsive-carousel';
import { FaThumbsUp, FaComment, FaBookmark } from 'react-icons/fa';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function PostsBoard() {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    fetchPosts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sortedPosts = applySorting(posts);
    setPosts(sortedPosts);
  }, [sortOption]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight * 0.7) && !loading && hasMore) {
      fetchPosts();
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    const currentPostCount = posts.length;
    try {
      const response = await axios.get(`https://dummyjson.com/posts?limit=5&skip=${currentPostCount}`);
      const postsData = response.data.posts;

      if (postsData.length === 0) {
        setHasMore(false);
      }

      const postsWithDetails = await Promise.all(
        postsData.map(async (post) => {
          const images = await fetchPostImages(post.id);
          const commentsCount = await fetchCommentsCount(post.id);
          return { ...post, images, commentsCount };
        })
      );

      setPosts((prevPosts) => [...prevPosts, ...postsWithDetails]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostImages = async (postId) => {
    try {
      // Assuming each post has multiple images
      return ['https://random.imagecdn.app/256/150', 'https://random.imagecdn.app/256/150', 'https://random.imagecdn.app/256/150'];
    } catch (error) {
      console.error('Error fetching image:', error);
      return [];
    }
  };

  const fetchCommentsCount = async (postId) => {
    try {
      const response = await fetch(`https://dummyjson.com/comments/post/${postId}`);
      const data = await response.json();
      return data.comments.length;
    } catch (error) {
      console.error('Error fetching comments count:', error);
      return 0;
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`https://dummyjson.com/comments/post/${postId}`);
      const data = await response.json();
      return data.comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const handlePostClick = async (post) => {
    setSelectedPost(post);
    setModalOpen(true);
    const comments = await fetchComments(post.id);
    setComments(comments);
  };

  const applySorting = (posts) => {
    let sortedPosts = [...posts];
    if (sortOption === 'latest') {
      sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'likes') {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === 'comments') {
      sortedPosts.sort((a, b) => b.commentsCount - a.commentsCount);
    }
    return sortedPosts;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffWeeks === 1) {
      return '1 week ago';
    } else {
      return `${diffWeeks} weeks ago`;
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container py-1 mx-auto">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex h-8 py-1 pl-2 pr-3 bg-white border border-gray-300 rounded-full w-fit border-1"
            >
              <HiOutlineAdjustmentsHorizontal className="mt-1 mb-2 mr-1 text-gray-600 text-md text-opacity-80" />
              <span className="font-medium text-gray-600 text-md text-opacity-80">Sort</span>
            </button>
            {isFilterOpen && (
              <div className="flex items-center ml-3">
                <div
                  onClick={() => setSortOption('latest')}
                  className={`flex h-8 px-2 py-1 mr-2 bg-white border border-gray-300 rounded-full cursor-pointer transition-all duration-300 ${sortOption === 'latest' ? 'bg-gray-300 bg-opacity-60 border-neutral-900 text-neutral-800' : 'border-gray-300 text-gray-600'}`}
                >
                  <span className="font-medium text-md">Latest</span>
                </div>
                <div
                  onClick={() => setSortOption('likes')}
                  className={`flex h-8 px-2 py-1 mr-2 bg-white border border-gray-300 rounded-full cursor-pointer transition-all duration-300 ${sortOption === 'likes' ? 'bg-gray-300 bg-opacity-60 border-neutral-900 text-neutral-800' : 'border-gray-300 text-gray-600'}`}
                >
                  <span className="font-medium text-md">Likes</span>
                </div>
                <div
                  onClick={() => setSortOption('comments')}
                  className={`flex h-8 px-2 py-1 mr-2 bg-white border border-gray-300 rounded-full cursor-pointer transition-all duration-300 ${sortOption === 'comments' ? 'bg-gray-300 bg-opacity-60 border-neutral-900 text-neutral-800' : 'border-gray-300 text-gray-600'}`}
                >
                  <span className="font-medium text-md">Comments</span>
                </div>
              </div>
            )}
          </div>
          <div className="font-medium text-gray-600">Total Posts: {posts.length}</div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="p-8 bg-white rounded-lg shadow md:flex-row"
            >
              <div className="flex-grow text-left">
                <div className="flex items-start justify-between mb-4 md:mb-0">
                  <div className="md:mt-3">
                    <h4 className="font-bold">{post.userid}</h4>
                    <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</p>
                  </div>
                  <div className="flex mb-4 space-x-2 md:mt-3">
                    <span className="text-xs badge bg-cyan-400 bg-opacity-80 text-neutral-700">Hot</span>
                    <span className="text-xs text-white bg-gray-500 bg-opacity-50 badge">hash1</span>
                  </div>
                </div>

                <div className="block md:hidden">
                  {post.images && (
                    <Carousel className="mt-2" showThumbs={false} showArrows={false} showIndicators={!modalOpen}>
                      {post.images.map((image, index) => (
                        <img key={index} src={image} alt="" className="rounded-lg" />
                      ))}
                    </Carousel>
                  )}
                </div>
                <div className="flex justify-between">
                  <div className="py-4">
                    <p className="mt-4 mb-4 text-sm font-semibold text-black md:text-md md:mt-0">{truncateText(post.title, 25)}</p>
                    <p className="mt-2 text-xs md:text-sm">{truncateText(post.body, 100)} <a href="#" className="text-blue-500" onClick={() => handlePostClick(post)}>see more</a></p>
                  </div>
                  <div className="hidden md:block w-[65%] max-w-80">
                    {post.images && (
                      <div className="ml-4">
                        <Carousel className="mt-2" showThumbs={false} showArrows={false} showIndicators={!modalOpen}>
                          {post.images.map((image, index) => (
                            <img key={index} src={image} alt="" className="rounded-lg" />
                          ))}
                        </Carousel>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 ml-1">
                  <div className="flex space-x-3">
                    <span className="flex items-center space-x-1 text-sm text-neutral-500 opacity-60">
                      <FaThumbsUp />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-sm text-neutral-500 opacity-60">
                      <FaComment />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>
                  <FaBookmark className="text-sm text-neutral-400"/>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
            <span className='mt-2 ml-3 text-xl'>Loading</span>
          </div>
        )}
      </div>
      {modalOpen && selectedPost && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="fixed inset-0 flex items-center justify-center text-left bg-black bg-opacity-50">
            <div className="w-3/4 max-w-lg max-h-[80%] p-4 px-6 py-4 mt-16 overflow-y-auto bg-white rounded shadow-lg">
              <h2 className="mb-2 text-xl font-bold">{selectedPost.userid}</h2>
              <p className="mb-4 text-sm text-gray-500">{formatTimeAgo(selectedPost.createdAt)}</p>
              <p className="text-lg font-semibold text-black">{selectedPost.title}</p>
              <p className="mb-4">{selectedPost.body}</p>
              {selectedPost.images && (
                <Carousel className="w-2/3 h-full pl-2 pr-2 mt-2" showThumbs={true} showArrows={false} showIndicators={true}>
                  {selectedPost.images.map((image, index) => (
                    <img className="w-full mt-2 h-28" key={index} src={image} alt="" className="rounded-lg" />
                  ))}
                </Carousel>
              )}
              <Comments comments={comments} />
              <button
                onClick={() => setModalOpen(false)}
                className="mt-4 btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

const Comments = ({ comments }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-blue-500 focus:outline-none"
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div className="mt-2 transition-all duration-300 ease-in-out transform">
          {comments.map((comment, index) => (
            <div key={index} className="p-2 mt-2 bg-gray-100 rounded-lg shadow">
              <p className="text-sm">{comment.body}</p>
              <p className="text-xs text-gray-500">- {comment.user.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
