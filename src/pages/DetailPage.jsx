import { collection, doc, getDoc, getDocs, query, where } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../shared/firebase';

function DetailPage() {
    const param = useParams();
    console.log(param.id);
    //홈에서 넘어올때 navigate에 정보를 담아서 보낸다
    //ariticle문서에서 param을 통해 map
    //여기서 id값을 찾는 쿼리를 보낸다. => 한개만 받으려면?query에서 getDocs가아닌 getDoc만 하고싶은데./,....
    //Expected type 'DocumentReference', but it was: a custom Query object 이게
    const [a, setA] = useState('');
    console.log(a);
    useEffect(() => {
        // const selectedPost
        const getArticle = async () => {
            const articleRef = collection(db, 'article');
            const q = query(articleRef, where('id', '==', param.id));
            const querySnapshot = await getDocs(q);
            const article = querySnapshot.docs.map((item) => item.data())[0];
            setA(article);
        };
        getArticle();
    }, []);

    return (
        <>
            <h1
                style={{
                    marginTop: '100px'
                }}
            >
                {a.title}
            </h1>
            <div
                style={{
                    display: 'flex'
                }}
            >
                <figure
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover'
                    }}
                >
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefmUiYhLM1ZMdSLeZFIjEy_w-4FT18sVxROf8yaaPgnlVLwKJt0D7sEmhSgxBfgDUQMs&usqp=CAU'
                        alt='프로필사진'
                        style={{
                            maxWidth: '100%'
                        }}
                    />
                </figure>
                <p>{a.displayName}</p>
            </div>
            <figure
                style={{
                    width: '500px',
                    height: '500px'
                }}
            >
                <img
                    src={a.image}
                    alt='사진'
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </figure>
            <div>
                <p>{a.content}</p>
            </div>
        </>
    );
}

export default DetailPage;
