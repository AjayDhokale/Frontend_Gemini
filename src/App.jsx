import './App.css'
import DisplayMessages from './components/DisplayMessages'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import MainLayout from './components/MainLayout'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DisplayMessages/>} />
          <Route  path="new-chat" element={<DisplayMessages />} />
          <Route path=":chatId" element={<DisplayMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>



  )
}

export default App
