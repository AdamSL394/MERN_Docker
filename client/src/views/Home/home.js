import React from 'react';
import Nav from '../../components/Navbar/nav.js';
import { HomeView } from '../../components/HomeView/homeView.js';

export default function Home() {
  return (
    <div>
      <Nav></Nav>
      <HomeView></HomeView>
    </div>
  );
}
