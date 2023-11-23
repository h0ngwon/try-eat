import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>Home</h1>
            <button
                style={{
                    marginTop: '100px'
                }}
                onClick={() => {
                    navigate('/editDetail');
                }}
            >
                글쓰기
            </button>
        </>
    );
};

export default HomePage;
