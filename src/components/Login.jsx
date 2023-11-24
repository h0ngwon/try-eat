import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../shared/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components';
import { login } from '../redux/reducers/stateReducer';

const Header = styled.header`
    width: 100%;
    text-align: center;
    font-size: 80px;
    font-weight: bold;
    padding: 20px;
    font-family: 'EF_jejudoldam';
    color: ${(props) => props.theme.mainColor};
`;

const Container = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
`;

const IdContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin: 10px;
`;

const IdLabelContainer = styled.div`
    width: 200px;
`;

const IdLabel = styled.label`
    font-size: 30px;
`;

const IdInput = styled.input`
    width: 100%;
    font-size: 30px;
    border: 3px solid black;
    outline: none;
    border-radius: 24px;
    padding: 20px;

    &:focus {
        border-color: ${(props) => props.theme.mainColor};
    }
`;

const PasswordContainer = styled(IdContainer)``;
const PasswordLabelContainer = styled(IdLabelContainer)``;
const PasswordLabel = styled(IdLabel)``;
const PasswordInput = styled(IdInput)``;
const LoginBtn = styled.button`
    font-size: 30px;
    padding: 20px;
    border: none;
    border-radius: 24px;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.textColor};
    width: 50%;
    margin: 10px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.hoverColor};
    }
`;

const GoogleLoginBtn = styled(LoginBtn)`
    border: 2.5px solid black;
    background-color: #fff;
    color: black;
    &:hover {
        background-color: black;
        color: white;
    }
`;

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const signIn = async (e) => {
        e.preventDefault();

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            dispatch(login());
            console.log(userCredentials);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <Header>Try Eat</Header>
            <Container onSubmit={signIn}>
                <IdContainer>
                    <IdLabelContainer>
                        <IdLabel>이메일</IdLabel>
                    </IdLabelContainer>
                    <IdInput type='email' maxLength={30} required placeholder='이메일 입력' onChange={emailHandler} />
                </IdContainer>

                <PasswordContainer>
                    <PasswordLabelContainer>
                        <PasswordLabel>비밀번호</PasswordLabel>
                    </PasswordLabelContainer>
                    <PasswordInput
                        type='password'
                        minLength={6}
                        maxLength={20}
                        placeholder='6글자 이상 입력'
                        required
                        onChange={passwordHandler}
                    />
                </PasswordContainer>
                <LoginBtn>로그인</LoginBtn>
                <GoogleLoginBtn>구글로 시작하기</GoogleLoginBtn>
            </Container>
        </>
    );
};

export default Login;
