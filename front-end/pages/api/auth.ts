import { v4 as uuid } from 'uuid';

type SignInRequestData = {
    email: string;
    password: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount));

export async function signInRequest({ email, password }: SignInRequestData) {
    return {
        token: uuid(),
        user: {
            name: 'Yuri Assunção',
            email: 'yuri@gmail.com',
            avatar_url: 'https://github.com/yuriassuncx.png'
        }
    }
}

export async function recoverUserInformation() {
    await delay();

    return {
        user: {
            name: 'Yuri Assunção',
            email: 'yuri@gmail.com',
            avatar_url: 'https://github.com/yuriassuncx.png'
        }
    }
}