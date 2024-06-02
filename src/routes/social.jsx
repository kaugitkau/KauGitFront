import {React, useState} from 'react';
import { Pagination, Button, Badge, Avatar, Dropdown } from 'react-daisyui';
import { FaComment, FaThumbsUp } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { TbPhoto } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Layout from '../main/Layout';

const posts = [
  {
    id: 1,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 2,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 3,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 4,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 5,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 6,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 7,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 8,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 9,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 10,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 11,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 12,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 13,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 14,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 15,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },
  {
    id: 16,
    title: 'Foodie in busan :)',
    description: 'Looking for someone to explore 맛집 in 서면, 해운대 together ......',
    location: 'Haeundae, Busan',
    time: '11h ago',
    tags: ['tag1', 'tag1'],
    comments: 3,
    likes: 3,
  },

  // Add more posts as needed
];
const POSTS_PER_PAGE = 5;

const CommunityPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handleClick = (page) => {
    setCurrentPage(page);
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
          {currentPosts.map(post => (
            <div key={post.id} className="p-4 px-6 mb-3 bg-white border-4 md:p-3 md:px-5 rounded-xl border-neutral-100">
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
                        <span className='mt-1'>{post.location}</span>
                      </span>
                      <span className="mt-1 ml-2">{post.time}</span>
                  </span>
                </div>
                <div className="flex items-center justify-start my-2 ml-1 space-x-3 text-gray-400 md:justify-end md:my-0 md:ml-0">
                <span className="flex">
                      <div className="flex space-x-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} color="ghost" className='text-sm text-neutral-500 md:badge-sm md:text-xs badge-xs'>{tag}</Badge>
                      ))}
                    </div>
                  </span>
                <div className="flex items-center space-x-1 text-xs md:text-md">
                  <FaComment />
                  <span>{post.comments}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs md:text-md">
                  <FaThumbsUp />
                  <span>{post.likes}</span>
                </div>
              </div>
              </div>
              </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6">
          <Button shape="circle" className="fixed shadow-md btn-md md:btn-lg bottom-24 right-12 md:bottom-15 md:right-10 bg-cyan-400 hover:bg-cyan-500"><FaPlus className="text-lg text-white md:text-2xl"/></Button>
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