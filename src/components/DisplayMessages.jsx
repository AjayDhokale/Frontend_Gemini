import { useEffect, useId, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../features/messagesSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { marked } from "marked";
import { RiGeminiLine } from "react-icons/ri";
import axios from 'axios';
import { createNewChatinDB, createNewMessageinDB, getChatOfUser, getGeminiResponse, getMessagesOfChat } from '../services/service';
import { setChats } from '../features/chatSlice.js';

const DisplayMessages = () => {

	const { chatId } = useParams()
	const newId = useId()
	const [formData, setFormData] = useState({ userInput: '' })
	const [isLoading, setIsLoading] = useState(false)
	const user = useSelector(state => state.auth.user)
	const messages = useSelector(state => state.messages.value)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	

	const token = useSelector(state => state.auth.token)
	console.log(token);
	

	useEffect(() => {
		if (!chatId) return		// <-- FIX

		(async () => {
			const usersChats = await getChatOfUser()
			// New
			dispatch(setChats(usersChats))

			const userMessages = await getMessagesOfChat(chatId)
			// console.log("Fetched Messages:", userMessages);

			// FIX: message API sometimes returned false → now safe
			dispatch(setMessages(userMessages || []));

			// navigate('/new-chat')
		})()
	}, [chatId])


	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.userInput) return;

		const userMsg = formData.userInput; // store it safely
		setFormData({ userInput: '' });
		setIsLoading(true);

		try {
			let currentChatId = chatId;

			// New 
			// ---------------- FIX 2: Create new chat correctly ----------------
			if (!currentChatId) {

				const newChatObj = await createNewChatinDB(userMsg);

				// FIX: fetch full chat list instead of setChats([newChatObj])
				const updatedChatList = await getChatOfUser();
				dispatch(setChats(updatedChatList));

				currentChatId = newChatObj._id;
				navigate(`/${currentChatId}`);
			}

			// New
			// ---------------- FIX 3: Immediate UI update for user message ----------------
			dispatch(addMessage({
				text: userMsg,
				isGeminiResponse: false,
				_id: Date.now()
			}));

			// Store user message in DB
			await createNewMessageinDB(userMsg, currentChatId, false);

			// New
			// ---------------- FIX 4: AI answer safely handled ----------------
			const answer = await getGeminiResponse(userMsg);
			// const htmlAns = marked(answer);
			const htmlAns = answer;

			dispatch(addMessage({
				text: htmlAns,
				isGeminiResponse: true,
				_id: Date.now() + 1
			}));

			await createNewMessageinDB(htmlAns, currentChatId, true);

		}
		catch (err) {
			console.log("Handle Submit :: Chat error:", err.message);
		}

		setIsLoading(false);
	};


	return (
		<div className='relative h-[100%] '>
			<div className='h-[90%] p-6 overflow-y-auto custom-scrollbar' >
				{
					messages.length > 0 ?
						messages.map((msg) => {
							return (
								<div
									className={` flex items-start text-xl  ${msg.isGeminiResponse ? '' : 'justify-end rounded-4xl'}`}
									key={msg._id}
								>
									{
										msg.isGeminiResponse ? (
											<div className="mr-2 flex justify-start items-start bg-gradient-to-r from-pink-500 to-violet-500 p-1 rounded-full my-10">
												<RiGeminiLine className=" text-2xl " />
											</div>
										)	: null
									}
									{
										msg.isGeminiResponse ?
											<div
												key={msg._id}
												className={`mb-2 text-xl max-w-[80%] text-justify ai-response p-4  `}
												dangerouslySetInnerHTML={{ __html: msg.text }}
											/>
											:
											<p className='bg-gray-300 mb-2 text-black max-w-96 p-2 px-6 rounded-4xl rounded-tr-md  '>
												{msg.text}
											</p>
									}
								</div>
							)
						})
						:
						<h2 className='text-center font-bold text-2xl border multicolor-text '>
							Hello, {user.name || 'User'}
						</h2>
				}
				{isLoading && (<h2 className="text-2xl">Loading...</h2>)}
			</div >

			{/* Input Section */}
			<div className=' w-full  flex justify-center '>

				<form onSubmit={handleSubmit} className='w-full  flex justify-center  items-center gap-4'>
					<input
						type="text"
						name='userInput'
						id={newId}
						className='text-xl border-2 max-w-300 md:w-1/2 lg:w-1/2 p-2 rounded-lg'
						placeholder='Ask Gemini'
						onChange={(e) => setFormData({
							userInput: e.target.value
						})}
						value={formData.userInput}
					/>
					<button type='submit' className='text-2xl cursor-pointer'><IoSend /></button>
				</form>
			</div>

		</div >
	)
}

export default DisplayMessages













	// <div className='relative flex flex-col h-screen border'>
		// 	<div className='h-[80%] p-4 overflow-y-auto' >
		// 		{
		// 			messages.length > 0 ?
		// 				messages.map((msg) => {
		// 					return (
		// 						<div
		// 							className={` flex items-center text-xl  ${msg.isGeminiResponse ? '' : 'justify-end rounded-4xl'}`}
		// 							key={msg._id}
		// 						>
		// 							{
		// 								msg.isGeminiResponse ? (
		// 									<div className="mr-2 flex justify-center items-center bg-gradient-to-r from-pink-500 to-violet-500 p-1 rounded-full ">
		// 										<RiGeminiLine className=" text-2xl " />
		// 									</div>
		// 								)
		// 									: null
		// 							}
		// 							{
		// 								msg.isGeminiResponse ?
		// 									<div
		// 										key={msg._id}
		// 										className={`mb-2 text-xl `}
		// 										dangerouslySetInnerHTML={{ __html: msg.text }}
		// 									/>
		// 									:
		// 									<p className='bg-gray-300 mb-2 text-black max-w-96 p-2 px-6 rounded-4xl rounded-tr-md rounded-bl-md '>
		// 										{msg.text}
		// 									</p>
		// 							}
		// 						</div>
		// 					)
		// 				})
		// 				:
		// 				<h2 className='text-center font-bold text-2xl border multicolor-text '>
		// 					Hello, {user.name || 'User'}
		// 				</h2>
		// 		}
		// 		{isLoading && (<h2 className="text-2xl">Loading...</h2>)}
		// 	</div >

		// 	{/* Input Section */}
		// 	<div className='h-[20%] border border-green-600 flex justify-center items-start'>

		// 		<form onSubmit={handleSubmit} className='h-full flex justify-center items-center gap-3'>
		// 			<input
		// 				type="text"
		// 				name='userInput'
		// 				id={newId}
		// 				className='text-xl border w-full p-2 rounded-lg min-w-200'
		// 				placeholder='Ask Gemini'
		// 				onChange={(e) => setFormData({
		// 					userInput: e.target.value
		// 				})}
		// 				value={formData.userInput}
		// 			/>
		// 			<button type='submit' className='text-2xl cursor-pointer'><IoSend /></button>
		// 		</form>
		// 	</div>

		// </div >