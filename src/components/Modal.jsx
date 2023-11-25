import { getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import dummy from '../shared/sampleUserinfo.json';
import styled from 'styled-components';
import { auth, db, onAuthStateChanged } from '../shared/firebase';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../shared/firebase';

function Modal() {
    const navigate = useNavigate();
    const user = dummy[0];
    const [userList, setUserList] = useState(dummy);
    const [name, setName] = useState();
    const [comment, setComment] = useState();
    // 로그인 한 후 로그인 사용자 정보를 가져오기
    // displayname 기준으로 firestore, storage의 데이터 가져오기
    // --> 현재 로그인된 사람의 displayName과
    // 가져온거 수정해서 다시 저장하기.

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName;
                const photoUrl = user.photoURL;
                setName(displayName);
                setFileImage(photoUrl);
            } else {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'userInfo', auth.currentUser.displayName);
            const docSnap = await getDoc(docRef);
            setComment(docSnap.data().comment);
        };

        fetchData();
    }, []);

    //    파일 업로드
    const [fileImage, setFileImage] = useState(user.avatar);
    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
        // console.log(e.target.files[0]);
    };

    // 이름, 소개 onChange
    const nickNameChangeHandler = (e) => {
        setName(e.target.value);
        // console.log(name);
    };
    const commentChangeHandler = (e) => {
        setComment(e.target.value);
        // console.log(comment);
    };

    // 수정 버튼 함수
    const onEditDone = () => {
        const newUser = { ...user, nickname: name, comment: comment, avatar: fileImage };
        const newUserList = userList.map((item) => {
            return item.id === user.id ? newUser : item;
        });
        setUserList(newUserList);
    };

    // 중복확인 기능 구현필요!!!!!!!!!!!!!!!!

    return (
        <Container
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <Box1>
                <StP>닉네임 </StP>
                <StInput value={name} onChange={nickNameChangeHandler} />
                <Button1> 중복확인 </Button1>
            </Box1>
            <Box1>
                <StP>소개</StP>
                <TextArea value={comment} onChange={commentChangeHandler}></TextArea>
            </Box1>
            <Box2>
                <StP>프로필</StP>
                <StImage alt='이미지를 넣어주세요' src={fileImage} accept='image/*' />
                <form>
                    <Button3 htmlFor='profileImg'>등록하기</Button3>
                    <StImg type='file' id='profileImg' accept='image/*' onChange={saveFileImage} />
                </form>
            </Box2>

            <Box3>
                <Button2 onClick={onEditDone}> 프로필 수정 완료 </Button2>
            </Box3>
        </Container>
    );
}

const Container = styled.form`
    width: 450px;
    height: 500px;
    margin: 100px auto 0px auto;
    background-color: #fff6ec;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;

const Box1 = styled.div`
    margin: 40px 0px 0px 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
`;
const Box2 = styled.div`
    margin: 30px 0px 0px 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 50px;
`;
const Box3 = styled.div`
    margin: 30px;
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
const Button3 = styled.label`
    border-radius: 17px;
    background-color: #e14d2a;
    color: white;
    padding: 5px 13px 5px 13px;
    font-size: 13px;
`;
const StInput = styled.input`
    width: 200px;
    height: 30px;
    border-radius: 15px;
`;
const TextArea = styled.textarea`
    width: 200px;
    height: 80px;
    border-radius: 15px;
    border: 2px solid black;
    resize: none;
`;
const StP = styled.p`
    font-size: 15px;
    width: 70px;
    height: 20px;
    text-align: center;
`;

const StImg = styled.input`
    height: 25px;
    width: 75px;
    border-radius: 10px;
    background-color: white;
    display: none;
`;
const StImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
`;
export default Modal;
