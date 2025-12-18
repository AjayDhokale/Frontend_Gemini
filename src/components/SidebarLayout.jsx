import React, { useState } from 'react'
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMessages } from '../features/messagesSlice'
import { deleteChat as deleteChatSlice, renameChats as renameChatsSlice } from '../features/chatSlice'

import { deleteChatAndMessagesinDB, renameChatinDB } from '../services/service';
import ProfileMenu from './ProfileMenu';


const SidebarLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const [hoveredId, setHoveredId] = useState(null)
    const [openMenuId, setOpenMenuId] = useState(null)

    const [renameChatId, setRenameChatId] = useState(null)
    const [renameText, setRenameText] = useState("")


    const [profileMenuOpen, setProfileMenuOpen] = useState(false);




    const dispatch = useDispatch()
    const chats = useSelector(state => state.chats.value)
    const user = useSelector(state => state.auth.user)



    const shortenText = (text, maxLength = 20) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };


    const startRename = (chat) => {
        setRenameChatId(chat._id)
        setRenameText(chat.name)
        setOpenMenuId(null)
    }

    const cancleRename = () => {
        setRenameChatId(null)
        setRenameText("")
    }

    const saveRename = async () => {

        if (!renameChatId || !renameText) return;
        const updatedChat = await renameChatinDB(renameChatId, renameText)

        if (!updatedChat) return;
        dispatch(renameChatsSlice(updatedChat))

        setRenameChatId(null);
        setRenameText('');

    }

    const deleteChatAndMessages = async (chat) => {
        const deleted = await deleteChatAndMessagesinDB(chat._id)

        dispatch(deleteChatSlice(deleted.chatId))
        setOpenMenuId(null)
    }

    const handleNewChat = () => {
        dispatch(setMessages([]));   // clear screen instantly
    };


    return (

        <div
            className={`flex flex-col bg-[#0f0f0f] border-r border-gray-800 transition-all duration-500 ease-in-out
                        ${isSidebarOpen ? 'w-[320px]' : 'w-[80px]'} h-screen relative z-50`}
        >
            {/* ───────── TOP FIXED AREA ───────── */}
            <div className="sticky top-0 z-50 bg-[#0f0f0f]">

                {/* Menu Toggle */}
                <div className="p-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-9 h-9 rounded-lg bg-[#1f1f1f] hover:bg-[#2a2a2a] flex items-center justify-center transition active:scale-95"
                    >
                        <MdMenu className="text-white text-xl" />
                    </button>
                </div>

                {/* New Chat Button */}
                {isSidebarOpen && (
                    <div className="px-4 pb-3">
                        <Link to="/new-chat" onClick={handleNewChat}>
                            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium text-center cursor-pointer hover:opacity-90 transition"
                            >
                                + New Chat
                            </div>
                        </Link>
                    </div>
                )}

                <hr className="border-gray-800" />
            </div>

            {/* ───────── SCROLLABLE CHAT LIST ───────── */}

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                {isSidebarOpen && chats.map(chat => (
                    <Link key={chat._id} to={`${chat._id}`}>

                        <div
                            className="group relative  flex items-center justify-between rounded-xl px-3 py-2 mb-1 hover:bg-[#1f1f1f] transition cursor-pointer"
                            key={chat._id}
                            onMouseEnter={() => {
                                if (!openMenuId || !renameChatId) {
                                    setHoveredId(chat._id)
                                }
                            }}
                            onMouseLeave={() => {
                                if (!openMenuId || !renameChatId) {
                                    setHoveredId(null)
                                    setOpenMenuId(null)
                                }
                            }}
                        >

                            {/* Chat Name / Rename */}
                            {chat._id === renameChatId ? (
                                <div className="w-full space-y-2">
                                    <input
                                        value={renameText}
                                        onChange={e => setRenameText(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:outline-none focus:border-violet-500"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={saveRename}
                                            className="flex-1 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 transition"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancleRename}
                                            className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1">
                                    <p className="text-sm text-gray-200 truncate">
                                        {shortenText(chat.name)}
                                    </p>
                                </div>
                            )}

                            {/* 3-dot Menu */}
                            {hoveredId === chat._id && !openMenuId && !renameChatId && (
                                <button
                                    onClick={() => {
                                        setOpenMenuId(openMenuId === chat._id ? null : chat._id);
                                    }
                                    }
                                    className="ml-2 w-8 rounded-lg hover:bg-[#2a2a2a] text-gray-300 cursor-pointer"
                                >
                                    •••
                                </button>
                            )}

                            {/* Floating Menu */}
                            {openMenuId === chat._id && (
                                <div className="absolute right-0 top-9 w-40 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-xl overflow-hidden z-150">
                                    <button
                                        onClick={() => { startRename(chat); setHoveredId(null) }}
                                        className="w-full text-left px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                                    >
                                        Rename
                                    </button>
                                    <button
                                        onClick={() => { deleteChatAndMessages(chat); setHoveredId(null) }}
                                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-900 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>


            {/* ───────── BOTTOM FIXED PROFILE ───────── */}
            <div className="sticky  bottom-0 bg-[#0f0f0f] border-t border-gray-800 p-2"
                onMouseLeave={() => setProfileMenuOpen(false)}

            >

                {
                    isSidebarOpen ? <div>
                        <button
                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                            className="flex gap-2 w-full items-center hover:bg-[#1f1f1f] transition p-2 rounded-md"
                        >
                            <div className='w-8 h-8 cursor-pointer  rounded-full  bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold uppercase'>
                                {user?.name?.charAt(0) || "User"}
                            </div>
                            <div className='text-left text-sm'>
                                <p className='capitalize'>{user?.name || "User"}</p>
                                <p>{user?.email || "User"}</p>
                            </div>
                        </button>

                        {profileMenuOpen && (
                            <div className="absolute bottom-14 left-3 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-xl z-50">
                                <ProfileMenu />
                            </div>
                        )}
                    </div>

                        :
                        <div>
                            <div className='w-8 h-8 cursor-pointer  rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold uppercase'>
                                {user?.name?.charAt(0) || "User"}
                            </div>
                        </div>
                }
            </div>
        </div>


    )
}

export default SidebarLayout



