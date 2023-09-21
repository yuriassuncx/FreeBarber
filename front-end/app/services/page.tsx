import { getBarbers } from "./utils/get-barbers";
import { BarberPost } from "./BarberPost";

export default async function Services() {
    const barbers = await getBarbers();
    
    return (
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Veja nossos serviços</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Acompanhe em tempo real
                    </p>
                </div>
                
                <BarberPost initialBarbers={barbers} />
            </div>
        </div>
    )
}