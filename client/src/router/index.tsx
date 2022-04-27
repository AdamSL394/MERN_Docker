import { FC } from 'react'
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from '../views/login'
import Home from '../views/home'
import { ProtectedRoute } from '../hooks/protectedRoute';
import AllNotes from '../views/allNotes';

const Router: FC = () => {
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