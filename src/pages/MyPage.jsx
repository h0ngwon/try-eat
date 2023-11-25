import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { db } from '../shared/firebase';
import { auth } from '../shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';


export default function MyPage() {
    //회원정보
    // const [userInfo, setUserInfo] = useState('');
    const [nickname, setNikcname] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const [comment, setCommnet] = useState('');
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const user = auth.currentUser;
    const displayName = user.displayName;

    // getDocs 모든 문서를 가져오기
    useEffect(() => {
        const fetchData = async () => {
            // collection 이름이 post인 collection의 모든 document를 가져옴
            const q = query(collection(db, 'Post'), where('nickname', '==', displayName));
            const querySnapshot = await getDocs(q);
            const fbdata = querySnapshot.docs.map((doc) => doc.data());
            setPosts(fbdata);
        };
        fetchData();
    }, []);

    console.log('현재유저', auth.currentUser);
    const user = auth.currentUser;
    // 로그인한 사용자 이름과 사진 가져오기
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName;
                const photoUrl = user.photoURL;
                setNikcname(displayName);
                setUserPhoto(photoUrl);
            } else {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, []);
    // 로그인한 사용자 소개글 가져오기
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'userInfo', auth.currentUser.displayName);
            const docSnap = await getDoc(docRef);

            setCommnet(docSnap.data().comment);
        };
        fetchData();
    }, []);

    // post 삭제 기능
    const deletePost = (post) => {
        const deleted = posts.filter((data) => {
            return data.id !== post.id;
        });
        setPosts(deleted);
    };

    return (
        <>
            <Header>
                <LogoContainer onClick={() => navigate('/')}>Try Eat</LogoContainer>

                <Title>마이페이지</Title>
            </Header>
            <ProfileEdit>
                <MyPhoto>
                    {/* 로그인한 user의 photo 불러오기 */}
                    {/* 사용자가 이미지 안 넣으면 기본이미지 나오게 */}
                    <img src={userPhoto} />
                </MyPhoto>
                <UserEdit>
                    {/* 로그인한 user의 displayname, 소개글 불러오기 */}
                    {/* 비동기 처리하면 됨 */}
                    <Ment>{nickname}님, 반갑습니다!</Ment>
                    <Comment>{comment}</Comment>
                    <EditBtn
                        onClick={() => {
                            navigate(`/modal`);
                        }}
                    >
                        프로필 수정
                    </EditBtn>
                </UserEdit>
            </ProfileEdit>
            <MyPost>나의 게시물</MyPost>
            <PostContainer>
                {/* PostList.jsx 컴포넌트 생성 */}
                <PostList>
                    {/* 로그인한 회원 아이디 비교해서 필터링 */}
                    {posts.map((post) => {
                        return (
                            // Post.jsx 컴포넌트 생성
                            <Post key={post.timestamp}>
                                <div>
                                    {/* 이미지 누르면 상세페이지로 이동 구현 */}
                                    <PostImage
                                        onClick={() => {
                                            navigate(`/detailpage/${post.id}`);
                                        }}
                                        src={post.image}
                                        alt='이미지'
                                    />
                                </div>
                                <PostTitle>{post.title}</PostTitle>
                                <PostComment>{post.content}</PostComment>
                                <Buttons>
                                    {/* user에 따라 좋아요 눌린 값 가져오기 */}
                                    <div>♥️</div>
                                    <Button
                                        onClick={() => {
                                            navigate(`/Edit/${post.id}`);
                                        }}
                                    >
                                        수정
                                    </Button>
                                    {/* 삭제 기능 리덕스로 구현해보기 */}
                                    <Button
                                        onClick={() => {
                                            alert('삭제하시겠습니까?');
                                            deletePost(post);
                                        }}
                                    >
                                        삭제
                                    </Button>
                                </Buttons>
                            </Post>
                        );
                    })}
                </PostList>
            </PostContainer>
        </>
    );
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    /* justify-content: center; */
    /* grid-template-columns: 1fr 1fr 1fr; */
    border-bottom: 2px solid lightgrey;
    height: 120px;
`;

const Title = styled.span`
    display: flex;
    margin: 30px 30px;
    font-size: 30px;
    font-weight: 500;
    font-family: GmarketSansMedium;
    margin: 0;
    padding: 20px;
`;

const Comment = styled.div``;

const ProfileEdit = styled.section`
    display: flex;
    justify-content: flex-start;
    margin-left: 100px;
    padding-top: 50px;
    padding-bottom: 50px;
    gap: 80px;
`;

const UserEdit = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
`;

const MyPhoto = styled.div`
    & img {
        border-radius: 50%;
        width: 200px;
        height: 200px;
    }
`;

const Ment = styled.div`
    display: block;
    font-size: 23px;
    font-weight: 500;
    font-family: GmarketSansMedium;
`;

const EditBtn = styled.button`
    padding: 10px;
    background-color: #e14d2a;
    color: white;
    width: 120px;
    border-radius: 15px;
    border: 0px;
    font-family: GmarketSansLight;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.2s;
    }
`;

const PostContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MyPost = styled.h2`
    display: block;
    padding-top: 50px;
    padding-bottom: 70px;
    padding-left: 120px;
    font-family: GmarketSansMedium;
    font-size: 25px;
    font-weight: 500;
    border-top: 2px solid lightgrey;
`;

const PostList = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 100px;
`;
const Post = styled.div`
    display: flex;
    flex-direction: column;
    /* border: 1px solid darkgray; */
    width: 400px;
    height: 600px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const Button = styled.button`
    background-color: #e14d2a;
    color: white;
    width: 80px;
    padding: 10px;
    border-radius: 30px;
    border: 0px;
    /* margin-bottom: 30px; */
    font-size: 15px;
    font-family: GmarketSansLight;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;

const PostImage = styled.img`
    width: 400px;
    height: 400px;
    border: none;
    border-radius: 30px;
    margin-bottom: 20px;
    object-fit: cover;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        transition: all 0.5s;
    }
`;

const PostTitle = styled.p`
    height: 100px;
    font-size: 23px;
    font-family: GmarketSansMedium;
`;

const PostComment = styled.p`
    height: 150px;
    font-family: GmarketSansLight;
`;

const LogoContainer = styled.span`
    margin-left: 20px;
    font-size: 36px;
    color: #e14d2a;
    font-family: 'EF_jejudoldam';
    padding: 20px;
    margin: 0 500px 0 100px;
    cursor: pointer;
`;
