import { doc, getDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../shared/firebase';
import DetailPost from '../components/DetailPost';

function DetailPage() {
    const param = useParams();
    const [post, setPost] = useState('');
    console.log(post);

    useEffect(() => {
        // const selectedPost
        const getArticle = async () => {
            const postRef = doc(db, 'Post', param.id);
            const post = await getDoc(postRef);
            setPost(post.data());
        };
        getArticle();
    }, []);

    return (
        <>
            <DetailPost post={post} />
        </>
    );
}

export default DetailPage;
