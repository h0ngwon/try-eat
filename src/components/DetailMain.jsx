import React from 'react';
import styled from 'styled-components';

function DetailMain({ post }) {
    return (
        <main>
            <Title>{post.title}</Title>
            <div
                style={{
                    width: '100vw',
                    borderTop: '1px solid black'
                }}
            ></div>
            <ProfileWrap>
                <Profilephoto>
                    <Img src={post.photoURL} />
                </Profilephoto>
                <p>{post.nickname}</p>
            </ProfileWrap>

            <ImageWrap>
                <Img src={post.image} />
            </ImageWrap>

            <Content>{post.content} </Content>
        </main>
    );
}

export default DetailMain;
const Profilephoto = styled.figure`
    width: 50px;
    height: 50px;
`;
const ProfileWrap = styled.div`
    width: 800px;
    display: flex;
    align-items: center;
    margin: 50px;
    gap: 20px;
`;
const Title = styled.div`
    display: flex;
    justify-content: center;
    width: 760px;
    height: 120px;
    font-size: 50px;
    font-family: GmarketSansMedium;
    /* margin: 150px auto 30px auto; */
    padding: 20px;
    border: none;
    outline: none;
`;

const ImageWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 800px;
    height: 800px;
    background-color: white;
    margin: 0 auto;
    border: 2px solid black;
    overflow: hidden;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    width: 760px;
    height: 200px;
    padding: 20px;
    margin: 50px auto 0 auto;
    font-size: 25px;
    font-family: GmarketSansMedium;
    resize: none;
    background: none;
    border-width: 0 0 2px;
    border-color: black;
    outline: none;
`;
