import React, { useState } from 'react'
import { MdMenu } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {

	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	const chats = useSelector(state => state.chats.value)

	return (
		<div
			// onMouseEnter={() => setIsSidebarOpen(true)}
			// onMouseLeave={() => setIsSidebarOpen(false)}
			className={` relative
					custom-scrollbar
					transition-all duration-750 ease-in-out
					overflow-y-scroll overflow-x-hidden
					${isSidebarOpen ? 'w-[300px]' : 'w-[80px]'}
					absolute md:relative z-50 pt-15
			`}
		>
			<div className=' absolute top-0 bg-[#111111] w-full	 text-2xl font-extrabold m-4 cursor-pointer '>
				<div
					className=' w-8 h-8 flex justify-center items-center '
					onClick={(e) => setIsSidebarOpen(!isSidebarOpen)}
				>
					<MdMenu className='cursor-pointer active:scale-90' />
				</div>
			</div>

			{
				isSidebarOpen ?
					<div className=' '>
						<Link to='/new-chat'>
							<div className='hover:bg-gray-300 cursor-pointer p-2'>New Chat</div>
						</Link>
						{
							chats.map(ch => {
								return (
									<Link key={ch._id} to={`${ch._id}`}>
										<div className='py-2 px-4  m-4 ml-8 hover:bg-gray-400 ' >
											{ch.name}
										</div>
									</Link>
								)
							})
						}
					</div> : ''
			}
		</div>
	)
}


export default Sidebar