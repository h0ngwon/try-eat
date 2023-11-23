import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/Layout';
import PostEditDetail from '../pages/PostEditDetail';
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
>>>>>>> 4b8fda34e8556b5afc177a4655769da221f76fd9

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
<<<<<<< HEAD
                    <Route path="/" element={<Home />} />
                    <Route path="/editDetail" element={<PostEditDetail />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
=======
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage/>}/>
>>>>>>> 4b8fda34e8556b5afc177a4655769da221f76fd9
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
