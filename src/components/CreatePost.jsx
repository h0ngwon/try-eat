import React from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';

const CreatePost = ({ navigate }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const contentChangeHandler = (event) => {
        setContent(event.target.value);
    };
    return (
        <div>
            <Container>
                <FormWrap>
                    <InputTitle
                        value={title}
                        type="text"
                        onChange={titleChangeHandler}
                        placeholder="제목을 입력해주세요(최대 15자)"
                        maxLength={15}
                    />
                    <div
                        style={{
                            width: '100vw',
                            borderTop: '1px solid black'
                        }}
                    >
                        <InputImage>이미지가 들어갈 부분</InputImage>
                    </div>
                    <InputContent
                        value={content}
                        type="text"
                        onChange={contentChangeHandler}
                        placeholder="설명을 입력해주세요(최대 300자)"
                        maxLength={300}
                    />
                    <ButtonWrap>
                        <Button>등록</Button>
                        <Button>삭제</Button>
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

const InputImage = styled.div`
    display: flex;
    justify-content: center;
    width: 800px;
    height: 800px;
    background-color: white;
    margin: 50px auto 0 auto;
    border: 2px solid black;
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
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;
export default CreatePost;
