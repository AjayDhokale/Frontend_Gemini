// import React, { useState } from 'react'
// import { FaUserAlt } from "react-icons/fa";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { CgMenuGridR } from "react-icons/cg";
// import { SiFiles } from "react-icons/si";
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
// import { logOutUser } from '../features/authSlice';





// const Navbar = () => {

// 	const { chatId } = useParams()

// 	const chats = useSelector(state => state.chats.value)
// 	const chat = chats.find(ch => ch._id == chatId)			 // <-- FIX
// 	const loggedUser = useSelector(state => state.auth.user)

// 	const dispatch = useDispatch()
// 	const navigate = useNavigate()


// 	const logOut = () => {
// 		dispatch(logOutUser())		 // <-- FIX
// 		navigate('/login')
// 	}

// 	return (
// 		<nav className='flex justify-between  w-full items-center text-2xl  px-3 py-1'>

// 			<h1 className='text-lg font-semibold tracking-wide'>
// 				Gemini
// 				<div className='bg-[#2a2a2a] flex justify-center items-center text-sm font-bold border rounded-2xl px-1 pl-3 text-[gray]'>
// 					2.0 Flash
// 					<div className=' flex justify-center items-center font-extrabold text-xl '>
// 						<IoMdArrowDropdown />
// 					</div>
// 				</div>
// 			</h1>

// 			<div><h1>{chat ? chat.name : ''}</h1></div>

// 			<div className='text-3xl cursor-pointer flex justify-center items-center gap-2 '>
// 				{/* <div className='text-2xl h-8 w-8 rounded-full flex justify-center items-center hover:bg-[#4b4b4b]  '>
// 					<CgMenuGridR />
// 				</div>
// 				<div className='text-xl h-8 w-8 rounded-full flex justify-center items-center hover:bg-[#4b4b4b] '>
// 					<SiFiles />
// 				</div> */}

// 				{/* <div className='text-xl h-8 gap-5 flex justify-center items-center hover:bg-[#4b4b4b] '>
// 					<FaUserAlt />
// 				</div> */}

// 				{loggedUser && (
// 					<div className="flex items-center gap-4 text-xl">
// 						<FaUserAlt />
// 						<button onClick={logOut} className="hover:text-red-400">
// 							Logout
// 						</button>
// 					</div>
// 				)}
// 				{/* <button type="button" className='cursor-pointer hover:bg-[#4b4b4b]' onClick={logOut}>Logout</button> */}

// 			</div>

// 		</nav >
// 	)
// }




// export default Navbar


import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { SiFiles } from "react-icons/si";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logOutUser } from '../features/authSlice';





const Navbar = () => {

	const { chatId } = useParams()

	const chats = useSelector(state => state.chats.value)
	const chat = chats.find(ch => ch._id == chatId)			 // <-- FIX
	const loggedUser = useSelector(state => state.auth.user)

	const dispatch = useDispatch()
	const navigate = useNavigate()


	const logOut = () => {
		dispatch(logOutUser())		 // <-- FIX
		navigate('/login')
	}

	return (
		<nav className='bg-slate-900 text-white px-4 py-3 flex justify-between items-center'>

			<h1 className='text-lg font-semibold tracking-wide'>
				Gemini
				<div className='bg-[#2a2a2a] flex justify-center items-center text-sm font-bold border rounded-2xl px-1 pl-3 text-[gray]'>
					2.5 Flash
					<div className=' flex justify-center items-center font-extrabold text-xl '>
						<IoMdArrowDropdown />
					</div>
				</div>
			</h1>

			<div><h1>{chat ? chat.name : ''}</h1></div>

			<div className='text-3xl cursor-pointer flex justify-center items-center gap-2 '>
			

				{loggedUser && (
					<div className="flex items-center gap-4 text-xl">
						<FaUserAlt />
						<button onClick={logOut} className="hover:text-red-400">
							Logout
						</button>
					</div>
				)}
				{/* <button type="button" className='cursor-pointer hover:bg-[#4b4b4b]' onClick={logOut}>Logout</button> */}

			</div>

		</nav >
	)
}

export default Navbar