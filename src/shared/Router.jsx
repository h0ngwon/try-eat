import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MyPage from '../pages/MyPage';
import PostAddPage from '../pages/PostAddPage';
import Modal from '../components/Modal';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DetailPage from '../pages/DetailPage';
import PostEditPage from '../pages/PostEditPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/post' element={<PostAddPage />} />
                    <Route path='/edit' element={<PostEditPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/detailpage/:id' element={<DetailPage />} />
                </Route>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/modal' element={<Modal />} />
                <Route path='/mypage' element={<MyPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
