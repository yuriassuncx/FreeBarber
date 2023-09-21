'use client';

import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies } from 'nookies';

import { useRouter } from 'next/navigation';

import { recoverUserInformation, signInRequest } from "../pages/api/auth";

type User = {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
    createdAt: Date;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}

type ChildrenProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: ChildrenProps) {
    const router = useRouter();

    const [authTokens, setAuthTokens] = useState(() => 
        typeof window !== "undefined" && window.localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens")!)
            : null
    );
    
    const [user, setUser] = useState<User | null>(null);
    
    const isAuthenticated = !!user;

    useEffect(() => {
        if (authTokens) {
          setUser(authTokens);
        }
      }, [authTokens]);
    
    async function signIn(email: string, password: string) {
        const response = await fetch(`http://localhost:3333/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            setUser(data);
            localStorage.setItem("authTokens", JSON.stringify(data));
            router.push('/services');
        } else {
            alert("Algo deu errado!");
        }
    }

    async function logoutUser() {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem("authTokens");
        router.push('/');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}