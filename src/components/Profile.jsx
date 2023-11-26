import { getDoc, doc, updateDoc, where, getDocs, query, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db, onAuthStateChanged } from '../shared/firebase';
import { useNavigate } from 'react-router-dom';
import { ref } from 'firebase/storage';
import { storage } from '../shared/firebase';
import { getDownloadURL } from 'firebase/storage';
import { updateProfile } from '../shared/firebase';
import { uploadBytes } from 'firebase/storage';

function Profile() {
    const navigate = useNavigate();
    const myPageNavi = useNavigate();

    const [name, setName] = useState();
    const [comment, setComment] = useState();
    const [fileImage, setFileImage] = useState();
    const [previewImage, setPreviewImage] = useState();
    const [validationName, setValidationName] = useState(false);

    useEffect(() => {
        const fetchUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName;
                const photoUrl = user.photoURL;
                setName(displayName);
                setPreviewImage(photoUrl);
            } else {
                navigate('/');
            }
        });
        return () => fetchUser();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'userInfo', auth.currentUser.displayName);
            const docSnap = await getDoc(docRef);
            setComment(docSnap.data().comment);
        };

        fetchData();
    }, []);

    // 로그인 한 후 로그인 사용자 정보를 가져오기
    // displayname 기준으로 firestore, storage의 데이터 가져오기
    // --> 현재 로그인된 사람의 displayName과
    // 가져온거 수정해서 다시 저장하기.

    //    파일 업로드
    const saveFileImage = (e) => {
        setFileImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0]);
    };

    // 이름, 소개 onChange
    const nickNameChangeHandler = (e) => {
        setName(e.target.value);
    };
    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    };

    // 수정 코드
    const updateUserDataHandler = async () => {
        try {
            const userRef = doc(db, 'userInfo', auth.currentUser.displayName);
            await updateDoc(userRef, { comment: comment });
            // 닉네임 수정
            const user = auth.currentUser;
            await updateProfile(user, { displayName: name });
            // ---> 바로 photoURL에 집어 넣는게 아닌 storage업로드한 파일을 다시 다운 받아와서 phothURL에 집어 넣을 것.
            // 이미지 업로드
            if (fileImage) {
                const storageRef = ref(storage, `${auth.currentUser.uid}/profile`);
                await uploadBytes(storageRef, fileImage);
                // const downloadRef = ref(storage, `${auth.currentUser.uid}`);
                const downloadURL = await getDownloadURL(storageRef);
                console.log('다운로드된 이미지다', downloadURL);
                await updateProfile(user, { photoURL: downloadURL });
            }
            alert('수정되었습니다.');
            myPageNavi('/mypage');
        } catch (e) {
            alert('오류가 발생했습니다. 다시 시도하여 주세요');
            myPageNavi('/mypage');
        }
    };

    // 닉네임 중복확인
    const vaildNicknameClickHandler = async (nickname) => {
        if (nickname === '') {
            alert('닉네임을 입력하세요');
            return;
        }
        const userRef = collection(db, 'userInfo');
        const q = query(userRef, where('nickname', '==', nickname));
        const querySnap = await getDocs(q);

        if (querySnap.docs.length > 0) {
            alert('사용가능한 아이디 입니다.');
            setValidationName(true);
        }
        if (querySnap.docs.length < 1) {
            alert('이미 존재하는 아이디입니다.');
            setValidationName(false);
        }
    };

    // 닉네임을 userInfo에서 가져온다.

    console.log('유저다.', auth.currentUser);
    console.log('파일이미지다', fileImage);
    console.log('코멘트다', comment);

    // // 수정 버튼 함수
    // const onEditDone = () => {
    //     const newUser = { ...user, nickname: name, comment: comment, avatar: fileImage };
    //     const newUserList = userList.map((item) => {
    //         return item.id === user.id ? newUser : item;
    //     });
    //     setUserList(newUserList);
    // };

    // 기존의 닉네임을 변수에 하나 담아서 쿼리로 유저인포에
    // 기존것을 겟독으로 가져와서 업데이트를 하고 기존 게시물 중 닉네임이랑 일치하는 것을 쿼리로 전부 가져와서 업데이트를 한다.

    // 중복확인 기능 구현필요!!!!!!!!!!!!!!!!

    return (
        <Container
            onSubmit={(event) => {
                event.preventDefault();
                updateUserDataHandler();
            }}
        >
            <Box1>
                <StP>닉네임 </StP>
                <StInput value={name} onChange={nickNameChangeHandler} />
                <Button1 onClick={() => vaildNicknameClickHandler(name)} type='button'>
                    {' '}
                    중복확인{' '}
                </Button1>
            </Box1>
            <Box1>
                <StP>소개</StP>
                <TextArea value={comment} onChange={commentChangeHandler}></TextArea>
            </Box1>
            <Box2>
                <StP>프로필</StP>
                <StImage alt='이미지를 넣어주세요' src={previewImage} accept='image/*' />
                <form>
                    <Button3 htmlFor='profileImg' type='button'>
                        등록하기
                    </Button3>
                    <StImg type='file' id='profileImg' accept='image/*' onChange={saveFileImage} />
                </form>
            </Box2>

            <Box3>
                <Button2> 프로필 수정 완료 </Button2>
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
export default Profile;
