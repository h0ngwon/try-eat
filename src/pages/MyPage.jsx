import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth, db } from '../shared/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { done, load } from '../redux/modules/loadingReducer';
import Loading from '../components/ui/Loading';

export default function MyPage() {
    const [nickname, setNikcname] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const [comment, setCommnet] = useState('');
    const [myPosts, setMyPosts] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [likePosts, setLikePosts] = useState([]);
    const [allPost, setAllPost] = useState();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.loadingReducer.isLoading);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'Post'), where('nickname', '==', auth.currentUser.displayName));
                const querySnapshot = await getDocs(q);
                const fbdata = querySnapshot.docs.map((doc) => doc.data());
                const sortedData = fbdata.sort((a, b) => {
                    return b.timestamp - a.timestamp;
                });
                setMyPosts(sortedData);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    // 로그인한 사용자 이름과 사진 가져오기
    useEffect(() => {
        const unsubscribe = () => {
            dispatch(load());
            auth.onAuthStateChanged((user) => {
                if (user) {
                    const displayName = auth.currentUser.displayName;
                    const photoUrl = auth.currentUser.photoURL;
                    setNikcname(displayName);
                    setUserPhoto(photoUrl);
                    dispatch(done());
                } else {
                    navigate('/');
                }
            });
        };
        unsubscribe();
    }, []);

    // 로그인한 사용자 userInfo 가져오기
    useEffect(() => {
        const fetchData = async () => {
            dispatch(load());
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const docRef = doc(db, 'userInfo', auth.currentUser.displayName);
                    const docSnap = await getDoc(docRef);
                    setCommnet(docSnap.data().comment);
                    dispatch(done());
                }
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchAll = async () => {
            const allPost = await getDocs(collection(db, 'Post'));
            const Posts = allPost.docs.map((doc) => doc.data());
            setAllPost(Posts);
        };
        fetchAll();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const docRef = doc(db, 'userInfo', auth.currentUser.displayName);
                    const docSnap = await getDoc(docRef);
                    setLikeList(docSnap.data().likeList);
                }
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        const a = likeList.map((data) => {
            return allPost.find((item) => {
                return item.id.includes(data);
            });
        });
        setLikePosts(a);
    }, [likeList]);

    const deletePost = async (post) => {
        const deleteCheck = window.confirm('삭제하시겠습니까?');
        if (deleteCheck) {
            await deleteDoc(doc(db, 'Post', post.id));
            const deleted = myPosts.filter((data) => {
                return data.id !== post.id;
            });
            setMyPosts(deleted);
        } else {
            return;
        }
    };

    return (
        <Container>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Header>
                        <LogoContainer onClick={() => navigate('/')}>Try Eat</LogoContainer>
                        <Title>마이페이지</Title>
                    </Header>
                    <ProfileEdit>
                        <MyPhoto>
                            <img src={userPhoto} />
                        </MyPhoto>
                        <UserEdit>
                            <Ment>{nickname}님, 반갑습니다!</Ment>
                            <Comment>{comment}</Comment>
                            <EditBtn
                                onClick={() => {
                                    navigate(`/profile`);
                                }}
                            >
                                프로필 수정
                            </EditBtn>
                        </UserEdit>
                    </ProfileEdit>
                    <MyPost>나의 게시물</MyPost>
                    <PostContainer>
                        <PostList>
                            {myPosts.map((post) => {
                                return (
                                    <Post key={post.timestamp}>
                                        <div>
                                            <PostImage
                                                onClick={() => {
                                                    navigate(`/detailpage/${post.id}`);
                                                }}
                                                src={post.image}
                                                alt='이미지'
                                            />
                                        </div>
                                        <PostTitle>{post.title}</PostTitle>
                                        <PostComment>{post.content}</PostComment>
                                        <Buttons>
                                            <Button
                                                onClick={() => {
                                                    navigate(`/edit/${post.id}`);
                                                }}
                                            >
                                                수정
                                            </Button>
                                            <Button onClick={() => deletePost(post)}>삭제</Button>
                                        </Buttons>
                                    </Post>
                                );
                            })}
                        </PostList>
                    </PostContainer>
                    <LikeWrap>좋아요 목록</LikeWrap>
                    <LikePostContainer>
                        <LikeList>
                            {likePosts.map((item) => {
                                return (
                                    <Post key={item.timestamp}>
                                        <div>
                                            <LikedImage
                                                onClick={() => {
                                                    navigate(`/detailpage/${item.id}`);
                                                }}
                                                src={item.image}
                                                alt='이미지'
                                            />
                                            <LikedTitle>{item.title}</LikedTitle>
                                            <LikedContent>{item.content}</LikedContent>
                                            <LikedNickname>작성자 : {item.nickname}</LikedNickname>
                                        </div>
                                    </Post>
                                );
                            })}
                        </LikeList>
                    </LikePostContainer>
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100%;
    margin-bottom: 300px;
`;
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    border-bottom: 2px solid lightgrey;
    height: 120px;
`;

const Title = styled.span`
    display: flex;
    justify-content: center;
    width: 50vw;
    margin: 30px 30px;
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 500;
    font-family: GmarketSansMedium;
    margin: 0;
    padding: 20px;
`;

const Comment = styled.div`
    height: 20px;
`;

const ProfileEdit = styled.section`
    display: flex;
    justify-content: flex-start;
    margin-left: 150px;
    padding-top: 50px;
    padding-bottom: 50px;
    gap: 80px;
`;

const UserEdit = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
`;

const MyPhoto = styled.div`
    & img {
        border-radius: 50%;
        width: 200px;
        height: 200px;
    }
`;

const Ment = styled.div`
    display: block;
    font-size: 23px;
    font-weight: 500;
    font-family: GmarketSansMedium;
`;

const EditBtn = styled.button`
    padding: 10px;
    background-color: #e14d2a;
    color: white;
    width: 120px;
    border-radius: 15px;
    border: 0px;
    font-family: GmarketSansLight;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.2s;
    }
`;

const PostContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    margin: 0 auto 100px auto;
`;

const MyPost = styled.h2`
    display: block;
    padding-top: 50px;
    padding-bottom: 70px;
    padding-left: 150px;
    font-family: GmarketSansMedium;
    font-size: 25px;
    font-weight: 500;
    border-top: 2px solid lightgrey;
`;

const PostList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* justify-items: start; */
    gap: 80px;
    margin: 0;
`;
const Post = styled.div`
    display: flex;
    flex-direction: column;
    /* border: 1px solid darkgray; */
    width: 400px;
    height: 600px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const Button = styled.button`
    background-color: #e14d2a;
    color: white;
    width: 80px;
    padding: 10px;
    border-radius: 30px;
    border: 0px;
    /* margin-bottom: 30px; */
    font-size: 15px;
    font-family: GmarketSansLight;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;

const PostImage = styled.img`
    width: 400px;
    height: 400px;
    border: none;
    border-radius: 30px;
    margin-bottom: 20px;
    object-fit: cover;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        transition: all 0.5s;
    }
`;

const PostTitle = styled.p`
    height: 70px;
    font-size: 23px;
    font-family: GmarketSansMedium;
`;

const PostComment = styled.p`
    height: 150px;
    font-family: GmarketSansLight;
    line-height: 25px;
`;

const LogoContainer = styled.span`
    margin-left: 180px;
    font-size: 36px;
    color: #e14d2a;
    font-family: 'EF_jejudoldam';
    justify-content: flex-start;
    cursor: pointer;
`;

const LikeWrap = styled.h2`
    display: block;
    padding-top: 50px;
    padding-bottom: 70px;
    padding-left: 150px;
    font-family: GmarketSansMedium;
    font-size: 25px;
    font-weight: 500;
    border-top: 2px solid lightgrey;
    margin-top: 50px;
`;

const LikePostContainer = styled.section`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100%;
    margin: 0 auto 100px auto;
`;

const LikeList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: start;
    gap: 80px;
    margin: 0;
`;

const LikedImage = styled.img`
    width: 400px;
    height: 400px;
    border: none;
    border-radius: 30px;
    margin-bottom: 20px;
    object-fit: cover;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        transition: all 0.5s;
    }
`;

const LikedTitle = styled.p`
    margin: 10px auto 10px auto;
    font-size: 23px;
    font-family: GmarketSansMedium;
`;

const LikedContent = styled.p`
    margin: 10px auto 10px auto;
    font-family: GmarketSansLight;
    line-height: 25px;
`;

const LikedNickname = styled.div`
    margin: 10px auto 10px auto;
    font-family: GmarketSansLight;
`;
