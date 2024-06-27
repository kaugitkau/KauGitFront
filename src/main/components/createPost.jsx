import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiMapPin, FiUpload, FiTrash, FiX } from 'react-icons/fi';
import { Button, Input, Checkbox, Select, Textarea, Modal } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';

const locations = {
  서울: ['서울대', '홍대', '연세대'],
  경기: ['가천대', '항공대', '인하대']
};

export default function CreatePost({ defaultLocation = '서울' }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');
  const [hideProfile, setHideProfile] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [location, setLocation] = useState(defaultLocation);
  const [subLocation, setSubLocation] = useState(locations[defaultLocation][0]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef(null);

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag !== '' && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handlePhotoUpload = (e) => {
    const uploadedPhotos = Array.from(e.target.files);
    const photoPreviews = uploadedPhotos.map(photo => ({
      file: photo,
      preview: URL.createObjectURL(photo),
    }));
    setPhotos([...photos, ...photoPreviews]);
  };

  const handlePhotoDelete = (photoToDelete) => {
    setPhotos(photos.filter(photo => photo.file !== photoToDelete.file));
    URL.revokeObjectURL(photoToDelete.preview);
  };

  const handleSubmit = async () => {
    const postData = {
      title,
      content,
      hashTags: tags
    };
    console.log('Sending postData to server:', postData); // 로그 추가
    try {
      const response = await axios.post('/hanzoomApi/community', postData);
      console.log('Post successful:', response.data);
      alert('글 등록이 완료되었습니다!');
      navigate(-1); // 이전 페이지로 돌아감
    } catch (error) {
      console.error('Error posting data:', error);
      if (error.response && error.response.data && error.response.data.includes('<title>Please sign in</title>')) {
        setErrorMessage('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        setTimeout(() => {
          navigate('/signin'); // 로그인 페이지로 이동
        }, 2000);
      } else {
        setErrorMessage('글 등록 중 오류가 발생했습니다. 다시 시도해 주세요.'); // 오류 메시지 설정
      }
    }
  };

  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    return `${name.slice(0, maxLength)}...`;
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    setSubLocation(locations[selectedLocation][0]);
  };

  const handleSubLocationChange = (e) => {
    setSubLocation(e.target.value);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  useEffect(() => {
    const modal = modalRef.current;

    if (!modal) return;

    let scale = 1;
    const zoomHandler = (event) => {
      event.preventDefault();
      const delta = event.deltaY ? -event.deltaY : event.wheelDelta ? event.wheelDelta : -event.detail;
      scale += delta * 0.01;
      scale = Math.min(Math.max(0.5, scale), 5);
      modal.style.transform = `scale(${scale})`;
    };

    modal.addEventListener('wheel', zoomHandler);

    return () => {
      modal.removeEventListener('wheel', zoomHandler);
    };
  }, [isModalOpen]);

  return (
    <div className="max-w-3xl my-20 md:my-0 pb-32 md:pb-10 p-6 mx-auto bg-white rounded-lg shadow-lg md:p-8 lg:p-10">
      <h1 className="text-3xl font-bold text-gray-900">Create a New Post</h1>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Write your title here..."
        className="w-full p-4 mt-6 border border-gray-300 rounded-lg"
      />

      <div className="mt-6">
        <div className="flex items-center space-x-4">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a tag"
            className="flex-grow p-4 border border-gray-300 rounded-lg"
          />
          <Button onClick={handleAddTag} className="p-4 text-white rounded-lg bg-cyan-500 hover:bg-cyan-600">
            +
          </Button>
        </div>
        <div className="flex flex-wrap mt-4 space-x-2">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-full text-cyan-700 bg-cyan-100">
              <span>{tag}</span>
              <button onClick={() => handleDeleteTag(tag)} className="ml-2">
                <FiX className="text-cyan-700" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="md:flex mt-2 text-left justify-between items-center">
        <div className="flex items-center space-x-4 md:my-0 my-4">
          <FiMapPin className="text-gray-500" />
          <span className="text-gray-700">Update Location</span>
        </div>
        <div className="flex space-x-4">
          <Select
            value={location}
            onChange={handleLocationChange}
            className="w-1/2 md:w-32 p-2 px-5 border border-gray-300 rounded-lg"
          >
            {Object.keys(locations).map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </Select>
          <Select
            value={subLocation}
            onChange={handleSubLocationChange}
            className="w-1/2 md:w-full p-2 px-5 border border-gray-300 rounded-lg"
          >
            {locations[location].map(subLoc => (
              <option key={subLoc} value={subLoc}>{subLoc}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-4 text-left">
        <Checkbox
          checked={hideProfile}
          onChange={() => setHideProfile(!hideProfile)}
          className="mr-2"
        />
        <span className="text-gray-700">Hide Profile</span>
      </div>

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your content here..."
        className="w-full h-40 p-4 mt-6 border border-gray-300 rounded-lg"
      ></Textarea>

      <div className="mt-6">
        <label className="flex items-center space-x-4 cursor-pointer">
          <FiUpload className="text-gray-500" />
          <span className="text-gray-700">Upload Photos</span>
          <input
            type="file"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </div>
      <div className="mt-4 space-y-4">
        {photos.map((photo, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
            <img
              src={photo.preview}
              alt="Preview"
              className="object-cover w-16 h-16 mr-4 rounded-lg cursor-pointer"
              onClick={() => openModal(photo)}
            />
            <span className="flex-grow text-sm text-gray-700">{truncateFileName(photo.file.name)}</span>
            <Button
              onClick={() => handlePhotoDelete(photo)}
              className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              <FiTrash />
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full p-4 mt-8 text-lg font-semibold text-white rounded-lg bg-cyan-500 hover:bg-cyan-600"
      >
        Post
      </Button>

      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>} {/* 오류 메시지 표시 */}

      <Modal open={isModalOpen} onClickBackdrop={closeModal} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Modal.Body className="relative p-0">
          <div className="relative flex items-center justify-center w-full p-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-hidden">
            {selectedPhoto && (
              <div className="overflow-auto max-h-[80vh] max-w-[80vw]">
                <img
                  src={selectedPhoto.preview}
                  alt="Full Preview"
                  className="object-contain w-full h-full"
                  ref={modalRef}
                />
              </div>
            )}
            <Button
              onClick={closeModal}
              className="absolute p-2 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
            >
              <FiX />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
