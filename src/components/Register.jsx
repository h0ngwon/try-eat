import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth, db, doc, setDoc, storage } from '../shared/firebase';
import { v4 as uuid } from 'uuid';

const Header = styled.header`
    width: 100%;
    text-align: center;
    font-size: 52px;
    font-weight: bold;
    margin-top: 100px;
    padding: 20px;
    border-bottom: 1.5px solid black;
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
    width: 300px;
    font-size: 30px;
    border: 3px solid black;
    outline: none;
    border-radius: 24px;
    padding: 20px;

    &:focus {
        border-color: ${(props) => props.theme.mainColor};
    }
`;

const IdDuplicateBtn = styled.button`
    font-size: 30px;
    padding: 20px;
    border: none;
    border-radius: 24px;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.textColor};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.hoverColor};
    }
`;

const PasswordContainer = styled(IdContainer)``;
const PasswordLabelContainer = styled(IdLabelContainer)``;
const PasswordLabel = styled(IdLabel)``;
const PasswordInput = styled(IdInput)``;

const PasswordConfirmContainer = styled(IdContainer)``;
const PasswordConfirmLabelContainer = styled(IdLabelContainer)``;
const PasswordConfirmLabel = styled(IdLabel)``;
const PasswordConfirmInput = styled(PasswordInput)``;

const NicknameContainer = styled(IdContainer)``;
const NicknameLabelContainer = styled(IdLabelContainer)``;
const NicknameLabel = styled(IdLabel)``;
const NicknameInput = styled(IdInput)``;
const NicknameBtn = styled(IdDuplicateBtn)``;

const CommentContainer = styled(IdContainer)``;
const CommentLabelContainer = styled(IdLabelContainer)``;
const CommentLabel = styled(IdLabel)``;
const CommentInput = styled(IdInput)``;

const ProfileContainer = styled(IdContainer)``;
const ProfileLabelContainer = styled(IdLabelContainer)``;
const ProfileLabel = styled(IdLabel)``;
const ProfileImageContainer = styled.div`
    width: 340px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ProfileImage = styled.img`
    width: 340px;
    height: 240px;
    object-fit: cover;
`;

const ProfileInputLabel = styled(IdLabel)``;
const ProfileInputDiv = styled.div`
    padding: 20px;
    border-radius: 24px;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.textColor};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.hoverColor};
    }
`;

const ProfileInput = styled.input`
    display: none;
`;

const RegisterBtn = styled.input`
    width: 50%;
    margin: 30px;
    font-size: 30px;
    padding: 20px;
    border: none;
    border-radius: 24px;
    background-color: ${(props) => props.theme.mainColor};
    color: #fff;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.hoverColor};
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

const Validation = styled.span`
    color: ${(props) => props.theme.mainColor};
    font-size: 20px;
    font-weight: bold;
`;

const Register = () => {
    const photoId = uuid();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        comment: '',
        image: ''
    });
    const [imageUpload, setImageUpload] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isSamePassword, setIsSamePassword] = useState(true);
    const [isValidNickname, setIsValidNickname] = useState(false);
    const [isAbleToRegister, setIsAbleToRegister] = useState(false);

    const eamilRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    const emailHandler = (e) => {
        if (eamilRegex.test(e.target.value)) setIsValidEmail(true);
        if (!eamilRegex.test(e.target.value)) setIsValidEmail(false);

        setForm({ ...form, email: e.target.value });
    };

    const passwordHandler = (e) => {
        setForm({ ...form, password: e.target.value });
    };

    const confirmPasswordHandler = (e) => {
        if (form.password === e.target.value) setIsSamePassword(true);
        if (form.password !== e.target.value) setIsSamePassword(false);

        setForm({ ...form, confirmPassword: e.target.value });
    };

    const nicknameHandler = (e) => {
        setForm({ ...form, nickname: e.target.value });
    };

    const commentHandler = (e) => {
        setForm({ ...form, comment: e.target.value });
    };

    const previewImageHandler = (e) => {
        setImageUpload(e.target.files[0]);
    };

    useEffect(() => {
        const imageRef = ref(storage, `${photoId}/profile`);
        if (!imageUpload) return;
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setForm({ ...form, image: url });
            });
        });
    }, [imageUpload]);

    const formHandler = () => {
        const isValidAll = isValidEmail && isSamePassword && isValidNickname;
        if (isValidAll) setIsAbleToRegister(true);
        if (!isValidAll) setIsAbleToRegister(false);
    };

    const emailCheck = async (email) => {
        if (email.trim() === '') {
            alert('이메일을 입력하세요');
            return;
        }
        const userRef = collection(db, 'userInfo');
        const q = query(userRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            alert('이미 존재하는 이메일입니다.');
            return;
        }

        if (querySnapshot.docs.length === 0) {
            alert('사용 가능한 이메일입니다.');
            return;
        }
    };

    const nicknameCheck = async (nickname) => {
        if (nickname.trim() === '') {
            alert('닉네임을 입력하세요');
            return;
        }

        const userRef = collection(db, 'userInfo');
        const q = query(userRef, where('nickname', '==', nickname));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            alert('이미 존재하는 닉네임입니다.');
            setIsValidNickname(false);
            return;
        }
        if (querySnapshot.docs.length === 0) {
            alert('사용 가능한 닉네임입니다.');
            setIsValidNickname(true);
            return;
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = {
            email: form.email,
            nickname: form.nickname,
            comment: form.comment
        };

        try {
            await createUserWithEmailAndPassword(auth, form.email, form.confirmPassword).then(() => {
                setDoc(doc(db, 'userInfo', form.nickname), data);
                console.log('from register : ', auth.currentUser);
                updateProfile(auth.currentUser, {
                    displayName: form.nickname,
                    photoURL: form.image
                });
            });
        } catch (error) {
            alert('이미 존재하는 이메일이거나 닉네임을 입력하셨습니다.');
        }

        alert('회원가입이 완료되었습니다.');
        navigate('/login');
    };

    return (
        <>
            <Header>회원가입</Header>
            <Container onSubmit={submitHandler} onChange={formHandler}>
                <IdContainer>
                    <IdLabelContainer>
                        <IdLabel>이메일</IdLabel>
                    </IdLabelContainer>
                    <IdInput
                        type='email'
                        maxLength={30}
                        required
                        placeholder='이메일 입력'
                        value={form.email}
                        onChange={emailHandler}
                        autoFocus
                    />
                    <IdDuplicateBtn type='button' onClick={() => emailCheck(form.email)}>
                        중복확인
                    </IdDuplicateBtn>
                </IdContainer>

                {isValidEmail ? '' : <Validation>이메일 형식이 아닙니다</Validation>}

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
                        value={form.password}
                        onChange={passwordHandler}
                    />
                </PasswordContainer>

                <PasswordConfirmContainer>
                    <PasswordConfirmLabelContainer>
                        <PasswordConfirmLabel>비밀번호확인</PasswordConfirmLabel>
                    </PasswordConfirmLabelContainer>
                    <PasswordConfirmInput
                        type='password'
                        minLength={6}
                        maxLength={20}
                        placeholder='비밀번호 입력'
                        required
                        value={form.confirmPassword}
                        onChange={confirmPasswordHandler}
                    />
                </PasswordConfirmContainer>

                {isSamePassword ? '' : <Validation>같은 비밀번호를 입력해주세요</Validation>}

                <NicknameContainer>
                    <NicknameLabelContainer>
                        <NicknameLabel>닉네임</NicknameLabel>
                    </NicknameLabelContainer>
                    <NicknameInput
                        type='text'
                        minLength={3}
                        maxLength={10}
                        placeholder='3글자 이상 입력'
                        required
                        value={form.nickname}
                        onChange={nicknameHandler}
                    />
                    <NicknameBtn type='button' onClick={() => nicknameCheck(form.nickname)}>
                        중복확인
                    </NicknameBtn>
                </NicknameContainer>

                <CommentContainer>
                    <CommentLabelContainer>
                        <CommentLabel>소개</CommentLabel>
                    </CommentLabelContainer>
                    <CommentInput
                        type='text'
                        maxLength={15}
                        placeholder='최대 15글자 입력'
                        required
                        value={form.comment}
                        onChange={commentHandler}
                    />
                </CommentContainer>

                <ProfileContainer>
                    <ProfileLabelContainer>
                        <ProfileLabel>프로필</ProfileLabel>
                    </ProfileLabelContainer>
                    <ProfileImageContainer>
                        {form.image ? (
                            <ProfileImage src={form.image} />
                        ) : (
                            <Validation>이미지를 업로드 해주세요.</Validation>
                        )}
                    </ProfileImageContainer>
                    <ProfileInputLabel>
                        <ProfileInputDiv htmlFor='file'>업로드</ProfileInputDiv>
                        <ProfileInput
                            type='file'
                            id='file'
                            name='file'
                            accept='image/*'
                            onChange={previewImageHandler}
                        />
                    </ProfileInputLabel>
                </ProfileContainer>
                <RegisterBtn type='submit' value={"Let's Do Eat!"} disabled={!isAbleToRegister}></RegisterBtn>
            </Container>
        </>
    );
};

export default Register;
