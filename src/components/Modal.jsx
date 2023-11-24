/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import styled from 'styled-components';
// import { onAuthStateChanged } from 'firebase/auth';
function Modal({ users, setUsers }) {
    const [nickname, setNickname] = useState();
    const [comment, setComment] = useState();
    const [selectedFile, setSelectedFile] = useState();

    // useEffect(() => {});

    // const user = users.filter((item) => {
    //     return item.id === id;
    // });
    // console.log('000', user);
    // 회원가입때 저장된 닉네임, 소개, 프로필사진 데이터 불러오기 -> 머지 후
    // 새로운 데이터를 받아서 저장하기 (수정)
    // - 닉네임, 코맨트, 이미지파일 -
    // 불러온 데이터를 수정 후 다시 저장하기
    //

    // const fileUp

    const nickNameChangeHandler = (e) => {
        setNickname(e.target.value);
        console.log(nickname);
    };
    const commentChangeHandler = (e) => {
        setComment(e.target.value);
        console.log(comment);
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.value);
        console.log(selectedFile);
    };

    return (
        <Container
            onSubmit={(event) => {
                event.preventDefault();
                // const newUser = {
                //     nickname,
                //     comment,
                //     selectedFile
                // };
                // setUsers(newUser);
                // console.log
            }}
        >
            <Box1>
                <StP>닉네임 </StP>
                <input placeholder={users[0].nickname} value={nickname} onChange={nickNameChangeHandler} />
                <Button1> 중복확인 </Button1>
            </Box1>
            <Box2>
                <StP>소개</StP>{' '}
                <TextArea placeholder={users[0].comment} value={comment} onChange={commentChangeHandler}></TextArea>
            </Box2>
            <Box3>
                <StP>프로필</StP>
                <StImg type='file' onChange={handleFileSelect} />
                <Button1> 등록하기 </Button1>
            </Box3>

            <Box4>
                <Button2> 프로필 수정 완료 </Button2>
            </Box4>
        </Container>
    );
}

const Container = styled.form`
    width: 450px;
    height: 400px;
    margin: 100px auto 0px auto;
    padding-top: 50px;
    background-color: beige;
    display: flex;
    flex-direction: column;
`;

const Box1 = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: aliceblue;
`;
const Box2 = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: bisque;
`;
const Box3 = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: antiquewhite;
`;
const Box4 = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;
const Button1 = styled.button`
    border-radius: 17px;
    background-color: #e14d2a;
    color: white;
    height: 25px;
    width: 75px;
    box-shadow: none;
    border: none;
`;

const Button2 = styled.button`
    border-radius: 10px;
    background-color: #e14d2a;
    color: white;
    height: 30px;
    width: 140px;
    box-shadow: none;
    border: none;
`;

const TextArea = styled.textarea`
    width: 230px;
    height: 80px;
    border-radius: 15px;
    border: none;
    resize: none;
`;
const StP = styled.p`
    width: 70px;
    background-color: green;
`;
const StImg = styled.input`
    /* width: 100px;
    height: 100px; */
    border-radius: 10px;
    background-color: white;
    object-fit: contain;
`;
export default Modal;
