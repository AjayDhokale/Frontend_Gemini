import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import conf from '../config/config';


const Register = () => {

	const [formData, setFormData] = useState({
		name: '', email: '', password: '', dob: '', city: '',
	})

	const [comfirmPassword, setComfirmPassword] = useState()
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

		if (formData.password !== comfirmPassword) {
			alert('Password and Confirm password should be same')
			return
		}

		console.log("1");

		// Post req with axios
		try {
			console.log("3");

			const res = await axios.post(`${conf.backendApIUrl}/api/v1/auth/register`, formData)
			console.log("4");
			alert(res.data.message)
			if (res.data.status == 'success') {
				navigate('/login')
			}
			console.log("2");

		} catch (err) {
			console.log("Error : " + err.message);
		}
	}

	console.log(formData);
	console.log(comfirmPassword);


	return (
		<div className='flex justify-center items-center h-screen'>
			<form action="" onSubmit={handleSubmitForm} className='shadow-[0_0_10px_rgba(128,128,128)]  p-5 w-80 h-150 flex justify-between items-center flex-col'>

				<h1 className='multicolor-text h-13 font-bold text-4xl '>Register</h1>

				<div className=''>
					<label htmlFor="" className='text-gray-700'>Enter Name</label>
					<br />
					<input type="text" name='name' className='text-xl border-2 rounded-lg py-1  px-4 mb-2' placeholder='enter name'
						onChange={handleChange}
						value={formData.name}
					/>
				</div>

				<div className=''>
					<label htmlFor="" className='text-gray-700'>Enter email</label>
					<br />
					<input type="text" name='email' className='text-xl border-2 rounded-lg py-1  px-4 mb-2' placeholder='Enter email'
						onChange={handleChange}
						value={formData.email}
					/>
				</div>

				<div className=''>
					<label htmlFor="" className='text-gray-700'>Enter dob</label>
					<br />
					<input type="date" name='dob' className='text-xl border-2 rounded-lg py-1  px-4 mb-2' placeholder='Enter Dob'
						onChange={handleChange}
						value={formData.dob}
					/>
				</div>

				<div className=''>
					<label htmlFor="" className='text-gray-700'>Enter city</label>
					<br />
					<input type="text" name='city' className='text-xl border-2 rounded-lg py-1  px-4 mb-2' placeholder='Enter city'
						onChange={handleChange}
						value={formData.city}
					/>
				</div>
				
				<div className=''>
					<label htmlFor="" className='text-gray-700'>Enter password</label>
					<br />
					<input type="text" name='password' className='text-xl border-2 rounded-lg py-1  px-4 m 2'
						placeholder='*********'
						onChange={handleChange}
						value={formData.password}
					/>
				</div>

				<div className=''>
					<label htmlFor="" className='text-gray-700'>Confirm password</label>
					<br />
					<input type="text" name='' className='text-xl border-2 rounded-lg py-1  px-4 m 2'
						placeholder='*********'
						onChange={(e) => setComfirmPassword(e.target.value)}
						value={comfirmPassword}
					/>
				</div>

				<div className='mb-3  flex justify-center' >
					<button type="submit" className='px-8 py-2 font-bold  border text-white bg-[#00ccff]'><span className=''>Register</span></button>
				</div>
			</form>
		</div>
	)
}

export default Register