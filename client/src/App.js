import './App.css';
import React from 'react';
import {Card} from "./components/card"
import Navbar from './components/nav';
function App() {
  return (
  <div className="App">
    <Navbar></Navbar>
    <Card></Card>
    </div>
  );
}

export default App;
