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

function Profile() {
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [comment, setComment] = useState();
    const [fileImage, setFileImage] = useState();
    const [previewImage, setPreviewImage] = useState();
    const [validationName, setValidationName] = useState(false);

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

    //    파일 업로드
    const saveFileImage = (e) => {
        setFileImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
            // 닉네임 수정
            const user = auth.currentUser;
            await updateProfile(user, { displayName: name });
            // 이미지 업로드
            if (fileImage) {
                const storageRef = ref(storage, `${auth.currentUser.uid}/profile`);
                await uploadBytes(storageRef, fileImage);
                const downloadURL = await getDownloadURL(storageRef);
                await updateProfile(user, { photoURL: downloadURL });
            }
            await updateFireStore(keyName);
            alert('수정되었습니다.');
            navigate('/mypage');
        } catch (e) {
            alert('오류가 발생했습니다. 다시 시도하여 주세요');
            navigate('/mypage');
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

        if (querySnap.docs.length === 0) {
            alert('사용가능한 닉네임 입니다.');
            setValidationName(true);
        }
        if (querySnap.docs.length > 0) {
            alert('이미 존재하는 닉네임 입니다.');
            setValidationName(false);
        }
    };

    const updateFireStore = async (keyName) => {
        const getUserInfo = (await getDoc(doc(db, 'userInfo', keyName))).data();
        const newUserInfo = { ...getUserInfo, comment: comment, nickname: name };
        await setDoc(doc(db, 'userInfo', name), newUserInfo);
        await deleteDoc(doc(db, 'userInfo', keyName));

        const postQ = query(collection(db, 'Post'), where('nickname', '==', keyName));
        const querySnapshot = await getDocs(postQ);

        const updatePromises = querySnapshot.docs.map(async (x) => {
            const a = x.data();
            const docRef = doc(db, 'Post', a.id);
            return updateDoc(docRef, {
                ...a,
                nickname: name
            });
        });
        await Promise.all(updatePromises);
    };

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
                    중복확인
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
    width: 500px;
    height: 600px;
    margin: 100px auto 0px auto;
    background-color: #fff6ec;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;

const Box1 = styled.div`
    margin: 70px 0px 0px 30px;
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
    height: 30px;
    width: 80px;
    box-shadow: none;
    border: none;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;

const Button2 = styled.button`
    border-radius: 50px;
    background-color: #e14d2a;
    color: white;
    height: 35px;
    width: 270px;
    box-shadow: none;
    border: none;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;
const Button3 = styled.label`
    border-radius: 17px;
    background-color: #e14d2a;
    width: 80px;
    height: 30px;
    color: white;
    padding: 8px 20px 8px 20px;
    font-size: 13px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;
const StInput = styled.input`
    width: 200px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid black;
    padding: 0px 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
`;
const TextArea = styled.textarea`
    width: 200px;
    height: 80px;
    border-radius: 15px;
    border: 1px solid black;
    resize: none;
    padding: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
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
