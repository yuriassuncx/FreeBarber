import { getBarberById } from "../utils/get-barber-by-id";
import { getContributorsByBarberId } from "../utils/get-contributors-by-barber-id";

import { DialogComponent } from "./DialogComponent";

export default async function BarberDetailsPage({ 
    params 
}: {
    params: { barberId: string };
}) {
    const barber = await getBarberById(params.barberId);
    const contributors = await getContributorsByBarberId(params.barberId);

    return (
        <div className="relative pb-16 bg-slate-50 overflow-hidden">
            <img
                className="w-full h-96 object-cover"
                src={barber.bannerUrl} alt="Imagem de fundo da barbearia"
            />

            <div className="relative px-4 pt-16 sm:px-6 lg:px-8">
                <div className="text-lg max-w-prose mx-auto pb-12 md:pb-12">
                    <h1>
                        <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {barber.name}
                        </span>
                    </h1>
                </div>

                <div className="mt-6 prose prose-lg mx-auto">
                    {barber.description}
                </div>

                <div className="relative pt-16 max-w-7xl text-center mx-auto">
                    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                        <img src={barber.photoUrl} alt="Imagem de um corte" className="rounded-md" />
                        <img src={barber.photoUrl} alt="Imagem de um corte" className="rounded-md" />
                        <img src={barber.photoUrl} alt="Imagem de um corte" className="rounded-md" />
                    </div>

                    <div className="flex items-center justify-center gap-3 mt-16 cursor-pointer hover:scale-105 transition duration-150">
                        <span>
                            Rua Santo Agostinho, 59898-040
                        </span>
                    </div>

                    <DialogComponent contributors={contributors} />
                </div>
            </div>
        </div>
    )
}