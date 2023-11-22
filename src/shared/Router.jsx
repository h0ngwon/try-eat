import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="register" element={<RegisterPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
