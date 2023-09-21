import { LoginComponent } from "./LoginComponent";

export default async function Services() {
    return (
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative flex flex-col justify-center items-center max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Faça rapidamente o seu login</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Digite seu usuário e senha
                    </p>
                </div>

                <LoginComponent />
            </div>
        </div>
    )
}