'use client';

import { useAuth } from "../../hooks/useAuth";

export function UserInfo() {
    const { user } = useAuth();

    if (!user) {
        return <div className="p-3 z-20">Carregando...</div>
    }

    return (
        <div className="flex gap-3 items-start p-4 text-3xl z-10">
            <img
                src={user?.avatar_url}
                alt="Profile Image"
                className="w-[72px] sm:w-1/5 -mt-12 lg:-mt-20 hover:scale-105 duration-150 transition ease-in"
            />

            <div className="font-bold leading-10 tracking-wider">
                <h1 className="text-2xl">{user?.name}</h1>
                <p className="text-base">{user?.email} | Usuário</p>
            </div>
        </div>
    )
}