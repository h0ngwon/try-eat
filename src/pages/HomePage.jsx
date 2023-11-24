import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import likeIt from '../assets/찜하기.png';
import { db } from '../shared/firebase';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router';
import soso from '../assets/안찜하기.png';
//auto scroll 자동으로 스크롤을 내려줌

const HomePage = () => {
    const [fbDB, setFbDB] = useState([]);
    const [heart, setHeart] = useState();
    const [isLoading, setIsLoading] = useState(false);
    console.log(fbDB);
    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            //최신순정렬
            const q = query(collection(db, 'article'), orderBy('timestamp', 'desc'));
            const docSnap = await getDocs(q);
            const fbdata = docSnap.docs.map((doc) => doc.data());
            setFbDB(fbdata);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    const onHandleNavigate = (e, id) => {
        console.log('target', e.target);
        console.log('current', e.currentTarget);
        // if (e.target !== e.currentTarget) {
        navigate(`/detailpage/${id}`);
        // }
    };
    //////id를 doc의 아이디로 쓰자!@
    const onHandleLike = (e, item) => {
        e.stopPropagation(); //버블링 방지
        console.log(item.like);
        const updateLike = async () => {
            await updateDoc(doc(db, 'article', `${item.id}`), { like: !item.like });
        };
        const likechage = fbDB.map((obj) => {
            return obj.id === item.id ? { ...obj, like: !obj.like } : obj;
        });
        setFbDB(likechage);
        updateLike();
    };
    useEffect(() => {
        const loading = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(loading);
    }, []);

    return (
        <>
            {!isLoading ? (
                <p
                    style={{
                        margin: '100px',
                        fontSize: '10rem'
                    }}
                >
                    맛집 추천중...
                </p>
            ) : (
                <main
                    style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <button
                        style={{
                            marginTop: '100px'
                        }}
                        onClick={() => {
                            navigate('/editDetail');
                        }}
                    >
                        글쓰기
                    </button>
                    <Container>
                        {fbDB.map((itme) => {
                            return (
                                <CardList
                                    key={itme.id}
                                    style={{
                                        backgroundColor: 'yellow',
                                        border: '3px solid red'
                                    }}
                                    onClick={(e) => {
                                        onHandleNavigate(e, itme.id);
                                    }}
                                >
                                    <figure>
                                        <img
                                            src={itme.image}
                                            alt='이미지'
                                            style={{
                                                maxWidth: '100%'
                                            }}
                                        />
                                    </figure>
                                    <p>{itme.title}</p>
                                    <p>{itme.content}</p>
                                    <LikeWrap onClick={(e) => onHandleLike(e, itme)}>
                                        {JSON.parse(itme.like) ? <Like src={likeIt} /> : <Like src={soso} />}
                                    </LikeWrap>
                                </CardList>
                            );
                        })}
                    </Container>
                    <button
                        style={{
                            position: 'fixed',
                            right: '4rem',
                            bottom: '4rem',
                            borderRadius: '50%',
                            height: '5rem',
                            width: '5rem'
                        }}
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'smooth'
                            });
                        }}
                    >
                        TOP
                    </button>
                </main>
            )}
        </>
    );
};

export default HomePage;
const LikeWrap = styled.figure`
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
        transition: 1.2s;
    }
`;

const Container = styled.ul`
    width: 80%;
    margin: 50px;
    padding: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
`;

const CardList = styled.li`
    position: relative;

    min-height: 400px;
    &:nth-child(10n + 1),
    :nth-child(10n + 4),
    :nth-child(10n + 7),
    :nth-child(10n + 10) {
        grid-column: auto/span 2;
    }
    &:nth-child(10n + 3) {
        grid-row: auto/ span 2;
    }
    cursor: pointer;
`;
const Like = styled.img`
    width: 100%;
    object-fit: cover;
`;
