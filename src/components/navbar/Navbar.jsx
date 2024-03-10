import React from 'react';
import './navbar.css';

const Navbar = () => {
    return (
        <>


            <nav className="bg-white border-gray-200 dark:-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">

                        <img src="https://iili.io/JVyRVXj.png" className="h-8" alt="The All Inclusive Tool - AIT logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white" style={{ fontFamily: "Poppins" }}></span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default" >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:-800 md:dark:-900 dark:border-gray-700">

                            <li>
                                <a href="#" className="">About</a>
                            </li>
                            <li>
                                <a href="#" className="">Contributors</a>
                            </li>
                            <li>
                                <a href="#" className="">Projects</a>
                            </li>
                            <li>
                                <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/4140/4140061.png" alt="profile logo" width="40px" height="40px" className='' /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
