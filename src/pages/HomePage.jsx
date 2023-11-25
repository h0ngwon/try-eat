import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import likeIt from '../assets/찜하기.png';
import { db } from '../shared/firebase';
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router';
import soso from '../assets/안찜하기.png';
import { getAuth } from '@firebase/auth';
import { auth } from '../shared/firebase';
//auto scroll 자동으로 스크롤을 내려줌

const HomePage = () => {
    const [fbDB, setFbDB] = useState([]);
    useEffect(() => {
        const fetchCard = async () => {
            //최신순정렬
            const q = query(collection(db, 'Post'), orderBy('timestamp', 'desc'));
            const docSnap = await getDocs(q);
            const fbdata = docSnap.docs.map((doc) => doc.data());
            setFbDB(fbdata);
        };
        fetchCard();
    }, []);
    const navigate = useNavigate();
    const onHandleNavigate = (id) => {
        navigate(`/detailpage/${id}`);
    };
    //로그인한 유저의 정보 Authentication
    const currentUser = auth.currentUser;
    console.log('currentUser', currentUser);
    //닉네임으로 userInfo 에서 닉네임으로 likelist가져오기

    //현재 로그인한 유저의 userInfo  FireStore
    const [currentUserInfo, setCurrentUserInfo] = useState({});
    console.log('userinfo', currentUserInfo);

    useEffect(() => {
        if (currentUser) {
            console.log('여이따');
            const fetchLikeList = async () => {
                const userRef = doc(db, 'userInfo', currentUser.displayName);
                const userInfo = await getDoc(userRef);
                setCurrentUserInfo(userInfo.data());
            };
            fetchLikeList();
        }
        console.log('커런트찾음!');
    }, [currentUser]); //최초 읽을때 auth.

    //닉네임으로 userInfo에 likeList 넣기, 업데이트하기

    const onHandleLike = (e, item) => {
        e.stopPropagation(); //버블링 방지
        //비로그인시 방지
        if (auth.currentUser === null) return;

        const likListRef = doc(db, 'userInfo', currentUser.displayName);
        let updateData = {};
        let updateLikeState = [];
        if (!currentUserInfo.likeList) {
            console.log('none');

            updateData = {
                ...currentUserInfo,
                likeList: [item.id]
            };
            updateLikeState = [item.id];
        } else if (currentUserInfo.likeList.includes(item.id)) {
            updateData = {
                ...currentUserInfo,
                likeList: arrayRemove(item.id) //배열에 제거해주는 함수
            };
            updateLikeState = currentUserInfo.likeList.filter((like) => {
                console.log('rm item', item.id);
                console.log('rm like', like);
                return like === item.id ? '' : like;
            });
        } else {
            console.log('add', item.id);

            updateData = {
                ...currentUserInfo,
                likeList: arrayUnion(item.id) || [] //배열에 추가해주는 함수
            };
            updateLikeState = [...currentUserInfo.likeList, item.id];
            // currentUserInfo.likeList.push(item.id);
            // updateLikeState =
            // console.log(currentUserInfo.likeList, updateLikeState);
        }
        const updateUserInfo = { ...currentUserInfo, likeList: [...updateLikeState] };

        // const updateUserInfo = { ...currentUserInfo, likeList: [...currentUserInfo.likeList] };
        console.log('==================================');

        console.log('state', updateLikeState);
        setCurrentUserInfo(updateUserInfo);
        // console.log('bbbbbbbbbbbbbbb', currentUserInfo.likeList);
        console.log(likListRef, updateData);
        updateDoc(likListRef, updateData);

        // console.log(item.like);
        // const updateLike = async () => {
        //     await updateDoc(doc(db, 'article', `${item.id}`), { like: !item.like });
        // };
        // const likechage = fbDB.map((obj) => {
        //     return obj.id === item.id ? { ...obj, like: !obj.like } : obj;
        // });
        // setFbDB(likechage);
        // updateLike();
    };

    return (
        <>
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
                                $img={itme.image}
                                onClick={(e) => {
                                    onHandleNavigate(itme.id);
                                }}
                            >
                                <CardImgWrap>
                                    <img
                                        src={itme.image}
                                        alt='이미지'
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </CardImgWrap>
                                <CardTextWrap>
                                    <CardTitle>{itme.title}</CardTitle>
                                    <CardContent>{itme.content}</CardContent>
                                </CardTextWrap>
                                <LikeWrap onClick={(e) => onHandleLike(e, itme)}>
                                    <Like src={likeIt} />
                                    {/* {JSON.parse(itme.like) ? <Like src={likeIt} /> : <Like src={soso} />} */}
                                </LikeWrap>
                            </CardList>
                        );
                    })}
                </Container>
                <TopBtn
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }}
                >
                    TOP
                </TopBtn>
            </main>
        </>
    );
};

export default HomePage;
const TopBtn = styled.button`
    background-color: #e14d2a;
    position: fixed;
    right: 2.5rem;
    bottom: 4rem;
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
`;

const CardTextWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
`;
const CardContent = styled.p`
    width: 90%;
    padding: 0 20px;
    position: absolute;
    bottom: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 30px;
`;
const CardTitle = styled.p`
    width: 90%;
    font-size: 50px;
`;
const CardImgWrap = styled.figure`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
`;
const LikeWrap = styled.figure`
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
        transition: all 0.3s ease-in-out;
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
    min-width: 200px;
    position: relative;
    border: 3px solid #e14d2a;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

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
    &:hover {
        transform: scale(1.05);
    }
`;
const Like = styled.img`
    width: 100%;
    object-fit: cover;
`;
