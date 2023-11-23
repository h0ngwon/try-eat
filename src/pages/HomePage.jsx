import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
// import like from '../assets/찜하기.png';
import { db } from '../shared/firebase';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router';
// import dislike from '../assets/안찜하기.png';
//auto scroll 자동으로 스크롤을 내려줌

const HomePage = () => {
    //데이터 넣기
    // useEffect(() => {
    //     const collectionRef = collection(db, 'article');
    //     data.forEach((item) => {
    //         addDoc(collectionRef, { ...item, timestamp: serverTimestamp() });
    //     });
    // }, []);
    const [fbDB, setFbDB] = useState([]);
    useEffect(() => {
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
    const onHandleNavigate = (id) => {
        navigate(`/detailpage/${id}`);
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
                                style={{
                                    backgroundColor: 'yellow',
                                    border: '3px solid red'
                                }}
                                onClick={() => {
                                    onHandleNavigate(itme.id);
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
                                {/* <figure>
                                    <Like src={like} $heart={true} />
                                </figure> */}
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
        </>
    );
};

export default HomePage;

const Container = styled.ul`
    width: 80%;
    margin: 50px;
    padding: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
`;

const CardList = styled.li`
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
`;
// const Like = styled.img`
//     ${({ $heart }) => {
//         if ($heart) {
//             console.log(like);
//             return css`
//                 src: ${like};
//             `;
//         }
//     }}
// `;
