import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from "react-icons/hi";

const ProfileMenu = () => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = () => {
        dispatch(logOutUser())
        navigate('/login')
    }

    return (
        <div
            className="w-64 rounded-2xl bg-[#121212] 
            border border-gray-700 shadow-2xl 
            text-gray-200 overflow-hidden"
        >

            {/* User Info */}
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-lg font-semibold capitalize truncate">
                    {user?.name || "User"}
                </h1>
                <p className="text-sm text-gray-400 truncate">
                    {user?.email}
                </p>
                {user?.city && (
                    <p className="text-sm text-gray-500 truncate">
                        {user.city}
                    </p>
                )}
            </div>

            {/* Menu Items */}
            <div className="p-2 space-y-1 text-sm">
                <button
                    className="w-full text-left px-3 py-2 rounded-lg
                    hover:bg-[#1f1f1f] transition"
                >
                    Settings & Privacy
                </button>

                <button
                    className="w-full text-left px-3 py-2 rounded-lg
                    hover:bg-[#1f1f1f] transition"
                >
                    Manage Subscription
                </button>
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-gray-700">
                <button
                    onClick={logOut}
                    className="w-full flex items-center gap-2
                    px-3 py-2 rounded-lg text-red-400
                    hover:bg-red-900/30 hover:text-red-300
                    transition"
                >
                    <HiOutlineLogout className="text-lg" />
                    <span>Logout</span>
                </button>
            </div>

        </div>
    )
}

export default ProfileMenu
