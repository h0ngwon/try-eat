import { uuidv4 } from '@firebase/util';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { auth, db, storage } from '../shared/firebase';
import { useParams } from 'react-router-dom';

// 수정완료 클릭 후 마이페이지로 자동이동
// 취소하기 클릭 후 마이페이지로 자동이동
// 글쓰기를 클릭해서 접근하면 이미지와 내용이 비어있고 버튼이 '등록하기'
// 마이페이지 게시물 수정으로 접근하면 이미지와 내용이 들어있고 버튼이 '수정완료'

// 유효성검사
// 로그인 하지 않은 상태로 게시물 등록하면 '로그인이 필요합니다' 모달창
// 등록완료 버튼 클릭 시 ‘이대로 등록하시겠습니까?’ 모달창

const PostEdit = ({ navigate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [inputImg, setInputImg] = useState('');
    const [clickPost, setClickPost] = useState('');
    const param = useParams();
    const fileInput = useRef();
    const user = auth.currentUser;
    const displayName = user.displayName;

    const postToAdd = {
        id: uuidv4(),
        title,
        content,
        timestamp: serverTimestamp(),
        image: imageFile,
        nickname: displayName
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

    useEffect(() => {
        const editPostData = async () => {
            const editPostRef = doc(db, 'Post', param.id);
            const clickPost = await getDoc(editPostRef);
            // if (docSnap.exists()) {
            //     console.log('Document data:', docSnap.data());
            // } else {
            //     console.log('No such document!');
            // }
            setClickPost(clickPost.data());
        };
        editPostData();
    }, []);

    // 수정완료 버튼
    const uploadHandler = async () => {
        const uploadCheck = window.confirm('수정하시겠습니까?');
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
                // await setDoc(doc(db, 'Post', postToAdd.id), postToAdd);
                const washingtonRef = doc(db, 'Post', postToAdd.id);
                await updateDoc(
                    washingtonRef,
                    {
                        capital: true
                    },
                    postToAdd
                );

                const imageRef = ref(storage, `${postToAdd.id}/Post-image`);
                await uploadBytes(imageRef, imageUrl);
                await getDownloadURL(imageRef);
                setImageFile('');
                setTitle('');
                setContent('');
                // navigate('/detailpage/:id');
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
            setImageFile('');
            fileInput.current.value = '';
            setInputImg('');
        } else {
            return;
        }
    };

    const cancelBtn = () => {
        navigate('/mypage');
    };

    return (
        <div>
            <Container>
                <FormWrap onSubmit={onSubmit}>
                    {clickPost
                        .filter((post) => {
                            return post.id === param.id;
                        })
                        .map((post) => {
                            <>
                                <InputTitle
                                    key={post.id}
                                    value={title}
                                    type='text'
                                    onChange={titleChangeHandler}
                                    placeholder={post.title}
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
                                    {/* <ImageButton onClick={uploadHandler}>업로드</ImageButton> */}
                                    <Img src={post.image} />
                                    {!imageFile && <Span>이미지를 업로드해주세요</Span>}
                                </ImageWrap>

                                <InputContent
                                    value={content}
                                    type='text'
                                    onChange={contentChangeHandler}
                                    placeholder={post.content}
                                    maxLength={300}
                                />
                            </>;
                        })}

                    <ButtonWrap>
                        <Button onClick={uploadHandler}>수정완료</Button>
                        <Button onClick={cancelBtn}>취소하기</Button>
                    </ButtonWrap>
                </FormWrap>
            </Container>
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
    padding-bottom: 420px;
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
    height: 200px;
    padding: 20px;
    margin: 50px auto 0 auto;
    font-size: 20px;
    font-family: GmarketSansMedium;
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
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    margin: 30px 0 0 30px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;
export default PostEdit;
