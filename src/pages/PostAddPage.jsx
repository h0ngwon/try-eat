import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostAdd from '../components/PostAdd';
import { auth } from '../shared/firebase';

const PostAddPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('user', user);
            // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
        });
    }, []);

    return (
        <div>
            <PostAdd navigate={navigate} />
        </div>
    );
};

export default PostAddPage;
