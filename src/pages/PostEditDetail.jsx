import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../components/CreatePost';

const PostEditDetail = () => {
    const navigate = useNavigate();

    return (
        <div>
            <CreatePost navigate={navigate} />
            <button
                style={{
                    marginTop: '100px'
                }}
                onClick={() => {
                    navigate('/');
                }}
            >
                홈으로 가기
            </button>
        </div>
    );
};

export default PostEditDetail;
