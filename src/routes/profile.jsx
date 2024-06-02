import React from 'react';
import Layout from '../main/Layout';
import { Button, Avatar, Badge, Progress, Rating } from 'react-daisyui';
import { FaComment, FaThumbsUp, FaStar } from 'react-icons/fa';
import { PiHeadphonesBold } from "react-icons/pi";

const ProfilePage = () => {
  return (
    <div className="min-h-screen p-2 pt-16 md:pt-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-cyan-500">PROFILE</h1>
          <Button className="ml-2 bg-transparent text-md md:text-lg text-cyan-600 text-opacity-90 btn-ghost"><PiHeadphonesBold />Support</Button>
        </div>
        <div className="relative px-4 py-12 mb-6 bg-black glass">
         <Button className="absolute top-12 right-8" size='xs'>EDIT</Button>
          <div className="items-center justify-between w-full md:flex">
          <div className="flex items-center">
          <div className="ml-2 mr-6">
            <Avatar shape='circle' size={'md'} className="md:hidden" src="https://picsum.photos/200/200" />
             <Avatar shape='circle' size={'lg'} className="hidden md:block" src="https://picsum.photos/200/200" />
          </div>
          <div className="mb-2 text-left text-white">
            <h2 className="text-xl font-semibold md:text-2xl">Dave C. Brown</h2>
            <span className='text-xs md:text-sm'>
            <p className="text-gray-400">Exchange Student in KAU</p>
            <p className="text-gray-300">@dave_brown</p>
            </span>
          </div>
          </div>
          <div className="items-center justify-end space-x-2 md:flex">
          <div className="p-2 mt-2 md:flex">
              <span className="">
              <p className="text-sm font-medium text-cyan-500">Lv.50 (PLATINUM)</p>
              <div className="flex items-center justify-center space-x-3">
                <Progress value={20000} max={30000} className="w-full bg-gray-500 md:w-64" color="accent" />
                <span className="text-sm text-gray-400">28800/30000</span>
              </div>
              </span>
            </div>
          </div>
          </div>
        </div>
        <div className="mb-4 md:h-44 md:flex md:space-x-6 md:mb-0">
        <div className='w-full md:w-1/2'>
            <div className="grid h-20 grid-cols-4 gap-4 p-6 py-2 mb-6 text-center border border-2 rounded-lg md:py-6 md:h-max">
              <div className="border-r border-r-2">
                <p className="text-xl font-bold md:text-2xl">100</p>
                <p className="text-xs">Posts</p>
              </div>
              <div className="pr-5 border-r border-r-2">
                <p className="text-xl font-bold md:text-2xl">10k</p>
                <p className="text-xs">Likes</p>
              </div>
              <div className="pr-4 border-r border-r-2">
                <p className="text-xl font-bold md:text-2xl">10k</p>
                <p className="text-xs">Mentions</p>
              </div>
              <div>
                <p className="text-xl font-bold md:text-2xl">10k</p>
                <p className="text-xs">Blog</p>
              </div>
            </div>
        </div>
        <div className='w-full space-y-2 md:h-44 md:w-1/2'>
            <div className="border border-2 rounded-lg h-18">
                <div className="flex flex-wrap items-center p-1 pl-12">
                        <span className="mr-5 space-x-2 font-serif">
                            <span className='text-2xl font-bold md:text-3xl'>30</span><span className="text-md">Buddy History</span>
                       </span>
                        <span>
                      <Rating value={9} half={true} className="mt-3 rating-sm">
                        {Array.from({ length: 10 }, (_, index) => (
                          <Rating.Item
                            key={index}
                            name="rating-10"
                            className={`bg-yellow-400 mask mask-star-2 ${
                              index % 2 === 0 ? "mask-half-1" : "mask-half-2"
                            }`}
                          />
                        ))}
                      </Rating>
                      <span className='text-neutral-400'>4.5 / 5.0</span>
                      </span>
                  </div>
            </div>
            <div className="border border-2 rounded-lg h-18">
                <div className="flex flex-wrap items-center p-1 pl-12">
                        <span className="mr-5 space-x-2 font-serif">
                            <span className='text-2xl font-bold md:text-3xl'>10</span><span className="text-md">House Shares</span>
                       </span>
                        <span>
                      <Rating value={9} half={true} className="mt-3 rating-sm">
                        {Array.from({ length: 10 }, (_, index) => (
                          <Rating.Item
                            key={index}
                            name="rating-10"
                            className={`bg-yellow-400 mask mask-star-2 ${
                              index % 2 === 0 ? "mask-half-1" : "mask-half-2"
                            }`}
                          />
                        ))}
                      </Rating>
                      <span className='text-neutral-400'>4.5 / 5.0</span>
                      </span>
                  </div>
            </div>
        </div>
        </div>
        <div className="mb-6 overflow-auto text-left md:space-x-8 md:flex md:h-70 md:px-2">
          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-between">
              <h3 className="my-3 font-semibold md:my-0 text-md md:text-lg text-cyan-500">MY COMMUNITY</h3>
              <a href="#" className="underline text-opacity-70 text-cyan-500">more</a>
            </div>
            <ul className="px-3 py-6 mt-2 space-y-1 text-xs rounded-md shadow-md h-50 md:text-sm">
              <li className="flex items-center justify-between py-1 border-b border-b-1">
                <span>Lorem ipsum dolor sit amet consectetuer.</span>
                <div className="flex items-center space-x-2 text-gray-500">
                  <span className="text-xs md:text-sm text-neutral-400">02 Jun 2021</span>
                  <span className="flex space-x-1 text-xs md:text-sm">
                      <FaComment className="text-cyan-500" />
                      <span>3</span>
                      <FaThumbsUp className="text-cyan-500" />
                      <span>3</span>
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-b-1">
                <span>Lorem ipsum dolor sit amet consectetuer.</span>
                <div className="flex items-center space-x-2 text-gray-500">
                  <span className="text-xs md:text-sm text-neutral-400">3 minutes ago</span>
                  <span className="flex space-x-1 text-xs md:text-sm">
                      <FaComment className="text-cyan-500" />
                      <span>3</span>
                      <FaThumbsUp className="text-cyan-500" />
                      <span>3</span>
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-b-1">
                <span>Lorem ipsum dolor sit amet consectetuer.</span>
                <div className="flex items-center space-x-2 text-gray-500">
                  <span className="text-xs md:text-sm text-neutral-400">2h ago</span>
                  <span className="flex space-x-1 text-xs md:text-sm">
                      <FaComment className="text-cyan-500" />
                      <span>3</span>
                      <FaThumbsUp className="text-cyan-500" />
                      <span>3</span>
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-b-1">
                <span>Lorem ipsum dolor sit amet consectetuer.</span>
                <div className="flex items-center space-x-2 text-gray-500">
                  <span className="text-xs md:text-sm text-neutral-400">3 days ago</span>
                  <span className="flex space-x-1 text-xs md:text-sm">
                      <FaComment className="text-cyan-500" />
                      <span>3</span>
                      <FaThumbsUp className="text-cyan-500" />
                      <span>3</span>
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-b-1">
                <span>Lorem ipsum dolor sit amet consectetuer.</span>
                <div className="flex items-center space-x-2 text-gray-500">
                  <span className="text-xs md:text-sm text-neutral-400">02 Jun 2021</span>
                  <span className="flex space-x-1 text-xs md:text-sm">
                      <FaComment className="text-cyan-500" />
                      <span>3</span>
                      <FaThumbsUp className="text-cyan-500" />
                      <span>3</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full mt-4 overflow-auto md:w-1/2 md:h-70 md:mt-0">
            <div className="flex items-center justify-between">
              <h3 className="my-3 font-semibold md:my-0 text-md md:text-lg text-cyan-500">BOOKMRKS</h3>
              <a href="#" className="underline text-opacity-70 text-cyan-500">more</a>
            </div>
            <ul className="px-3 py-6 mt-2 space-y-1 text-xs rounded-md shadow-md md:text-sm">
              <li className='flex items-center justify-between py-1 border-b border-b-1'>Lorem ipsum dolor sit amet consectetuer.</li>
              <li className='flex items-center justify-between py-1 border-b border-b-1'>Lorem ipsum dolor sit amet consectetuer.</li>
              <li className='flex items-center justify-between py-1 border-b border-b-1'>Lorem ipsum dolor sit amet consectetuer.</li>
              <li className='flex items-center justify-between py-1 border-b border-b-1'>Lorem ipsum dolor sit amet consectetuer.</li>
              <li className='flex items-center justify-between py-1 border-b border-b-1'>Lorem ipsum dolor sit amet consectetuer.</li>
            </ul>
          </div>
        </div>
        <div className="pb-12 md:space-x-8 md:pb-0 md:flex md:h-80">
        <div className="w-full mb-6">
          <div className="flex items-center justify-between">
            <h3 className="my-3 font-semibold md:my-0 text-md md:text-lg text-cyan-500">MY BLOG</h3>
            <a href="#" className="underline text-opacity-70 text-cyan-500">more</a>
          </div>
          <div className="grid gap-4 mt-2">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Description Top</h4>
                <Badge>hash1</Badge>
              </div>
              <p className="text-gray-500">Title</p>
              <p>Description Bottom</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Description Top</h4>
                <Badge>hash2</Badge>
              </div>
              <p className="text-gray-500">Title</p>
              <p>Description Bottom</p>
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
            <div className="mb-6">
              <div className="md:justify-between md:px-2 md:space-x-2 md:flex">
                <Button className="w-full md:w-[48%] text-white bg-blue-400 md:mb-0 mb-3">MY HOUSINGS</Button>
                <Button className="w-full md:w-[48%] text-white bg-red-400 md:mb-0 mb-3">MY GUIDINGS</Button>
              </div>
            </div>
          <h3 className="my-3 font-semibold text-left md:mb-5 md:my-0 text-md md:text-lg text-cyan-500">REQUEST</h3>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Elbert Inc.</h4>
                <p className="text-gray-500">18 July</p>
              </div>
              <div className="tooltip tooltip-left" data-tip="Details">
                <Button className="btn-circle btn-outline btn-sm">i</Button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <h4 className="font-semibold">Owen Inc.</h4>
                <p className="text-gray-500">17 July</p>
              </div>
              <div className="tooltip tooltip-left" data-tip="Details">
                <Button className="btn-circle btn-outline btn-sm">i</Button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default function ProfileBoard() {
  return (
    <Layout Content={<ProfilePage />} />
  );
}
