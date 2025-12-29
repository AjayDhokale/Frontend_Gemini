import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { SiFiles } from "react-icons/si";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logOutUser } from '../features/authSlice';
import ProfileMenu from './ProfileMenu';
import { TbSearch } from "react-icons/tb";
import { IoClose } from "react-icons/io5";




const Navbar = () => {

	const { chatId } = useParams()

	const chats = useSelector(state => state.chats.value)
	const chat = chats.find(ch => ch._id == chatId)
	const user = useSelector(state => state.auth.user)

	const [profileMenuOpen, setProfileMenuOpen] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const shortenText = (text, maxLength = 20) => {
		if (!text) return "";
		return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
	};


	return (
		<nav className='bg-slate-900 text-white px-4 py-3 flex justify-between items-center'>

			<div className='w-full'>
				<h1 className='text-lg font-semibold tracking-wide  '>
					Gemini
				</h1>
				<div className='bg-[#2a2a2a] flex justify-center w-fit items-center text-sm font-bold border rounded-2xl px-1 pl-3 text-[gray]'>
					2.5 Flash
					<div className=' flex justify-center items-center font-extrabold text-xl '>
						<IoMdArrowDropdown />
					</div>
				</div>
			</div>

			<div className='w-full'>
				<h1 className='capitalize'>{chat ? shortenText(chat.name) : ''}</h1>
			</div>

			{/* Search Bar */}
			{/* <div className='w-full'>

				{
					isSearching ? (
						<div className='flex  justify-center items-center border p-2'>
							<input type="text" className='  w-100' placeholder='Search chats...' />
							<button className=''
								onClick={() => setIsSearching(false)}
							>
								<IoClose />
							</button>
						</div>

					) : (
						<div className='flex '>
							<button onClick={
								() => setIsSearching(true)}
								className="cursor-pointer text-2xl mr-2  flex items-center justify-center text-white font-bold uppercase"
							>

								<TbSearch />

							</button>
							Search Chats
						</div>
					)

				}
			</div> */}


		</nav >
	)
}

export default Navbar