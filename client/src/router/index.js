import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../views/Login/login.js';
import Home from '../views/Home/home.js';
import { ProtectedRoute } from '../hooks/protectedRoute.js';
import AllNotes from '../views/AllNotes/allNotes.js';
import UploadNotes from '../views/Upload/upload.js';
import UserSettings from '../views/UserSettings/userSettings.js'

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/all" element={<AllNotes />} />
                    <Route path="/upload" element={<UploadNotes />} />
                    <Route path="/userSettings" element={<UserSettings />} />
                </Route>
            </Routes>
        </>
    );
};

export default Router;
