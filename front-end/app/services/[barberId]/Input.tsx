import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className="bg-zinc-900 text-white py-3 px-4 rounded text-sm placeholder:text-white"
        />
    )
}