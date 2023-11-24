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
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: ${(props) => props.theme.textColor};
`;

const TabListItem = styled.li`
    cursor:pointer;
    padding: 10px;
    border-radius: 24px;
    &:hover {
        background-color: ${props => props.theme.hoverColor};
    }
`

const Nav = () => {
    const navigate = useNavigate();

    return (
        <Navbar>
            <LogoContainer onClick={() => navigate('/')}>Try Eat</LogoContainer>
            <TabList>
                <TabListItem onClick={() => navigate('/register')}>회원가입</TabListItem>
                <TabListItem onClick={() => navigate('/login')}>로그인</TabListItem>
            </TabList>
        </Navbar>
    );
};

export default Nav;
