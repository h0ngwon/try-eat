import { doc, getDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { db } from '../shared/firebase';
import DetailMain from '../components/DetailMain';

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
            <Container>
                <DetailMain post={post} />
            </Container>
        </>
    );
}

export default DetailPage;

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 200vh;
`;
