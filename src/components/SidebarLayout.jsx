import React, { useState } from 'react'
import { MdMenu } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setMessages } from '../features/messagesSlice'
import {
    deleteChat as deleteChatSlice,
    renameChats as renameChatsSlice
} from '../features/chatSlice'

import ProfileMenu from './ProfileMenu'
import { chatService } from '../services/chatService'

const SidebarLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [hoveredId, setHoveredId] = useState(null)
    const [openMenuId, setOpenMenuId] = useState(null)

    const [renameChatId, setRenameChatId] = useState(null)
    const [renameText, setRenameText] = useState("")

    const [profileMenuOpen, setProfileMenuOpen] = useState(false)

    const dispatch = useDispatch()
    const chats = useSelector(state => state.chats.value)
    const user = useSelector(state => state.auth.user)

    const shortenText = (text, maxLength = 20) => {
        if (!text) return ""
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
    }

    const startRename = (chat) => {
        setRenameChatId(chat._id)
        setRenameText(chat.name)
        setOpenMenuId(null)
    }

    const cancelRename = () => {
        setRenameChatId(null)
        setRenameText("")
    }

    const saveRename = async () => {
        if (!renameChatId || !renameText) return

        const updatedChat = await chatService.renameChatinDB(renameChatId, renameText)
        if (!updatedChat) return

        dispatch(renameChatsSlice(updatedChat))
        setRenameChatId(null)
        setRenameText("")
    }

    const deleteChatAndMessages = async (chat) => {
        const deleted = await chatService.deleteChatAndMessagesinDB(chat._id)
        dispatch(deleteChatSlice(deleted.chatId))
        setOpenMenuId(null)
    }

    const handleNewChat = () => {
        dispatch(setMessages([]))
    }

    return (
        <div
            className={`flex flex-col bg-[#0f0f0f] border-r border-gray-800
      transition-all duration-500
      ${isSidebarOpen ? 'w-[320px]' : 'w-[80px]'}
      h-screen relative z-50`}
        >

            {/* ───────── TOP AREA ───────── */}
            <div className="sticky top-0 z-50 bg-[#0f0f0f]">
                <div className="p-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-9 h-9 rounded-lg bg-[#1f1f1f]
            hover:bg-[#2a2a2a] flex items-center justify-center"
                    >
                        <MdMenu className="text-white text-xl" />
                    </button>
                </div>

                {isSidebarOpen && (
                    <div className="px-4 pb-3">
                        <Link to="/new-chat" onClick={handleNewChat}>
                            <div className="px-4 py-2 rounded-xl
              bg-gradient-to-r from-violet-600 to-purple-600
              text-white text-center">
                                + New Chat
                            </div>
                        </Link>
                    </div>
                )}

                <hr className="border-gray-800" />
            </div>

            {/* ───────── CHAT LIST ───────── */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                {isSidebarOpen && chats.map((chat, index) => {

                    const isLast = index >= chats.length - 2

                    return (
                        <Link key={chat._id} to={`${chat._id}`}>
                            <div
                                className="group relative flex items-center justify-between
                rounded-xl px-3 py-2 mb-1 hover:bg-[#1f1f1f]"
                                onMouseEnter={() => setHoveredId(chat._id)}
                                onMouseLeave={() => {
                                    setHoveredId(null)
                                    setOpenMenuId(null)
                                }}
                            >

                                {/* Chat name / Rename */}
                                {chat._id === renameChatId ? (
                                    <div className="w-full space-y-2">
                                        <input
                                            value={renameText}
                                            onChange={e => setRenameText(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg
                      bg-[#1a1a1a] border border-gray-700"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    saveRename()
                                                }}
                                                className="flex-1 py-1.5 rounded-lg bg-green-600"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    cancelRename()
                                                }}
                                                className="flex-1 py-1.5 rounded-lg bg-red-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-200 truncate">
                                        {shortenText(chat.name)}
                                    </p>
                                )}

                                {/* 3-dot menu */}
                                {hoveredId === chat._id && !renameChatId && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setOpenMenuId(chat._id)
                                        }}
                                        className="ml-2 w-8 rounded-lg hover:bg-[#2a2a2a]"
                                    >
                                        •••
                                    </button>
                                )}

                                {/* Floating Menu */}
                                {openMenuId === chat._id && (
                                    <div
                                        className={`absolute right-0 w-40 bg-[#1a1a1a]
                    border border-gray-700 rounded-xl shadow-xl z-50
                    ${isLast ? "bottom-9" : "top-9"}`}
                                    >
                                        <button
                                            onClick={() => startRename(chat)}
                                            className="w-full text-left px-4 py-2 hover:bg-[#2a2a2a]"
                                        >
                                            Rename
                                        </button>
                                        <button
                                            onClick={() => deleteChatAndMessages(chat)}
                                            className="w-full text-left px-4 py-2
                      text-red-400 hover:bg-red-900"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* ───────── BOTTOM PROFILE ───────── */}
            <div
                className="sticky bottom-0 bg-[#0f0f0f]
        border-t border-gray-800 p-2 z-10"
                onMouseLeave={() => setProfileMenuOpen(false)}
            >
                {isSidebarOpen ? (
                    <>
                        <button
                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                            className="flex gap-2 w-full items-center
              hover:bg-[#1f1f1f] p-2 rounded-md"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br
              from-blue-500 to-purple-600 flex items-center justify-center
              text-white font-bold uppercase">
                                {user?.name?.charAt(0) || "U"}
                            </div>
                            <div className="text-left text-sm">
                                <p className="capitalize">{user?.name || "User"}</p>
                                <p>{user?.email || "User"}</p>
                            </div>
                        </button>

                        {profileMenuOpen && (
                            <div className="absolute bottom-14 left-3
              bg-[#1a1a1a] border border-gray-700
              rounded-xl shadow-xl z-50">
                                <ProfileMenu />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br
          from-blue-500 to-purple-600 flex items-center justify-center
          text-white font-bold uppercase">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SidebarLayout

