import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-newSomon shadow">
            <div className="w-full mx-auto max-w-screen-xl h-20 p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm  sm:text-center ">© 2024 <NavLink href="#" className="hover:underline">OpenSchoolDays™</NavLink>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium   sm:mt-0">
                    <li>
                        <NavLink href="#" className="hover:underline me-4 md:me-6">About</NavLink>
                    </li>
                    <li>
                        <NavLink href="#" className="hover:underline me-4 md:me-6">Privacy Policy</NavLink>
                    </li>
                    <li>
                        <NavLink href="#" className="hover:underline me-4 md:me-6">Licensing</NavLink>
                    </li>
                    <li>
                        <NavLink href="#" className="hover:underline">Contact</NavLink>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer