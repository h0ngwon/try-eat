import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import dummy from '../sampleUserinfo.json';
import { useState } from 'react';

const Router = () => {
    const [users, setUsers] = useState(dummy);
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Route>
                <Route path='/modal/:id' element={<Modal users={users} setUsers={setUsers} />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
