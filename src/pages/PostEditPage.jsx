import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostEdit from '../components/PostEdit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../shared/firebase';
import { useEffect } from 'react';

const PostEditPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('user', user);
            // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
        });
    }, []);

    return (
        <div>
            <PostEdit navigate={navigate} />
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

export default PostEditPage;
