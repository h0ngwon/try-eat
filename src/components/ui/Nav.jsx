import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { auth } from '../../shared/firebase';
import { logout } from '../../redux/reducers/stateReducer';
import { signOut } from 'firebase/auth';

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
    &:hover {
        background-color: ${(props) => props.theme.hoverColor};
    }
`;

const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.stateReducer.isLogin);

    const signout =  async (e) => {
        dispatch(logout());
        await signOut(auth);
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
