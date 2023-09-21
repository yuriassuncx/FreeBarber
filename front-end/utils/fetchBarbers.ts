import { Barber } from "../typings";

const fetcher = async () => {
    const res = await fetch("/api/getBarbers");
    const data = await res.json();

    const barbers: Barber[] = data;

    return barbers;
}

export default fetcher;