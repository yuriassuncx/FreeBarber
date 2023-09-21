import express from 'express';
import cors from 'cors';

import { prisma } from './lib/prisma';

import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();

app.use(express.json());
app.use(cors());


app.post('/barbers', async (request, response) => {
    const body = request.body;

    const barber = await prisma.barber.create({
        data: {
            name: body.name,
            description: body.description,
            email: body.email,
            photoUrl: body.photoUrl,
            bannerUrl: body.bannerUrl,
            typesOfCut: body.typesOfCut,
        }
    })

    return response.status(201).json(barber);
})

app.get('/barbers', async (request, response) => {
    const barbers = await prisma.barber.findMany({
        include: {
            _count: {
                select: {
                    Contributors: true,
                }
            }
        }
    });

    return response.json(barbers);
})

app.get('/barber/:id', async (request, response) => {
    const barberId: string = request.params.id;

    const barber = await prisma.barber.findMany({
        where: {
            id: barberId
        },
        include: {
            _count: {
                select: {
                    Contributors: true,
                }
            }
        }
    })

    return response.json(barber);
})

app.post('/barbers/:id/contributors', async (request, response) => {
    const barberId: string = request.params.id;
    const body = request.body;

    const contributor = await prisma.contributor.create({
        data: {
            barberId,
            name: body.name,
            description: body.description,
            email: body.email,
            age: body.age,
            photoUrl: body.photoUrl,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            isAvailable: body.isAvailable
        }
    })

    return response.status(201).json(contributor);
})

app.get('/barbers/:id/contributors', async (request, response) => {
    const barberId: string = request.params.id;

    const barbers = await prisma.contributor.findMany({
        where: {
            barberId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            Schedules: true,
        }
    })
    
    return response.json(barbers.map(barber => {
        return {
            ...barber,
            weekDays: barber.weekDays.split(','),
            hourStart: convertMinutesToHourString(barber.hourStart),
            hourEnd: convertMinutesToHourString(barber.hourEnd),
        }
    }));
})

app.post('/contributors/:id/schedules/:userId', async (request, response) => {
    const contributorId: string = request.params.id;
    const usersId: string = request.params.userId;
    const body = request.body;

    const schedule = await prisma.schedules.create({
        data: {
            contributorId,
            usersId,
            clientName: body.clientName,
            description: body.description,
            weekDay: body.weekDay,
            status: body.status,
            hour: convertHourStringToMinutes(body.hour),
        },
    })

    return response.status(201).json(schedule);
})

app.get('/contributors/:id/schedules', async (request, response) => {
    const contributorId: string = request.params.id;

    const schedules = await prisma.schedules.findMany({
        where: {
            contributorId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return response.json(schedules.map(schedule => {
        return {
            ...schedule,
            hour: convertMinutesToHourString(schedule.hour),
        }
    }));
})

app.post('/users', async (request, response) => {
    const body = request.body;

    const user = await prisma.users.create({
        data: {
            email: body.email,
            password: body.password,
            name: body.name,
            avatar_url: body.avatar_url
        }
    })

    return response.status(201).json(user);
})

app.get('/users', async (request, response) => {
    const users = await prisma.users.findMany();

    return response.json(users);
})

app.get('/user/:id', async (request, response) => {
    const userId: string = request.params.id;

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        },
        include: {
            Schedules: true
        },
    })

    return response.json(user);
})

app.post('/users/login', async (request, response) => {
    const body = request.body;
    
    const user = await prisma.users.findUnique({
        where: {
            email: body.email,
        }
    })

    if (user == null) {
        return response.status(400).send('Não foi possível encontrar o usuário');
    }

    try {
        if (await body.password == user.password) {
            return response.json(user);
        } else {
            response.send('Senha incorreta!');
        }
    } catch(err) {
        response.status(500).send({ err });
    }
})

app.listen(3333);