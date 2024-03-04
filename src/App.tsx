
import './App.css'
import { useState } from 'react';
import { Dashboard } from './Pages/Dashboard';
import { Landing } from './Pages/Landing';
import { useLocation} from 'react-router-dom';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { ModeToggle } from './components/mode-toggle';
import { Sidebar } from './components/ui/sidebar';
import { Generate } from './Pages/Generate';

import{RecoilRoot, useRecoilState} from 'recoil';
import { isSidebarOpenState } from './state/atoms/sidebar';
import { Navbar } from './components/ui/navbar';
function AppWrapper() {
  return (
    <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </RecoilRoot>
  );
}
function App() {

  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'||location.pathname === '/'; 
  return (
    <div>
      <div className='grid sticky top-0 shadow-sm border-b backdrop-blur-md dark:backdrop-blur-md bg-black-500/3 dark:bg-black-500/30 dark:border-gray-700 '>
            <ModeToggle></ModeToggle>

    {!isAuthPage && <Navbar></Navbar>}
      </div>
    {!isAuthPage && <Sidebar className="float-left h-full justify-left border-b border-r rounded-br-lg shadow-sm"></Sidebar>}
    <div className='flex z-10 justify-items-start' >
      <div className='grow h-screen overflow-y-auto no-scrollbar'>
      <Routes>
      <Route path='/' element={Landing()}></Route>
      <Route path='/login' element={Landing()}></Route>
      <Route path='/dashboard' element={Dashboard()}></Route>
      <Route path = '/generate' element={Generate()}></Route>
      </Routes>
      </div>
      </div>
      </div>
  )
}

export default AppWrapper;
