import { Contributor } from "../../../typings";

export async function getContributorsByBarberId(barberId: string) {
    const response = await fetch(`http://localhost:3333/barbers/${barberId}/contributors`);
    const contributors: Contributor[] = await response.json();

    return contributors;
}