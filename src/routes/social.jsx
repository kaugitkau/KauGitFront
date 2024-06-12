import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Button, Badge, Avatar, Dropdown } from 'react-daisyui';
import { FaComment, FaThumbsUp, FaPlus } from 'react-icons/fa';
import { MdLocationOn, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { TbPhoto } from 'react-icons/tb';
import Layout from '../main/Layout';

const POSTS_PER_PAGE = 5;

const CommunityPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/community/allpost'); // API URL을 여기에 넣습니다.
        const data = response.data.previewDtoList;
        setPosts(data);
        setTotalPages(Math.ceil(data.length / POSTS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId) => {
    navigate(`/details/${postId}`);
  };

  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="w-full h-full py-20 text-left md:px-4 md:py-8">
      <div className="px-2">
        <h1 className="mb-4 font-mono text-2xl font-semibold tracking-wide text-cyan-500">COMMUNITY</h1>
        <div className="justify-between flex-none mb-6 tracking-wide md:flex">
          <p className="px-2 mt-2 mb-4 font-mono text-sm tracking-tight text-neutral-600 md:px-0 md:mb-0">What's happening around your region?</p>
          <Dropdown className="mr-2">
            <Dropdown.Toggle button={false}>
              <Button className="flex justify-between px-4 text-xs text-left rounded-full md:px-5 w-28 md:w-32 md:text-md h-9 btn-sm bg-cyan-300 bg-opacity-40">
                <span>Newest</span>
                <MdOutlineKeyboardArrowDown className="text-sm"/>
              </Button>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-32 mt-2 bg-white rounded-md">
              <Dropdown.Item>Views</Dropdown.Item>
              <Dropdown.Item>Likes</Dropdown.Item>
              <Dropdown.Item>Comments</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div>
        {currentPosts.map((post) => (
          <div key={post.postingId} className="p-4 px-6 mb-3 bg-white border-4 md:p-3 md:px-5 rounded-xl border-neutral-100">
            <div onClick={() => handlePostClick(post.postingId)}>
              <div className="flex my-1 mb-2 text-gray-500">
                <span className="mr-2 text-xl text-gray-300 md:text-3xl"><TbPhoto /></span>
                <h2 className="font-bold text-md md:text-lg">{post.title}</h2>
              </div>
              <p className="text-sm text-gray-600 md:text-md">{post.description}</p>
              <div className="items-center justify-between mt-2 mb-2 md:flex">
                <div className="text-xs text-gray-400 md:text-md">
                  <span className="flex">
                    <span className="flex">
                      <MdLocationOn className="mt-2 mr-1"/>
                      <span className='mt-1'>{post.region}</span>
                    </span>
                    <span className="mt-1 ml-2">{new Date(post.createdAt).toLocaleString()}</span>
                  </span>
                </div>
                <div className="flex items-center justify-start my-2 ml-1 space-x-3 text-gray-400 md:justify-end md:my-0 md:ml-0">
                  <div className="flex items-center space-x-1 text-xs md:text-md">
                    <FaComment />
                    <span>{post.commentCount}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs md:text-md">
                    <FaThumbsUp />
                    <span>{post.recommendedCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6">
        <a href='./write' alt=''>
          <Button shape="circle" className="fixed shadow-md btn-md md:btn-lg bottom-24 right-12 md:bottom-15 md:right-10 bg-cyan-400 hover:bg-cyan-500"><FaPlus className="text-lg text-white md:text-2xl"/>
          </Button>
        </a>
        <div className="flex justify-center w-full h-32 mt-8 mb-16">
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                className={`join-item ${currentPage === index + 1 ? 'bg-cyan-500 bg-opacity-50' : 'bg-slate-100'}`}
                active={currentPage === index + 1}
                onClick={() => handleClick(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default function SocialBoard() {
  return (
    <Layout Content={<CommunityPage />} />
  );
}
