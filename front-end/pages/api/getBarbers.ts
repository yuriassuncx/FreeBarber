import type { NextApiRequest, NextApiResponse } from 'next';
import { Barber } from '../../typings';

type ErrorData = {
    body: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Barber[] | ErrorData>
) {
    if (req.method !== "GET") {
        res.status(405).json({ body: 'Method not allowed!' });
        return;
    }

    const response = await fetch('http://localhost:3333/barbers');
    const barbers: Barber[] = await response.json();

    res.status(200).json(barbers)
}