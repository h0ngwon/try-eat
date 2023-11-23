import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import MyPage from '../pages/MyPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DetailPage from '../pages/DetailPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/detailpage/:id' element={<DetailPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Route>
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
