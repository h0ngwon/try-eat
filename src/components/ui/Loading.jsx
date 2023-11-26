import React from 'react';
import styled from 'styled-components';
import Spinner from '../../assets/Spinner-1s-147px.gif'
const Loading = () => {
    return <Background>
        <LoadingText>로딩중입니다</LoadingText>
        <img src={Spinner} alt='로딩중'/>
    </Background>
};

const Background = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoadingText = styled.div`
    font-family: 'GmarketSansTTFMedium';
    text-align: center;
`

export default Loading;
