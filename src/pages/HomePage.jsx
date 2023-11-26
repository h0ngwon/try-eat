import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { db } from '../shared/firebase';
import { useDispatch, useSelector } from 'react-redux';

import {
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
import { auth } from '../shared/firebase';
import Like from '../components/Like';
import Loading from '../components/ui/Loading';
import { done, load } from '../redux/modules/loadingReducer';
//auto scroll 자동으로 스크롤을 내려줌

const HomePage = () => {
    //post의 likebox
    const [post, setPost] = useState([]);
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.loadingReducer.isLoading);
    useEffect(() => {
        const fetchCard = async () => {
            //최신순정렬
            dispatch(load());
            const q = query(collection(db, 'Post'), orderBy('timestamp', 'desc'));
            const docSnap = await getDocs(q);
            const postData = docSnap.docs.map((doc) => doc.data());
            setPost(postData);
            dispatch(done());
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
        if (!currentUser) return;

        const fetchLikeList = async () => {
            //여기에러
            const userRef = doc(db, 'userInfo', currentUser.displayName);
            const userInfo = await getDoc(userRef);
            if (userInfo.exists() && userInfo.data()) {
                console.log('fetch!!!!!!!!', userInfo.data);

                setCurrentUserInfo(userInfo.data());
            }
            console.log('fetch!!!!!!!!', userInfo);
        };

        fetchLikeList();
        console.log('커런트찾음!');
    }, [currentUser]); //최초 읽을때 auth.

    const onHandleLike = (e, item) => {
        e.stopPropagation(); //버블링 방지

        //비로그인시 방지
        if (auth.currentUser === null) return;

        const userLikListRef = doc(db, 'userInfo', currentUser.displayName);
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
            console.log('rm item', item.id);

            updateData = {
                ...currentUserInfo,
                likeList: arrayRemove(item.id) //배열에 제거해주는 함수
            };
            updateLikeState = currentUserInfo.likeList.filter((like) => {
                return like === item.id ? '' : like;
            });
        } else {
            console.log('add', item.id);

            updateData = {
                ...currentUserInfo,
                likeList: arrayUnion(item.id) || [] //배열에 추가해주는 함수
            };
            updateLikeState = [...currentUserInfo.likeList, item.id];
        }
        const updateUserInfo = { ...currentUserInfo, likeList: [...updateLikeState] };

        setCurrentUserInfo(updateUserInfo);
        updateDoc(userLikListRef, updateData);
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
                {isLoading ? (
                    <Loading />
                ) : (
                    <Container>
                        {post.map((item) => {
                            return (
                                <CardList
                                    key={item.id}
                                    $img={item.image}
                                    onClick={(e) => {
                                        onHandleNavigate(item.id);
                                    }}
                                >
                                    <CardImgWrap>
                                        <img
                                            src={item.image}
                                            ß
                                            alt='이미지'
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </CardImgWrap>
                                    <ImgCover></ImgCover>
                                    <CardTextWrap>
                                        <CardTitle>{item.title}</CardTitle>
                                        <CardContent>{item.content}</CardContent>
                                    </CardTextWrap>
                                    <LikeWrap onClick={(e) => onHandleLike(e, item)}>
                                        <Like currentUserInfo={currentUserInfo} item={item} />
                                    </LikeWrap>
                                </CardList>
                            );
                        })}
                    </Container>
                )}
                <TopBtn
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }}
                >
                    ↑
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
    border-style: none;
    color: white;
    font-size: 20px;
    height: 3.5rem;
    width: 3.5rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.2s;
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
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 90%;
    height: 72%;
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-family: GmarketSansLight;
    color: white;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`;
const CardTitle = styled.p`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 90%;
    height: 57%;
    font-size: 42px;
    color: white;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
    font-family: GmarketSansMedium;
`;
const CardImgWrap = styled.figure`
    position: absolute;
    width: 100%;
    height: 100%;
    /* opacity: 0.8; */
`;

const ImgCover = styled.figure`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.8));
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
    margin: 150px 50px 50px 50px;
    padding: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
`;

const CardList = styled.li`
    min-width: 200px;
    position: relative;
    border-style: none;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

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
        transition: all 0.5s;
    }
`;
