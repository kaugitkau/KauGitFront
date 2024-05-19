import React, { useRef, useState, useCallback } from 'react';
import { Modal, Button } from 'react-daisyui';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchModal() {
  const modalRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState(['technology', 'design', 'programming', 'travel', '1234', '2345', '3456', '45678', '58888']); // 예시 태그
  const [visibleTags, setVisibleTags] = useState(tags.slice(0, 4));
  const [showAllTags, setShowAllTags] = useState(false);

  const handleShow = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleClose = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const handleTagClick = (tag) => {
    setSearchQuery(prevQuery => prevQuery + (prevQuery ? ' ' : '') + tag);
    setVisibleTags(prevVisibleTags => prevVisibleTags.filter(t => t !== tag));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // 여기서 검색 기능 구현
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleRemoveTag = (tag) => {
    setTags(prevTags => [...prevTags, tag]);
    setSearchQuery(prevQuery => prevQuery.replace(tag, '').trim());
    setVisibleTags(prevVisibleTags => prevVisibleTags.filter(t => t !== tag));
  };

  const handleToggleTags = () => {
    setShowAllTags(!showAllTags);
    setVisibleTags(showAllTags ? tags.slice(0, 4) : tags);
  };

  return (
    <div className="mx-1 font-sans">
      <Button className="btn-sm" color="ghost" shape="circle" onClick={handleShow}>
        <FaSearch className="text-lg text-white"/>
      </Button>
      <Modal ref={modalRef} className="w-full p-4 bg-white min-w-96 max-w-96">
        <form onSubmit={handleSearch} className="relative">
          <Button size="sm" color="ghost" shape="circle" className="absolute text-gray-500 right-2 top-2 hover:text-gray-700 focus:outline-none" onClick={handleClose}>
            <FaTimes />
          </Button>
          <Modal.Header className="py-5 text-lg font-bold text-center">Search</Modal.Header>
          <Modal.Body className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md h-14 focus:outline-none focus:border-blue-500"
                placeholder="What do you want to discover?"
              />
              {searchQuery && (
                <Button
                  color="ghost"
                  shape="circle"
                  className="absolute text-gray-300 right-2 top-3 btn-sm"
                  onClick={handleClearSearch}
                >
                  <FaTimes />
                </Button>
              )}
              <Button type="submit" className="w-full mb-4 text-cyan-800 bg-cyan-400 bg-opacity-85 hover:bg-cyan-500">
                <FaSearch className="mr-2" />
                Search
              </Button>
            </div>
            <div className="flex justify-center mb-3">
              {tags.length > 5 && (
                <Button
                  className="mt-2 text-xs btn-ghost btn-xs"
                  onClick={handleToggleTags}
                >
                  {showAllTags ? 'Hide' : 'Show All'} Tags
                </Button>
              )}
            </div>
            <div className="w-full max-w-md">
              <div className="flex flex-wrap items-center w-full mb-4">
                {visibleTags.map((tag, index) => (
                  <Button
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className="mb-2 mr-2 text-xs rounded-full bg-cyan-400 bg-opacity-20 btn-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </div>
  );
}
