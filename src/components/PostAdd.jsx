import { uuidv4 } from '@firebase/util';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { auth, db, storage } from '../shared/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { done, load } from '../redux/modules/loadingReducer';
import Loading from '../components/ui/Loading';
import { useNavigate } from 'react-router-dom';

const PostAdd = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [inputImg, setInputImg] = useState('');
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.loadingReducer.isLoading);

    const fileInput = useRef();
    const user = auth.currentUser;
    const displayName = user.displayName;
    const photoURL = user.photoURL;
    const navigate = useNavigate();

    const postToAdd = {
        id: uuidv4(),
        title,
        content,
        user: user.uid,
        timestamp: serverTimestamp(),
        image: imageFile,
        nickname: displayName,
        likeBox: [],
        photoURL
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const contentChangeHandler = (event) => {
        setContent(event.target.value);
    };

    // 이미지 미리보기
    const imageChangeHandler = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setImageFile(reader.result || null);
                resolve();
            };
            setImageUrl(file);
        });
    };

    const cancelBtn = () => {
        navigate('/mypage');
    };

    // 업로드 버튼
    const uploadHandler = async () => {
        const uploadCheck = window.confirm('등록하시겠습니까?');
        if (uploadCheck) {
            if (title === '') {
                alert('제목을 입력해주세요');
                return;
            }
            if (!inputImg && !imageUrl) {
                alert('이미지를 업로드해주세요');
                return;
            }
            if (content === '') {
                alert('설명을 입력해주세요');
                return;
            }

            try {
                dispatch(load());
                await setDoc(doc(db, 'Post', postToAdd.id), postToAdd);

                const imageRef = ref(storage, `${displayName}/Post-image`);
                await uploadBytes(imageRef, imageUrl);
                await getDownloadURL(imageRef);
                dispatch(done());
                navigate(`/detailpage/${postToAdd.id}`);
            } catch (error) {
                console.error(error);
            }
        } else {
            return;
        }
    };

    // 등록하기 전에 이미지 업로드했다가 삭제
    const imageDeleteBtn = () => {
        const deleteCheck = window.confirm('삭제하시겠습니까?');
        if (deleteCheck) {
            setImageFile(null);
            setInputImg(null);
            fileInput.current.value = '';
        } else {
            return;
        }
    };

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <Container>
                    <FormWrap onSubmit={onSubmit}>
                        <InputTitle
                            value={title}
                            type='text'
                            onChange={titleChangeHandler}
                            placeholder='제목을 입력해주세요(최대 15자)'
                            maxLength={15}
                        />
                        <div
                            style={{
                                width: '100vw',
                                borderTop: '1px solid black',
                                marginBottom: '50px'
                            }}
                        ></div>
                        <ButtonWrap>
                            <ImageInput
                                id='inputFile'
                                type='file'
                                ref={fileInput}
                                accept='image/*'
                                value={inputImg}
                                style={{ display: 'none' }}
                                onChange={(e) => imageChangeHandler(e)}
                            />
                            <ImgUploadButton htmlFor='inputFile'>O</ImgUploadButton>
                            <ImgDeleteButton onClick={imageDeleteBtn}>X</ImgDeleteButton>
                        </ButtonWrap>
                        <ImageWrap>
                            <Img src={imageFile} />
                            {!imageFile && <Span>이미지를 업로드해주세요</Span>}
                        </ImageWrap>

                        <InputContent
                            value={content}
                            type='text'
                            onChange={contentChangeHandler}
                            placeholder='설명을 입력해주세요(최대 300자)'
                            maxLength={300}
                        />
                        <ButtonWrap>
                            <Button onClick={uploadHandler}>등록하기</Button>
                            <Button onClick={cancelBtn}>취소하기</Button>
                        </ButtonWrap>
                    </FormWrap>
                </Container>
            )}
        </div>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    /* background-color: green; */
    width: 100vw;
    height: 200vh;
`;

const FormWrap = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80vw;
    height: 180vh;
`;

const InputTitle = styled.input`
    display: flex;
    justify-content: center;
    width: 760px;
    height: 120px;
    font-size: 50px;
    font-family: GmarketSansMedium;
    margin: 150px auto 30px auto;
    padding: 20px;
    border: none;
    outline: none;
`;

const ImageWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 800px;
    height: 800px;
    background-color: white;
    margin: 0 auto;
    border: 2px solid black;
    overflow: hidden;
`;

const Span = styled.span`
    padding-bottom: 400px;
    text-align: center;
    font-size: 20px;
    color: gray;
    font-family: GmarketSansMedium;
`;

const ImageInput = styled.input`
    width: 150px;
    height: 30px;
    /* display: none; */
`;
const ImgUploadButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: white;
    border: 2px solid black;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.2s;
    }
`;

const ImgDeleteButton = styled.button`
    width: 40px;
    height: 40px;
    background-color: white;
    border: 2px solid black;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const InputContent = styled.textarea`
    display: flex;
    justify-content: center;
    width: 760px;
    height: 300px;
    padding: 20px;
    margin: 50px auto 0 auto;
    font-size: 22px;
    font-family: GmarketSansMedium;
    line-height: 35px;
    resize: none;
    background: none;
    border-width: 0 0 2px;
    border-color: black;
    outline: none;
`;

const ButtonWrap = styled.div`
    width: 800px;
    display: flex;
    justify-content: flex-end;
    margin: 10px;
`;

const Button = styled.button`
    width: 150px;
    height: 50px;
    font-size: 20px;
    font-family: GmarketSansLight;
    background-color: ${(props) => props.theme.mainColor};
    color: white;
    border: none;
    border-radius: 100px;
    margin: 30px 0 0 30px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;
export default PostAdd;
