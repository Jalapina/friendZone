import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import GeneratedMIDI from './components/GeneratedMIDI/GeneratedMIDI';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/mymusic" component={GeneratedMIDI} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
