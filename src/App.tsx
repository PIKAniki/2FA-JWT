import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginComponent from './components/login/LoginComponent'
import RegisterComponent from './components/register/RegisterComponent'
import WelcomeComponent from './components/WelcomeComponent'
import Home from './components/Home'



function App() {

  return (
    <Routes>
      <Route path='' element={<Home />}>
        <Route path="/login" element={<LoginComponent />} />
        <Route path='register' element={<RegisterComponent />} />
        <Route path='welcome' element={<WelcomeComponent />} />
      </Route>
    </Routes>
  )
}

export default App
