import React from 'react';

import styled from 'styled-components';

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

const PasswordContainer = styled(IdContainer)`
    flex-basis: 32%;
`;
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
const ProfileImage = styled.img`
    width: 340px;
    height: 240px;
`;

const ProfileInputLabel = styled(IdLabel)``;
const ProfileInputDiv = styled.div`
    padding: 20px;
    border-radius: 24px;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
`;

const ProfileInput = styled.input`
    display: none;
`;
const RegisterBtn = styled(IdDuplicateBtn)`
    width: 50%;
    margin: 30px;
`;

const Register = () => {
    return (
        <>
            <Header>회원가입</Header>
            <Container>
                <IdContainer>
                    <IdLabelContainer>
                        <IdLabel>아이디</IdLabel>
                    </IdLabelContainer>
                    <IdInput></IdInput>
                    <IdDuplicateBtn>중복확인</IdDuplicateBtn>
                </IdContainer>

                <PasswordContainer>
                    <PasswordLabelContainer>
                        <PasswordLabel>비밀번호</PasswordLabel>
                    </PasswordLabelContainer>
                    <PasswordInput></PasswordInput>
                </PasswordContainer>

                <PasswordConfirmContainer>
                    <PasswordConfirmLabelContainer>
                        <PasswordConfirmLabel>비밀번호확인</PasswordConfirmLabel>
                    </PasswordConfirmLabelContainer>
                    <PasswordConfirmInput></PasswordConfirmInput>
                </PasswordConfirmContainer>

                <NicknameContainer>
                    <NicknameLabelContainer>
                        <NicknameLabel>닉네임</NicknameLabel>
                    </NicknameLabelContainer>
                    <NicknameInput></NicknameInput>
                    <NicknameBtn>중복확인</NicknameBtn>
                </NicknameContainer>

                <CommentContainer>
                    <CommentLabelContainer>
                        <CommentLabel>소개</CommentLabel>
                    </CommentLabelContainer>
                    <CommentInput></CommentInput>
                </CommentContainer>

                <ProfileContainer>
                    <ProfileLabelContainer>
                        <ProfileLabel>프로필</ProfileLabel>
                    </ProfileLabelContainer>
                    <ProfileImage />

                    <ProfileInputLabel>
                        <ProfileInputDiv for='file'>등록하기</ProfileInputDiv>
                        <ProfileInput type='file' id='file' />
                    </ProfileInputLabel>
                </ProfileContainer>

                <RegisterBtn>Let's Do Eat!</RegisterBtn>
            </Container>
        </>
    );
};

export default Register;
