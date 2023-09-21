'use client';

import moment from 'moment';

import { useAuth } from '../../hooks/useAuth';
import { getUserById } from '../../hooks/get-user-by-id';
import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Schedules } from '../../typings';

export function SchedulePost() {
    const { user } = useAuth();
    const [schedules, setSchedules] = useState<Schedules[]>([]);
    const [loading, setLoading] = useState(false);

    async function getSchedulesByUserId() {
        const { Schedules } = await getUserById(user?.id);

        setSchedules(Schedules);
        setLoading(false);
    }

    useEffect(() => {
        if (user) {
            setLoading(true);
            getSchedulesByUserId();
        }
    }, [user])

    if (loading) {
      return (
        <div className='z-20'>
          <Skeleton />
        </div>
      )
    }

  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
      {schedules.map((schedule) => (
        <div key={schedule.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:scale-105 duration-150 transition ease-in">
          <div className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1634480256802-7cb50e5a196a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJhcmJlcnNob3B8ZW58MHx8MHx8&w=1000&q=80" alt="Imagem da barbearia" />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <div>
                <p className="text-xl font-semibold text-gray-900">{schedule.clientName}</p>
                <p className="mt-3 text-base text-gray-500">{schedule.description}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <span className="sr-only">{schedule.status}</span>
                <img className="h-10 w-10 rounded-full object-cover" src={user?.avatar_url} alt="Imagem do autor" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <div className="flex flex-1 gap-2">
                  <div className="text-sm text-gray-500">
                    <p>{schedule.status}</p>
                  </div>
                  <p className="flex space-x-1 text-sm text-gray-500">|</p>
                  <div className="text-sm text-gray-500">
                    <p>data de criação: {moment(schedule.createdAt).format('DD/MM/YYYY')}</p>
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