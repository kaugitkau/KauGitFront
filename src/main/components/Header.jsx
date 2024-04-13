import React, { useEffect, useState, FormEvent } from 'react';
import { FaRegBell, FaPen } from 'react-icons/fa';
import { Avatar, Dropdown } from 'react-daisyui';
import SearchBox from './Search';

function Header() {
  const [userData, setUserData] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 프로필 이미지 URL을 가져오는 함수
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users/1'); // 실제 API URL 사용
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('프로필 이미지를 가져오는 데 실패했습니다.', error);
      }
    };
    fetchUserData();
  }, []);

  // // 검색 요청을 처리하는 함수
  // const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // 폼 제출 기본 동작 방지

  //   try {
  //     const response = await fetch('https://your-api-url.com/search', { // 실제 API URL 사용
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ query: searchTerm }),
  //     });
  //     const data: SearchResponse = await response.json();
  //     console.log(data); // 검색 결과 처리, 실제 사용 시 검색 결과에 맞게 변경
  //   } catch (error) {
  //     console.error('검색 요청 실패:', error);
  //   }
  // };

  return (
    <>
    <div className="px-4 h-28 navbar bg-slate-200 w-full-[52] md:pl-56">
      <div className="navbar-start">
        <SearchBox />
      </div>
      <div className="space-x-3 navbar-end">
        <button className="bg-white border-0 btn btn-circle btn-sm">
          <FaRegBell className="text-lg" />
        </button>
        <div className="hidden dropdown dropdown-end md:block">
          <Dropdown.Toggle className="btn btn-ghost btn-circle avatar btn-md" button={false}>
          <div className="w-10 rounded-full">
              <Avatar src={userData.image} />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="z-[1] menu bg-slate-50 rounded-lg w-28">
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
          </Dropdown.Menu>
        </div>
        <div className="dropdown dropdown-end">
          {/* <span>Lv.{userData.age}</span> */}
        </div>
      </div>
    </div>
    </>
  );
}

export default Header;
