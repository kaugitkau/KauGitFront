import React from 'react';
import Layout from '../main/Layout';
import CreatePost from '../main/components/createPost';

export default function Write() {
    return (
        <Layout Content={ <CreatePost /> } />
    );
}
