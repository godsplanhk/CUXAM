
import './App.css'
import { Dashboard } from './Pages/Dashboard';
import { Landing } from './Pages/Landing'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={Landing()}></Route>
      <Route path='/login' element={Landing()}></Route>
      <Route path='dashboard' element={Dashboard()}>//</Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
