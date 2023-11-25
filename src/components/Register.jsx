import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { auth, db, doc, setDoc, storage } from '../shared/firebase';

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
    border-radius: 24px;
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
const RegisterBtn = styled(IdDuplicateBtn)`
    width: 50%;
    margin: 30px;

    &:hover {
        background-color: ${(props) => props.theme.hoverColor};
    }
`;

const Register = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        image: ''
    });

    const [comment, setComment] = useState('');
    const [imageUpload, setImageUpload] = useState('');
    const fileRef = useRef();

    const emailHandler = (e) => {
        setForm({ ...form, email: e.target.value });
    };

    const passwordHandler = (e) => {
        setForm({ ...form, password: e.target.value });
    };

    const confirmPasswordHandler = (e) => {
        setForm({ ...form, confirmPassword: e.target.value });
    };

    const nicknameHandler = (e) => {
        setForm({ ...form, nickname: e.target.value });
    };

    const commentHandler = (e) => {
        setComment(e.target.value);
    };

    const previewImageHandler = (e) => {
        setImageUpload(e.target.files[0]);
    };

    useEffect(() => {
        const imageRef = ref(storage, `${auth.currentUser?.uid}/profile`);
        if (!imageUpload) return;
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setForm({ ...form, image: url });
            });
        });
    }, [imageUpload]);

    const isSamePassword = () => {
        if (form.confirmPassword === form.password) {
            return true;
        }
        return false;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!isSamePassword()) {
            alert('Password Mismatch');
            return;
        }

        await createUserWithEmailAndPassword(auth, form.email, form.confirmPassword);
        setDoc(doc(db, 'userInfo', form.nickname), { comment });
        try {
            updateProfile(auth.currentUser, {
                displayName: form.nickname,
                photoURL: form.image
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header>회원가입</Header>
            <Container onSubmit={submitHandler}>
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
                    />
                    <IdDuplicateBtn>중복확인</IdDuplicateBtn>
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
                    <NicknameBtn>중복확인</NicknameBtn>
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
                        {form.image ? <ProfileImage src={form.image} /> : '이미지를 업로드해 주세요'}
                    </ProfileImageContainer>
                    <ProfileInputLabel>
                        <ProfileInputDiv htmlFor='file'>업로드</ProfileInputDiv>
                        <ProfileInput
                            type='file'
                            id='file'
                            name='file'
                            accept='image/*'
                            onChange={previewImageHandler}
                            ref={fileRef}
                        />
                    </ProfileInputLabel>
                </ProfileContainer>
                <RegisterBtn>Let's Do Eat!</RegisterBtn>
            </Container>
        </>
    );
};

export default Register;
