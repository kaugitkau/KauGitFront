import React, { useEffect, useState } from 'react';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { FaStar } from 'react-icons/fa';
import { Pagination, Button } from 'react-daisyui';

function SharingBox({ filteredProductList, loading, toggleLike, likedItems }) {
  if (loading) return <><span className="flex justify-center align-middle"><span className="loading loading-spinner loading-lg"></span><span className='mt-2 ml-3 text-xl'>Loading</span></span></>; // use your loading state or component

  return (
    <div className="w-full px-2">
      <div className="flex flex-wrap items-start justify-start w-full h-full gap-4 overflow-x-auto overflow-y-scroll">
        {filteredProductList.map((product, index) => (
          <div key={product.id} className={`w-full my-2 flex md:block rounded-lg overflow-hidden md:w-[31%]`}>
            <div className="relative w-1/3 md:w-full">
              <img
                src={product.thumbnail}
                alt='product'
                className='object-cover w-full h-32 md:h-64'
              />
              <button
                onClick={() => toggleLike(product.id)}
                className='absolute top-4 right-4'
              >
                <RiHeartLine className={`absolute top-0 right-0 text-2xl ${likedItems.includes(product.id) ? 'hidden' : 'text-white opacity-80'}`} />
                <RiHeartFill className={`absolute top-0 right-0 text-2xl ${likedItems.includes(product.id) ? 'text-red-400 opacity-80' : 'text-gray-500 opacity-30'}`} />
              </button>
            </div>
            <div className="relative flex flex-col justify-between w-2/3 p-4 text-left md:w-full">
              <div className="flex items-center">
                <FaStar color="red" />
                <div className="text-yellow-500">{/* 별점 */}</div>
                <span className="ml-1 font-medium text-neutral-500">{product.rating}</span>
                <span className="ml-2 text-gray-400">(
                  {product.reviewCount > 0 ? product.reviewCount : '0 '}
                reviews)</span>
              </div>
              <div className="mt-1 font-semibold text-gray-700 text-md">
                {product.description.length > 25 ? product.description.substring(0, 40) + '...' : product.description}
              </div>
              <div className="mt-1 font-medium text-md text-neutral-700">
                <span className='font-semibold'>${product.price}</span> / night
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// root route
export default function SharingBoard() { // Home Dashboard
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [sortOption, setSortOption] = useState('latest');

  const applySorting = (products) => {
    let sortedProducts = [...products];
    if (sortOption === 'priceAsc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'popularity') {
      sortedProducts.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortOption === 'rating') {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'latest') {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return sortedProducts;
  };

  useEffect(() => {
    const sortedProducts = applySorting(productList);
    setFilteredProductList(sortedProducts);
    setCurrentPage(1); // 필터가 변경될 때 페이지를 1로 설정
  }, [sortOption, productList]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleLike = (id) => {
    setLikedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const getProducts = async () => {
    setLoading(true);

    await fetch('https://dummyjson.com/products?limit=50') // Get 50 products for pagination
      .then(res => res.json())
      .then(data => {
        setProductList(data.products.map(product => ({ ...product, createdAt: new Date() }))); // Add createdAt field for sorting
        setFilteredProductList(data.products);
      })
      .catch(err => alert(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProductList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProductList.length / itemsPerPage);

  return (
    <>
      <div className="w-full text-left">
        <div className="mb-5">
          <h1 className="mb-4 font-mono text-2xl font-semibold tracking-wide text-cyan-500">Sharing</h1>
          <p className="font-mono tracking-tight text-md text-neutral-600">Exchange or rent local housings from peers!</p>
        </div>
        <div className="flex w-full overflow-x-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex h-8 py-1 pl-2 pr-3 bg-white border border-gray-300 rounded-full w-fit border-1"
          >
            <HiOutlineAdjustmentsHorizontal className="mt-1 mb-2 mr-1 text-gray-600 text-md text-opacity-80" />
            <span className="font-medium text-gray-600 text-md text-opacity-80">Filters</span>
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
                onClick={() => setSortOption('priceAsc')}
                className={`flex h-8 px-2 py-1 mr-2 bg-white border border-gray-300 rounded-full cursor-pointer transition-all duration-300 ${sortOption === 'priceAsc' ? 'bg-gray-300 bg-opacity-60 border-neutral-900 text-neutral-800' : 'border-gray-300 text-gray-600'}`}
              >
                <span className="font-medium text-md">Price: Low to High</span>
              </div>
              <div
                onClick={() => setSortOption('popularity')}
                className={`flex h-8 px-2 py-1 mr-2 bg-white border border-gray-300 rounded-full cursor-pointer transition-all duration-300 ${sortOption === 'popularity' ? 'bg-gray-300 bg-opacity-60 border-neutral-900 text-neutral-800' : 'border-gray-300 text-gray-600'}`}
              >
                <span className="font-medium text-md">Popularity</span>
              </div>
              <div
                onClick={() => setSortOption('rating')}
                className={`flex h-8 px-2 py-1 mr-2 bg-white border border-gray-300 rounded-full cursor-pointer transition-all duration-300 ${sortOption === 'rating' ? 'bg-gray-300 bg-opacity-60 border-neutral-900 text-neutral-800' : 'border-gray-300 text-gray-600'}`}
              >
                <span className="font-medium text-md">Rating</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between px-2 mt-4">
          <div>
            <span className="inline-block mt-1 font-mono font-medium tracking-tight align-top text-md text-cyan-500">Recommendation for you</span>
          </div>
          <div className="flex items-center">
            <span className='mt-1 mr-2 font-medium text-right text-md text-neutral-600 text-mono'>Show({filteredProductList.length})</span>
            <div className="items-center hidden md:flex">
              <Button
                className="join-item btn-ghost disabled:bg-transparent disabled:text-gray-300"
                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </Button>
              <span className="mx-2">{currentPage}</span>
              <Button
                className="join-item btn-ghost disabled:bg-transparent disabled:text-gray-300"
                onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='items-center justify-center w-full py-5'>
        <div className='w-full h-[85%]'>
          <SharingBox filteredProductList={currentItems} loading={loading} toggleLike={toggleLike} likedItems={likedItems} />
          <div className="flex justify-center mt-8 mb-12 md:hidden">
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
