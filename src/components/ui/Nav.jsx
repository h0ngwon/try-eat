import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { login, logout } from '../../redux/reducers/stateReducer';
import { auth } from '../../shared/firebase';

const Navbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    background: ${(props) => props.theme.mainColor};
    z-index: 5;
`;

const LogoContainer = styled.div`
    margin-left: 20px;
    font-size: 36px;
    color: ${(props) => props.theme.textColor};
    font-family: 'EF_jejudoldam';
    cursor: pointer;
`;

const TabList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: ${(props) => props.theme.textColor};
`;

const TabListItem = styled.li`
    cursor: pointer;
    padding: 10px;
    border-radius: 24px;
    font-family: GmarketSansLight;
    &:hover {
        background-color: ${(props) => props.theme.hoverColor};
    }
`;

const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.stateReducer.isLogin);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) dispatch(login());
        });
    });
    
    const signout = async (e) => {
        await signOut(auth).then(() => {
            dispatch(logout());
        });
    };

    return (
        <Navbar>
            <LogoContainer onClick={() => navigate('/')}>Try Eat</LogoContainer>
            {isLogin ? (
                <TabList>
                    <TabListItem onClick={() => navigate('/post')}>글쓰기</TabListItem>
                    <TabListItem onClick={() => signout()}>로그아웃</TabListItem>
                    <TabListItem onClick={() => navigate('/mypage')}>마이페이지</TabListItem>
                </TabList>
            ) : (
                <TabList>
                    <TabListItem onClick={() => navigate('/register')}>회원가입</TabListItem>
                    <TabListItem onClick={() => navigate('/login')}>로그인</TabListItem>
                </TabList>
            )}
        </Navbar>
    );
};

export default Nav;
