import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getChatOfUser } from "../services/service";
import { setChats } from "../features/chatSlice";
import SidebarLayout from "./SidebarLayout";
import { isTokenExpired } from "../utils/isTokenExpired";


const MainLayout = () => {

	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		if (!token || isTokenExpired(token)) {
			dispatch(logOutUser());
			return;
		}
	

		const loadChats = async () => {
			const chats = await getChatOfUser();
			dispatch(setChats(Array.isArray(chats) ? chats : []));
		};

		loadChats();
	}, [token]);

	return (
		<div className="h-screen flex bg-[#111111] text-white">
			{/* Sidebar (left) */}
			<SidebarLayout />

			{/* Main content */}
			<div className="flex-1 flex flex-col min-w-0">
				<Navbar />
				{/* outlet area should fill remaining height */}
				<main className="flex-1 overflow-hidden">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MainLayout
