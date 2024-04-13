import { Avatar, Card, Button } from "react-daisyui";
import {useState, useEffect} from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { IoLocation } from "react-icons/io5";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const TwoItemCarousel = ({ topMentors }) => {
    // Function to group the mentor list into chunks of 2
    const chunkArray = (arr, chunkSize) => {
      let result = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
      }
      return result;
    };
    // Group mentors into chunks of 2
    const mentorPairs = chunkArray(topMentors, 2);
  
    return (
        <>
        <Carousel autoPlay axis="vertical" interval={3000} infiniteLoop dynamicHeight className="h-40">
        {mentorPairs.map((pair, index) => (
          <table key={index} className="h-32"> {/* Use a table for each carousel slide */}
            <tbody className="space-y-3">
              {pair.map(mentor => (
                <tr key={mentor.id}>
                  <td><Avatar src={mentor.image} size='xs' /></td>
                  <td className="pl-4">
                    <div className="font-bold text-left">{mentor.username}</div>
                    <div className="text-xs text-left">{mentor.title}</div>
                  </td>
                  <td className="absolute flex ml-4 text-xs right-2">
                    <span className="mt-3 mr-1 text-lg"><IoLocation /></span>
                    <span className="mt-3">{mentor.city}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        ))}
        </Carousel>
      </>
    );
  };
  
  
export default function MentorPreview() {
    const [topMentors, setTopMentors] = useState([[]]);
    // const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
      // 프로필 이미지 URL을 가져오는 함수
      const fetchUserData = async () => {
        let arr = []
        try {
            for (var i=1; i < 9; i++){
              const response = await fetch('https://dummyjson.com/users/'+i); // 실제 API URL 사용
              const data = await response.json();
              var mentor = new Object();
              mentor.id = data['id'];
              mentor.username = data['username']
              mentor.title = data['company']['title'];
              mentor.image = data['image'];
              mentor.city = data['address']['city'];
              arr.push(mentor);
            }
          setTopMentors(arr);
        } catch (error) {
          console.error('프로필 이미지를 가져오는 데 실패했습니다.', error);
        }
      };
      fetchUserData();
    }, []);
    return (
        <>
        <div className="lg:mt-3">
        <h2 className="mb-3 ml-1 text-xl font-bold text-left text-gray-700">Top Mentors</h2>
        <Card className="w-full h-40 text-gray-500 shadow-xl bg-gray-50 card-compact">
            <Card.Body>
              <TwoItemCarousel topMentors={topMentors}/>
        </Card.Body>
        </Card>
        </div>

        </>
    );
}