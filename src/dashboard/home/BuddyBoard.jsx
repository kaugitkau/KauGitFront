import React, { useEffect, useState } from 'react';
import { FaUndo, FaStar, FaGlobe } from 'react-icons/fa';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdLocationOn } from "react-icons/md";
import { Pagination, Button, Rating } from 'react-daisyui';
import "/node_modules/flag-icons/css/flag-icons.min.css";

const countries = ["us", "kr", "jp", "fr", "de", "es", "it", "cn"];

function getRandomCountry() {
  return countries[Math.floor(Math.random() * countries.length)];
}

function getRandomRating() {
  return (Math.random() * 5).toFixed(1);
}

function BuddyBox({ filteredUserList, loading, currentPage, itemsPerPage }) {
  if (loading) return (
    <div className="flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
      <span className='mt-2 ml-3 text-xl'>Loading</span>
    </div>
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUserList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full gap-1 overflow-y-scroll">
        {currentItems.map((user) => (
          <div key={user.id} className='flex flex-row w-full p-4 py-4 my-1 bg-white border border-gray-200 rounded-lg shadow'>
            <div className="flex flex-col items-start w-1/3 pl-4">
              <div className="flex items-center mt-1 mb-1">
                <span className="text-xl font-semibold text-gray-800">{user.username}</span>
              </div>
              <div className="flex items-center mb-1 text-sm">
                <span className={`fi fi-${getRandomCountry()} fis mr-2`}></span>
                <span className='flex py-1 text-neutral-400 opacity-80'><FaGlobe className="mt-[0.2em] mr-1"/><span className="text-sm font-bold">EN / FN</span></span>
              </div>
              <div className="flex items-center text-xs">
                  <Rating value={Math.floor(user.rating * 2)} half={true} className="rating-sm">
                    {Array.from({ length: 10 }, (_, index) => (
                      <Rating.Item
                        key={index}
                        name="rating-10"
                        className={`bg-green-500 mask mask-star-2 ${
                          index % 2 === 0 ? "mask-half-1" : "mask-half-2"
                        }`}
                      />
                    ))}
                  </Rating>
                  <span className="ml-2 text-xs font-light text-neutral-600">({user.rating} / 5)</span>
              </div>
            </div>
            <div className="flex flex-col justify-between w-2/3 ml-4 text-left">
              <div className="mt-1 text-lg font-semibold text-gray-800">Join us for a food tour in Hongdae!</div>
              <div className="mt-1 text-sm text-gray-600">
                Seoul this weekend (5/2). Looking for 3 people. I've researched the ...
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <MdLocationOn className="mr-1 text-cyan-500" />
                <span>{user.address.city}, {user.address.state}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BuddyBoard() { // Home Dashboard
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const addCity = (city) => {
    if (!selectedCities.includes(city)) {
      setSelectedCities(prev => ([...prev, city]));
      setCurrentPage(1);
    }
  };

  const removeCity = (city) => {
    if (selectedCities.includes(city)) {
      const removedList = selectedCities.filter((item) => (item !== city));
      setSelectedCities(removedList);
      setCurrentPage(1);
    }
  };

  const resetCity = () => {
    setSelectedCities([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (selectedCities.length === 0) {
      setFilteredUserList(userList);
    } else {
      setFilteredUserList(userList.filter((item) => (selectedCities.includes(item.address.city))));
    }
  }, [selectedCities, userList]);

  const getUsers = async () => {
    setLoading(true);

    await fetch('https://dummyjson.com/users?limit=50') // Get 50 users for pagination
      .then(res => res.json())
      .then(data => {
        setUserList(data.users.map(user => ({
          id: user.id,
          username: user.username,
          company: user.company,
          image: user.image,
          address: user.address,
          rating: getRandomRating(),
          createdAt: new Date() // Add createdAt field for sorting
        })));
        setFilteredUserList(data.users);
      })
      .catch(err => alert(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const uniqueCities = [...new Set(userList.map(user => user.address.city))];

  const totalPages = Math.ceil(filteredUserList.length / itemsPerPage);

  return (
    <>
      <div className="w-full text-left">
        <h1 className="mb-4 font-mono text-2xl font-semibold tracking-wide text-cyan-500">Buddy</h1>
        <p className="font-mono text-sm tracking-tight text-neutral-600">Find your own travel companion! Go on a trip with a friend you like.</p>
        <div className="flex justify-between mt-4 mb-5">
          <div>
            <span className="inline-block mt-1 font-mono font-medium tracking-tight align-top text-md text-cyan-500">Recommendation for you</span>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-8 h-8 py-2 pl-2 pr-3 ml-3 bg-white border border-gray-300 rounded-full border-1"
            >
              <HiOutlineAdjustmentsHorizontal
                className="mb-1 text-sm text-gray-600 text-opacity-80"/>
            </button>
          </div>
          <span className='mt-1 text-sm font-medium text-right text-neutral-600 text-mono'>Show({filteredUserList.length})</span>
        </div>
        {isFilterOpen && (
          <div>
            <div className="flex pr-2 mt-1">
              <div className='relative flex items-center w-full overflow-x-auto'>
                <div className='flex items-center mb-2'>
                  {uniqueCities.map((city) => (
                    <div
                      key={city}
                      onClick={() => {
                        if (selectedCities.includes(city)) {
                          removeCity(city);
                        } else {
                          addCity(city);
                        }
                      }}
                      className={`border-cyan-500 border-2 border-opacity-55 w-fit min-w-fit h-7 mr-3 px-5 py-2 flex flex-row justify-center items-center text-sm break-keep rounded-3xl cursor-pointer transition-all duration-300 ${(selectedCities.includes(city)) ? 'border-cyan-500 bg-cyan-500 bg-opacity-70 text-white' : ' border-gray-500 bg-white text-neutral-600'} `}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => resetCity()}
                className="sticky mb-5 ml-3"
              >
                <FaUndo className="relative text-gray-500 text-opacity-50 bg-white text-md"/>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='w-full h-full'>
          <BuddyBox
            filteredUserList={filteredUserList}
            loading={loading}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <div className="flex justify-center mt-8 mb-16">
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  className={`join-item ${currentPage === index + 1 ? 'bg-cyan-500 bg-opacity-50' : 'bg-slate-100'}`}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
