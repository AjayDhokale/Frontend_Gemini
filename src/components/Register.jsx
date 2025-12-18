import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import conf from '../config/config';


const Register = () => {

	const [formData, setFormData] = useState({
		name: '', email: '', password: '', dob: '', city: '',
	})

	const [confirmPassword, setConfirmPassword] = useState()
	confirmPassword
	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmitForm = async (e) => {
		e.preventDefault()

		if (formData.name == '' || formData.email == '' || formData.password == '' || formData.dob == '' || formData.city == '') {
			alert("fill All Fields")
			return
		}

		if (formData.password !== confirmPassword) {
			alert('Password and Confirm password should be same')
			return
		}


		try {

			const res = await axios.post(`${conf.backendApIUrl}/api/v1/auth/register`, formData)
			alert(res.data.message)
			if (res.data.status == 'success') {
				navigate('/login')
			}

		} catch (err) {
			console.log("Error : " + err.message);
		}
	}


	return (
		<div className="flex justify-center items-center h-screen bg-[#121212] text-white">
			<form
				onSubmit={handleSubmitForm}
				className="bg-[#1f1f1f] border border-gray-700 px-8 py-4 rounded-xl  w-[500px] shadow-lg"
			>
				<h1 className="text-center text-3xl font-semibold font-serif text-blue-600 mb-4">
					Register Form
				</h1>

				<div className="mb-3">
					<label className="block text-lg font-serif mb-1">Name:</label>
					<input
						type="text"
						name="name"
						placeholder="Enter Name"
						className="w-full border border-gray-600 rounded-md px-3 py-2 text-lg bg-[#2a2a2a] focus:outline-none  "
						onChange={handleChange}
						value={formData.name}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="block text-lg font-serif mb-1">Email:</label>
					<input
						type="email"
						name="email"
						placeholder="Enter Email"
						className="w-full border border-gray-600 bg-[#2a2a2a] rounded-md px-3 py-2 text-lg focus:outline-none  "
						onChange={handleChange}
						value={formData.email}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="block text-lg font-serif mb-1">DOB:</label>
					<input
						type="date"
						name="dob"
						className="w-full border border-gray-600 bg-[#2a2a2a] rounded-md px-3 py-2 text-lg focus:outline-none  "
						onChange={handleChange}
						value={formData.dob}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="block text-lg font-serif mb-1">City:</label>
					<input
						type="text"
						name="city"
						placeholder="Enter Name"
						className="w-full border border-gray-600 bg-[#2a2a2a] rounded-md px-3 py-2 text-lg focus:outline-none  "
						onChange={handleChange}
						value={formData.city}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="block text-lg font-serif mb-1">Password:</label>
					<input
						type="password"
						name="password"
						placeholder="*****"
						className="w-full border border-gray-600 bg-[#2a2a2a] rounded-md px-3 py-2 text-lg focus:outline-none  "
						onChange={handleChange}
						value={formData.password}
						required
					/>
				</div>

				<div className="mb-6">
					<label className="block text-lg font-serif mb-1">Confirm Password:</label>
					<input
						type="password"
						name="confirmPassword"
						placeholder="*****"
						className="w-full border border-gray-600 bg-[#2a2a2a] rounded-md px-3 py-2 text-lg focus:outline-none  "
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
						required
					/>
				</div>

				<div className='flex justify-center items-center'>
					<button
						type="submit"
						className=" bg-blue-600 text-white p-2 pr-4 pl-4 rounded-md text-lg hover:bg-blue-700 transition font-serif"
					>Register
					</button>

				</div>
				<p className="text-center mt-5">Don't have account? <span className="text-blue-400 underline"><Link to='/login' >Login</Link></span> </p>

			</form>
		</div>

	)
}

export default Register