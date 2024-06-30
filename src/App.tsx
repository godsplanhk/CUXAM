
import './App.css'
import { Dashboard } from './Pages/Dashboard';
import { Landing } from './Pages/Landing';
import { useLocation, Navigate } from 'react-router-dom';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { ModeToggle } from './components/mode-toggle';
import { Sidebar } from './components/ui/sidebar';
import { Generate } from './Pages/Generate';
import { RecoilRoot } from 'recoil';
import { Navbar } from './components/ui/navbar';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import api from './utils/axiosInstance';
import { UserManagement } from './Pages/UserManagement';
const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});
function AppWrapper() {
  return (
    <RecoilRoot>
      <AuthProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
}
function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';
  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();
  api.defaults.headers['Authorization'] = authHeader?.split(' ')[1] ?? null;
  return (
    <div>
      <div className='grid sticky top-0 shadow-sm border-b backdrop-blur-md dark:backdrop-blur-md bg-black-500/3 dark:bg-black-500/30 dark:border-gray-700'>
        <div className='flex'>
          <div className='w-[95vw]'>
            {!isAuthPage && <Navbar></Navbar>}
          </div>
          <div className='flex w-[5vw]'>
            <ModeToggle></ModeToggle>
          </div>
        </div>

      </div>
      {!isAuthPage && <Sidebar className="md:w-52 float-left h-full justify-left border-b border-r rounded-br-lg shadow-sm"></Sidebar>}

      <div className='grow overflow-y-auto no-scrollbar'>
        <Routes>
          <Route path='/login' element={Landing()}></Route>
          <Route element={<AuthOutlet fallbackPath='/login' />}>
            <Route path='/' element={isAuth ? <Navigate to={'/dashboard'} /> : <Navigate to={'/login'} />} />
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/generate' element={<Generate />}></Route>
            <Route path='/user-management' element={<UserManagement />}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default AppWrapper;
