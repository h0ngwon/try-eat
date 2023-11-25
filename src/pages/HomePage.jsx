import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import soso from '../assets/안찜하기.png';
import likeIt from '../assets/찜하기.png';
import { db } from '../shared/firebase';
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
            const q = query(collection(db, 'Post'), orderBy('timestamp', 'desc'));
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
            await updateDoc(doc(db, 'Post', `${item.id}`), { like: !item.like });
        };
        const likechage = fbDB.map((obj) => {
            return obj.id === item.id ? { ...obj, like: !obj.like } : obj;
        });
        setFbDB(likechage);
        updateLike();
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
                <Container>
                    {fbDB.map((itme) => {
                        return (
                            <CardList
                                key={itme.id}
                                $img={itme.image}
                                onClick={(e) => {
                                    onHandleNavigate(e, itme.id);
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
                                <ImgCover></ImgCover>
                                <CardTextWrap>
                                    <CardTitle>{itme.title}</CardTitle>
                                    <CardContent>{itme.content}</CardContent>
                                </CardTextWrap>
                                {/* <LikeWrap onClick={(e) => onHandleLike(e, itme)}>
                                    {JSON.parse(itme.like) ? <Like src={likeIt} /> : <Like src={soso} />}
                                </LikeWrap> */}
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
    height: 85%;
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 17px;
    font-family: GmarketSansLight;
    color: white;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`;
const CardTitle = styled.p`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 90%;
    height: 70%;
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
const Like = styled.img`
    width: 100%;
    object-fit: cover;
`;
