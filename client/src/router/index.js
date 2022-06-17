import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from '../views/login.js'
import Home from '../views/home.js'
import { ProtectedRoute } from '../hooks/protectedRoute.js';
import AllNotes from '../views/allNotes.js';
import UploadNotes from '../views/upload.js';

const Router = () => {
    return (<>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/all" element={<AllNotes />} />
                    <Route path="/upload" element={<UploadNotes />} />
                </Route>
            </Routes>
    </>
    )
}

export default Router