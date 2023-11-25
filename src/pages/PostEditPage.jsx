import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostEdit from '../components/PostEdit';

function PostEditPage() {
    const navigate = useNavigate();

    return (
        <div>
            <PostEdit navigate={navigate} />
        </div>
    );
}

export default PostEditPage;
