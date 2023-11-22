import React from 'react';
import data from '../samplePost.json';
import styled, { css } from 'styled-components';
//auto scroll 자동으로 스크롤을 내려줌

const Home = () => {
    return (
        <>
            <main
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Container>
                    {data.map((itme) => {
                        return (
                            <CardList
                                key={itme.id}
                                style={{
                                    backgroundColor: 'yellow',
                                    border: '3px solid red'
                                }}
                            >
                                <figure>
                                    <img
                                        src={itme.image}
                                        alt="이미지"
                                        style={{
                                            maxWidth: '100%'
                                        }}
                                    />
                                </figure>
                                <p>{itme.title}</p>
                                <p>{itme.content}</p>
                            </CardList>
                        );
                    })}
                </Container>
                <button
                    style={{
                        position: 'fixed',
                        right: '4rem',
                        bottom: '4rem',
                        borderRadius: '50%',
                        height: '6rem',
                        width: '6rem'
                    }}
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }}
                >
                    TOP
                </button>
            </main>
        </>
    );
};

export default Home;

const Container = styled.ul`
    width: 80%;
    margin: 50px;
    padding: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
`;

const CardList = styled.li`
    min-height: 400px;
    &:nth-child(10n + 1),
    :nth-child(10n + 4),
    :nth-child(10n + 7),
    :nth-child(10n + 10) {
        grid-column: auto/span 2;
    }
    &:nth-child(10n + 3) {
        grid-row: auto/ span 2;
    }
`;
