'use client';

import Link from "next/link";
import moment from 'moment';

import useSWR from 'swr';
import fetcher from "../../utils/fetchBarbers";
import { Barber } from "../../typings";

type BarberPostProps = {
  initialBarbers: Barber[];
}

export function BarberPost({ initialBarbers }: BarberPostProps) {
  const { data, error, mutate } = useSWR<Barber[]>("/api/getBarbers", fetcher);

  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {(data || initialBarbers)?.map((barber) => (
        <div key={barber.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src={barber.bannerUrl} alt="Imagem da barbearia" />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <Link href={`services/${barber.id}`}>
                <p className="text-xl font-semibold text-gray-900">{barber.name}</p>
                <p className="mt-3 text-base text-gray-500">{barber.description}</p>
              </Link>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <span className="sr-only">{barber.email}</span>
                <img className="h-10 w-10 rounded-full object-cover" src={barber.photoUrl} alt="Imagem do autor" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {barber.email}
                </p>
                <div className="flex flex-1 gap-2">
                  <div className="text-sm text-gray-500">
                    <p>{barber._count.Contributors} barbeiros</p>
                  </div>
                  <p className="flex space-x-1 text-sm text-gray-500">|</p>
                  <div className="text-sm text-gray-500">
                    <p>data de criação: {moment(barber.createdAt).format('DD/MM/YYYY')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}