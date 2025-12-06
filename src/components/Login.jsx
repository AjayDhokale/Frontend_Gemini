import React, { useState } from 'react'
import { setUserData } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getChatOfUser } from '../services/service'
import { setChats } from '../features/chatSlice'
import conf from '../config/config';


const Login = () => {

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleChange = (e) => {

		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})

	}

	const handleSubmitForm = async (e) => {
		e.preventDefault()
		

		try {
			const res = await axios.post(`${conf.backendApIUrl}/auth/login`, formData)
			// ajay@gmail.com 
			// ajay123

			alert(res.data.message)

			if (res.data.status === 'success') {
				localStorage.setItem('token', res.data.token)
				localStorage.setItem('user', JSON.stringify(res.data.data))

				const userData = {
					user: res.data.data,
					token: res.data.token,
				}

				dispatch(setUserData(userData))

				const usersChats = await getChatOfUser()
				dispatch(setChats(usersChats))
				navigate('/new-chat')

			} else{
				navigate('/login')
			}

		} catch (err) {
			console.error('Error: '+ err.message);
			
		}


		// post req to validate user
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<form action="" onSubmit={handleSubmitForm} className='shadow-[0_0_10px_rgba(128,128,128)]  p-5 w-80 h-120 flex justify-between items-center flex-col'>

				<h1 className='multicolor-text h-13 font-bold text-4xl '>Login</h1>

				<div className=''>
					<label htmlFor="" className='text-gray-700'>Enter email</label>
					<br />
					<input
						type="email"
						name='email'
						className='text-xl border-2 rounded-lg p-2 mb-6'
						placeholder='abc@gmail.com'
						value={formData.email}
						onChange={handleChange}
					/>
				</div>

				<div className=''>
					<label htmlFor="" className='text-gray-700'>Enter password</label>
					<br />
					<input
						type="password"
						name='password'
						className='text-xl border-2 rounded-lg p-2 mb-6'
						placeholder='*********'
						value={formData.password}
						onChange={handleChange}
					/>
				</div>

				<div className='mb-3  flex justify-center' >
					<button type="submit" className='px-8 py-2 font-bold  border text-white bg-[#00ccff]'><span className=''>Login</span></button>
				</div>
			</form>
		</div>
	)
}

export default Login