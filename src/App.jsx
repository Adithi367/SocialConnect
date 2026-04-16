import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddPost from './pages/AddPost'
import MyPost from './pages/MyPost'
import Allpost from './pages/Allpost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mypost' element={<MyPost/>}/>        
        <Route path='/addpost' element={<AddPost/>}/>
        <Route path='/allpost' element={<Allpost/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
