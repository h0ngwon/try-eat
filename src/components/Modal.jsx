import React, { useState } from 'react';
import styled from 'styled-components';

function Modal() {
    const [nickname, setNickname] = useState();
    const [contents, setContents] = useState();
    const [photo, setPhoto] = useState();

    // 회원가입때 저장된 닉네임, 소개, 프로필사진 데이터 불러오기
    // 불러온 데이터를 수정 후 다시 저장하기
    //

    const nickNameChangeHandler = (e) => {
        setNickname(e.target.value);
        console.log(nickname);
    };

    return (
        <Container>
            <Box1>
                <p>닉네임</p>
                <input value={nickname} onChange={nickNameChangeHandler} />
                <Button1 onClick={() => {}}> 중복확인 </Button1>
            </Box1>
            <Box2>
                <p>소개</p> <TextArea placeholder="최대 15자까지 입력 가능합니다."></TextArea>
            </Box2>
            <Box3>
                <p>프로필</p>
                <img src=" " />
                <Button1> 등록하기 </Button1>
            </Box3>

            <Box4>
                <Button2> 프로필 수정 완료 </Button2>
            </Box4>
        </Container>
    );
}

const Container = styled.div`
    width: 450px;
    height: 400px;
    margin: 100px auto 0px auto;
    padding-top: 50px;
    background-color: beige;
    display: flex;
    flex-direction: column;
    align-content: space-evenly;
`;

const Box1 = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;
const Box2 = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;
const Box3 = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
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
export default Modal;
