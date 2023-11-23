import React, { useState } from 'react';
import styled from 'styled-components';
import defaultImage from './defaultImage.jpg';
import sampleUserinfo from '../../shared/sampleUserinfo.json';
import samplePost from '../../shared/samplePost.json';
export default function MyPage() {
    const [userInfo, setUserInfo] = useState(sampleUserinfo);
    const [posts, setPosts] = useState(samplePost);
    console.log(samplePost);
    return (
        <>
            <Header>
                <Title>마이페이지</Title>
            </Header>
            <ProfileEdit>
                <MyPhoto>
                    <img src={defaultImage} />
                </MyPhoto>
                <UserEdit>
                    <Ment>박희원님, 반갑습니다!</Ment>
                    <EditBtn>프로필 수정</EditBtn>
                </UserEdit>
            </ProfileEdit>
            <MyPost>나의 게시물</MyPost>
            <PostContainer>
                {/* 컴포넌트 PostList */}
                <PostList>
                    {samplePost.map((post) => {
                        return (
                            // 컴포넌트 post
                            <Post key={post.id}>
                                <div>
                                    <PostImage src={post.image} alt="이미지" />
                                </div>

                                <PostTitle>{post.title}</PostTitle>
                                <PostComment>{post.comment}</PostComment>
                                <Buttons>
                                    <Button>수정</Button>
                                    <Button>삭제</Button>
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
    font-size: 20px;
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
    padding-left: 70px;
    font-size: 20px;
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
`;

const PostImage = styled.img`
    width: 400px;
    height: 400px;
    border: 1px solid darkgray;
    margin-bottom: 20px;
    object-fit: cover;
`;

const PostTitle = styled.p`
    height: 50px;
`;

const PostComment = styled.p`
    height: 150px;
`;
