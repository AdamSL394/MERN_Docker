import React from 'react';
import Nav from '../components/nav.js';
import {HomeView} from '../components/homeView.js';

export default function Home() {
    return (
        <div>
            <Nav></Nav>
            <HomeView></HomeView>
        </div>
    );
}
