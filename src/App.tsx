
import './App.css'
import { Dashboard } from './Pages/Dashboard';
import { Landing } from './Pages/Landing'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { ModeToggle } from './components/mode-toggle';
import { Sidebar } from './components/ui/sidebar';
import { Generate } from './Pages/Generate';
function App() {
  return (
    <>
    <ModeToggle></ModeToggle>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={Landing()}></Route>
      <Route path='/login' element={Landing()}></Route>
      <Route path='dashboard' element={Dashboard()}>
        <Route path = 'generate' element={Generate()}></Route>
      </Route>
      </Routes>
   </BrowserRouter></>
  )
}

export default App
