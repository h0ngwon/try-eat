import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultImage from '../assets/default.jpeg';
import { db } from '../shared/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router';

export default function MyPage() {
    const [name, setName] = useState('');

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            // collection 이름이 post인 collection의 모든 document를 가져옴
            const q = query(collection(db, 'post'), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);
            const fbdata = querySnapshot.docs.map((doc) => doc.data());
            setPosts(fbdata);
        };

        fetchData();
    }, []);
    console.log(posts);

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
                {/* 로고 만들어서 home으로 이동하기 */}
                <Title>마이페이지</Title>
            </Header>
            <ProfileEdit>
                <MyPhoto>
                    {/* 로그인한 user의 photo 불러오기 */}
                    <img src={defaultImage} />
                </MyPhoto>
                <UserEdit>
                    {/* 로그인한 user의 displayname, 소개글 불러오기 */}
                    {/* 비동기 처리하면 됨 */}
                    <Ment>박희원님, 반갑습니다!</Ment>
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
                    {posts.map((post) => {
                        return (
                            // Post.jsx 컴포넌트 생성
                            <Post key={post.timestamp}>
                                <div>
                                    {/* 이미지 누르면 상세페이지로 이동 구현 */}
                                    {/* post이미지 60개 객체 나오는 거 해결하기 */}
                                    <PostImage
                                        onClick={() => {
                                            navigate(`/detailpage/${post.id}`);
                                        }}
                                        src={post.image}
                                        alt='이미지'
                                    />
                                </div>
                                <PostTitle>{post.title}</PostTitle>
                                <PostComment>{post.comment}</PostComment>
                                <Buttons>
                                    {/* user에 따라 좋아요 눌린 값 가져오기 */}
                                    <div>♥️</div>
                                    <Button
                                        onClick={() => {
                                            navigate(`/editDetail`);
                                        }}
                                    >
                                        수정
                                    </Button>
                                    {/* 삭제하시겠습니까? alret창 띄우기 네 or 아니오 */}
                                    {/* 삭제 기능 리덕스로 구현해보기 */}
                                    <Button
                                        onClick={() => {
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
    display: block;
    justify-content: center;
    text-align: center;
    border-bottom: 2px solid lightgrey;
`;

const Title = styled.h1`
    margin: 30px 30px;
    font-size: 30px;
    font-weight: 500;
`;

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
`;

const EditBtn = styled.button`
    padding: 10px;
    background-color: #e14d2a;
    color: white;
    width: 120px;
    border-radius: 15px;
    border: 0px;
    cursor: pointer;
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
    padding-left: 100px;
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
    margin-bottom: 120px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const Button = styled.button`
    background-color: #e14d2a;
    color: white;
    width: 60px;
    padding: 10px;
    border-radius: 15px;
    border: 0px;
    margin-bottom: 30px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`;

const PostImage = styled.img`
    width: 400px;
    height: 400px;
    border: 1px solid darkgray;
    margin-bottom: 20px;
    object-fit: cover;
`;

const PostTitle = styled.p`
    height: 100px;
`;

const PostComment = styled.p`
    height: 150px;
`;
