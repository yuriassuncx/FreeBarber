import { User } from "../typings";

export async function getUserById(userId: string | undefined) {
    const response = await fetch(`http://localhost:3333/user/${userId}`);
    const user: User = await response.json();

    return user || {};
}