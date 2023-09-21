'use client';

import { useState } from "react";
import { navLinks } from "../constants/data";
import { useAuth } from "../hooks/useAuth";

import logo from "../public/logo1.png";
import close from "../public/close.svg";
import menu from "../public/menu.svg";

import Image from "next/image";
import Link from "next/link";
import { ProfileDropdown } from "./ProfileDropdown";

export function Header() {
    const { user } = useAuth();
    const [isToggleMenuOpened, setIsToggleMenuOpened] = useState(false);

    return (
        <nav className="w-full flex py-6 justify-between items-center navbar">
            <Image
                src={logo}
                alt="Logo com o nome HooBank"
                width={84}
                height={52}
                className="cursor-pointer hover:scale-110 transition duration-150 object-fill"
            />

            <ul className="list-none hidden md:flex justify-center items-center flex-1">
                {navLinks.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? "mr-0" : "mr-10"} opacity-90 hover:opacity-100`}
                    >
                        <Link href={nav.id} key={nav.id}>
                            {nav.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {user ? (
                <ProfileDropdown />
            ) : (
                <button className="hidden cursor-pointer md:block text-sm px-5 py-3 rounded-md text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:scale-110 duration-150 transition-all">
                    <a href="/login">Logar</a>
                </button>
            )}

            <div className="flex md:hidden flex-1 justify-end items-center">
                <Image
                    src={isToggleMenuOpened ? close : menu}
                    alt="menu"
                    width={22}
                    height={22}
                    className="object-contain"
                    onClick={() => setIsToggleMenuOpened((prev) => !prev)}
                />

                <div
                    className={`${isToggleMenuOpened ? "flex" : "hidden"} p-6 bg-black absolute top-20 z-50 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                >
                    <ul className="list-none flex flex-col justify-end items-center flex-1">
                        {navLinks.map((nav, index) => (
                            <li
                                key={nav.id}
                                className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? "mr-0" : "mb-4"}`}
                            >
                                <Link href={nav.id} key={nav.id}>
                                    {nav.title}
                                </Link>
                            </li>
                        ))}

                        {user ? (
                            <div className="flex pt-6 font-medium text-xs text-white">
                                <div className="flex justify-start items-start gap-2">
                                    <img src={user?.avatar_url} alt="Foto do usuário" className="w-10 h-10 rounded-full" />

                                    <div className="flex flex-col gap-1">
                                        <h1>{user?.name}</h1>
                                        <p>{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button className="mt-2 px-5 py-3 rounded-md text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
                                <a href="/login">Logar</a>
                            </button>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}