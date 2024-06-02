import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-daisyui';
// import Card.Actions from 'react-daisyui/dist/Card/CardActions';
import { FaHeart, FaArrowRight, FaFireAlt } from 'react-icons/fa';

export default function PostingPreview() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/posts');
                const data = await response.json();
                setPosts(data.posts.slice(0,3)); // 최대 10개의 게시글만 표시
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다.', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mt-3">
        <Card className="w-full mt-4 text-gray-500 shadow-xl bg-gray-50 card-compact">
            <Card.Body>
                <Card.Title className="flex justify-between">
                <h2 className='flex text-left text-slate-600'><span className='mt-1 mr-2'><FaFireAlt /></span>Community</h2>
                <Card.Actions>
                    <Button color="ghost text-right" size="sm"><FaArrowRight/></Button>
                </Card.Actions> 
                </Card.Title>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Likes</th> 
                                {/* Likes */}
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.title}
                                    <span class="space-x-2 flex ml-5 mt-2">
                                    {post.tags.map((tag) => <span class="badge badge-ghost opacity-50 bg-gray-200 text-xs badge-sm text-gray-800">{tag}</span>)}</span>
                                    </td>
                                    <td class="text-xs">
                                        <FaHeart className="inline mr-1 text-red-400"/><span className='text-red-500'>{post.reactions.likes}</span>
                                    </td>
                                    {/* <td>{post.userId}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card.Body>
        </Card>
        </div>
        
    );
}
