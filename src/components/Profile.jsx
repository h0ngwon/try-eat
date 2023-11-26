import { getDoc, doc, updateDoc, setDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { auth, db, onAuthStateChanged } from '../shared/firebase';
import { useNavigate } from 'react-router-dom';
import { ref } from 'firebase/storage';
import { storage } from '../shared/firebase';
import { getDownloadURL } from 'firebase/storage';
import { updateProfile } from '../shared/firebase';
import { uploadBytes } from 'firebase/storage';
import { async } from 'q';

function Profile() {
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [comment, setComment] = useState();
    const [fileImage, setFileImage] = useState();
    const [previewImage, setPreviewImage] = useState();

    const keyName = useMemo(() => {
        return auth.currentUser.displayName;
    }, []);

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
        // // 코멘트 수정 -> displayName이 변경되면 오류남
        // const userRef = doc(db, 'userInfo', auth.currentUser.displayName);
        // await updateDoc(userRef, { comment: comment });
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

            // 불러오는 값 photoULR로
            // const downloadURL = await getDownloadURL(storageRef);
        }
        updateFireStore(keyName);

        console.log('수정완료');
    };

    const updateFireStore = async (keyName) => {
        console.log('들어옴');
        const getUserInfo = (await getDoc(doc(db, 'userInfo', keyName))).data();
        const newUserInfo = { ...getUserInfo, comment: comment, nickname: name };
        await setDoc(doc(db, 'userInfo', name), newUserInfo);
        await deleteDoc(doc(db, 'userInfo', keyName));

        const postQ = query(collection(db, 'Post'), where('nickname', '==', keyName));
        const querySnapshot = await getDocs(postQ);

        const updatePromises = querySnapshot.docs.map(async (x) => {
            const a = x.data();
            console.log('a===========', a);
            const docRef = doc(db, 'Post', a.id);
            return updateDoc(docRef, {
                ...a,
                nickname: name
            });
        });

        await Promise.all(updatePromises);
    };
    console.log('유저다.', auth.currentUser);
    console.log('파일이미지다', fileImage);
    console.log('코멘트다', comment);

    // 무엇을 수정할것인가? -> userList
    // 그렇다면 userList에 변경할 기존의 값이 있어야 함.
    //  변경해야 할 값은 무엇인가? --> firebase에서 받아온 값.
    // 그럼 userList에 firebase에서 받아온 nickname, comment, fileImage 를 어떻게 넣어놓을 것인가?

    // // 수정 버튼 함수
    // const onEditDone = () => {
    //     const newUser = { ...user, nickname: name, comment: comment, avatar: fileImage };
    //     const newUserList = userList.map((item) => {
    //         return item.id === user.id ? newUser : item;
    //     });
    //     setUserList(newUserList);
    // };

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
                <Button1> 중복확인 </Button1>
            </Box1>
            <Box1>
                <StP>소개</StP>
                <TextArea value={comment} onChange={commentChangeHandler}></TextArea>
            </Box1>
            <Box2>
                <StP>프로필</StP>
                <StImage alt='이미지를 넣어주세요' src={previewImage} accept='image/*' />
                <form>
                    <Button3 htmlFor='profileImg'>등록하기</Button3>
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
