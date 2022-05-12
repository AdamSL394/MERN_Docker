import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from '../views/login.js'
import Home from '../views/home.js'
import { ProtectedRoute } from '../hooks/protectedRoute.js';
import AllNotes from '../views/allNotes.js';

const Router = () => {
    return (<div>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/all" element={<AllNotes />} />
            </Route>
        </Routes>
    </div>
    )
}

export default Router