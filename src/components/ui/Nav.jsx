import React from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';

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
`;

const TabList = styled.ul`
    display: flex;
    gap: 20px;
    color: ${(props) => props.theme.textColor};
`;
const Nav = () => {
    const navigate = useNavigate();

    return (
        <Navbar>
            <LogoContainer onClick={() => navigate('/')}>Try Eat</LogoContainer>
            <TabList>
                <li onClick={() => navigate('/register')}>회원가입</li>
                <li onClick={() => navigate('/login')}>로그인</li>
            </TabList>
        </Navbar>
    );
};

export default Nav;
