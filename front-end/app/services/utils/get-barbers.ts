import { Barber } from "../../../typings";

export async function getBarbers() {
    const response = await fetch('http://localhost:3333/barbers');
    const barbers: Barber[] = await response.json();

    return barbers || [];
}