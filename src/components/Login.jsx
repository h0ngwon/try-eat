import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { login } from '../redux/reducers/stateReducer';
import { auth, db, doc, setDoc } from '../shared/firebase';

const Header = styled.header`
    width: 100%;
    text-align: center;
    font-size: 80px;
    font-weight: bold;
    padding: 20px;
    font-family: 'EF_jejudoldam';
    color: ${(props) => props.theme.mainColor};
    cursor: pointer;
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

const SocialBtnsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
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

const GoogleLogo = styled(FontAwesomeIcon)`
    color: #e14d2a;
    margin-right: 10px;
`;

const GithubLoginBtn = styled(GoogleLoginBtn)``;

const GithubLogo = styled(FontAwesomeIcon)`
    color: #e14d2a;
    margin-right: 10px;
`;
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
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
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                dispatch(login());
                navigate('/');
            });
        } catch (e) {}
    };

    const socialLogin = async (auth, Provider) => {
        await signInWithPopup(auth, Provider)
            .then((res) => {
                const data = {
                    nickname: auth.currentUser.displayName,
                    email: auth.currentUser.email
                }
                setDoc(doc(db, 'userInfo', auth.currentUser.displayName), data);
                dispatch(login());
                navigate('/');
            })
            .catch((error) => {
                alert('로그인할 수 없습니다 : ');
            });
    };

    return (
        <>
            <Header onClick={() => navigate('/')}>Try Eat</Header>
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
            </Container>
            <SocialBtnsContainer>
                <GoogleLoginBtn
                    onClick={() => {
                        socialLogin(auth, googleProvider);
                    }}
                >
                    <GoogleLogo icon={faGoogle} spin />
                    구글로 시작하기
                </GoogleLoginBtn>
                <GithubLoginBtn
                    onClick={() => {
                        socialLogin(auth, githubProvider);
                    }}
                >
                    <GithubLogo icon={faGithub} spin spinReverse />
                    Github으로 시작하기
                </GithubLoginBtn>
            </SocialBtnsContainer>
        </>
    );
};

export default Login;
