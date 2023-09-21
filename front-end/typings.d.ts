export type Barber = {
    id: string;
    name: string;
    description: string;
    email: string;
    photoUrl: string;
    bannerUrl: string;
    typesOfCut: string;
    createdAt: Date;
    _count: {
        Contributors: number;
    }
}

export type Contributor = {
    id: string;
    barberId: string;
    name: string;
    description: string;
    email: string;
    age: number;
    photoUrl: string;
    weekDays: string[];
    hourStart: string;
    hourEnd: string;
    isAvailable: boolean;
    createdAt: Date;
    Schedules: Schedules[];
}

export type Schedules = {
    id: string;
    contributorId: string;
    clientName: string;
    description: string;
    weekDay: string;
    hour: number;
    status: string;
    createdAt: Date;
}

export type User = {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
    createdAt: Date;
    Schedules: Schedules[];
}
