'use client';

import { useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../services/[barberId]/Input";

export function LoginComponent() {
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col pt-12 gap-4 w-full">
            <div className="flex flex-col gap-2">
                <label htmlFor="username">Email</label>
                <Input
                    id="username"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password">Senha</label>
                <Input
                    id="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                className="bg-indigo-600 py-2 px-4 rounded-md text-white opacity-90 hover:opacity-100 transition duration-150 ease-in disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!email || !password}
                onClick={() => signIn(email, password)}
            >
                Fazer login
            </button>
        </div>
    )
}