import { Barber } from "../../../typings";

export async function getBarberById(barberId: string) {
    const response = await fetch(`http://localhost:3333/barber/${barberId}`);
    const barbers: Barber[] = await response.json();

    const barber = barbers[0];

    return barber;
}