// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Sidebar from './components/Sidebar'
// import Navbar from './components/Navbar'
// import DisplayMessages from './components/DisplayMessages'
// import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
// import Login from './components/Login'
// import Register from './components/Register'

// function App() {


// 	return (
// 		<div>
// 			<BrowserRouter>
// 				<Routes>
// 					<Route path='/login' element={<Login />} />
// 					<Route path='/register' element={<Register />} />

// 					<Route path='/' element={
// 						<div className='flex overflow-hidden h-screen bg-[#272729] text-white '>
// 							<Sidebar />
// 							<div className='w-full '>
// 								<Navbar />
// 								<Outlet />
// 							</div>
// 						</div>
// 					}>
// 						<Route path='' element={<DisplayMessages />} />
// 						<Route path='new-chat' element={<DisplayMessages />} />
// 						<Route path=':chatId' element={<DisplayMessages />} />
// 					</Route>

// 				</Routes>




// 			</BrowserRouter>


// 		</div>
// 	)
// }

// export default App






import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import DisplayMessages from './components/DisplayMessages'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import MainLayout from './components/MainLayout'

function App() {


	return (
  <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<DisplayMessages />} />
          <Route path="new-chat" element={<DisplayMessages />} />
          <Route path=":chatId" element={<DisplayMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>


	
	)
}

export default App
