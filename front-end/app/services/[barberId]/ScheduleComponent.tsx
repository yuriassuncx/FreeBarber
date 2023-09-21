'use client';

import { useState } from "react";
import { Contributor } from "../../../typings";
import { Input } from "./Input";

import toast, { Toaster } from 'react-hot-toast';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CloudLightning } from "phosphor-react";

import { convertHourStringToMinutes } from "../../../utils/convert-hour-string-to-minutes";
import { useAuth } from "../../../hooks/useAuth";

interface ScheduleComponentProps {
    selectedBarber: Contributor | null;
    setIsActiveScheduleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ScheduleComponent({ selectedBarber, setIsActiveScheduleModal }: ScheduleComponentProps) {
    const { user } = useAuth();
    const [weekDays, setWeekDays] = useState<string[] | undefined>(selectedBarber?.weekDays);
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
    const [hour, setHour] = useState("");
    const [description, setDescription] = useState("");

    function handleAddDay(day: string) {
        if (selectedWeekDays.includes(day)) {
            const removeItem = selectedWeekDays.filter((item) => item != day);

            setSelectedWeekDays(removeItem);
            return;
        }
        
        setSelectedWeekDays(prevList => [...prevList, day]);
    }

    async function handlePostSchedule() {
        if (selectedBarber?.Schedules.filter((item) => item.hour == convertHourStringToMinutes(hour) && item.weekDay == selectedWeekDays[0]).length != 0) {
            toast.error('Horário indisponível!', {
                position: "bottom-center",
            });

            return;
        }

        if(convertHourStringToMinutes(hour) < convertHourStringToMinutes(selectedBarber.hourStart) || convertHourStringToMinutes(hour) > convertHourStringToMinutes(selectedBarber.hourEnd)) {
            toast.error('Por favor, selecione um horário válido!', {
                position: "bottom-center",
            });

            return;
        }

        await fetch(`http://localhost:3333/contributors/${selectedBarber?.id}/schedules/${user?.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientName: user?.name,
                description: description,
                status: "ativo",
                weekDay: selectedWeekDays?.[0],
                hour: hour,
            })
        })
        .then(res => res.json())
        .finally(() => {
            toast.success('Corte Agendado!', {
                position: "bottom-center",
            });
        });
    }

    return (
        <>
        <Toaster />
        <form className="flex flex-col gap-4 mt-8">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Barbeiro Escolhido</label>
                    <Input
                        id="name"
                        value={selectedBarber?.name}
                        readOnly
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="days">Escolha um dia:</label>
                    <ToggleGroup.Root
                        id="days"
                        type="multiple"
                        className="flex flex-col gap-2"
                        value={weekDays}
                    >
                        <div className="grid grid-cols-2 gap-3">
                            {weekDays?.includes('0') && <ToggleGroup.Item value="0" onClick={() => handleAddDay('0')} className={`flex justify-center py-2 px-6 rounded ${selectedWeekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Domingo</ToggleGroup.Item>}
                            {weekDays?.includes('1') && <ToggleGroup.Item value="1" onClick={() => handleAddDay('1')} className={`flex justify-center py-2 px-6 rounded ${selectedWeekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Segunda</ToggleGroup.Item>}
                            {weekDays?.includes('2') && <ToggleGroup.Item value="2" onClick={() => handleAddDay('2')} className={`flex justify-center py-2 px-6 rounded ${selectedWeekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Terça</ToggleGroup.Item>}
                            {weekDays?.includes('3') && <ToggleGroup.Item value="3" onClick={() => handleAddDay('3')} className={`flex justify-center py-2 px-6 rounded ${selectedWeekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Quarta</ToggleGroup.Item>}
                            {weekDays?.includes('4') && <ToggleGroup.Item value="4" onClick={() => handleAddDay('4')} className={`flex justify-center py-2 px-6 rounded ${selectedWeekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Quinta</ToggleGroup.Item>}
                            {weekDays?.includes('5') && <ToggleGroup.Item value="5" onClick={() => handleAddDay('5')} className={`flex justify-center py-2 px-6 rounded ${selectedWeekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Sexta</ToggleGroup.Item>}
                            {weekDays?.includes('6') && <ToggleGroup.Item value="6" onClick={() => handleAddDay('6')} className={`flex justify-center py-2 px-6 rounded ${selectedWeekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Sábado</ToggleGroup.Item>}
                        </div>
                    </ToggleGroup.Root>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hour">Escolha um horário:</label>
                        <Input
                            id="hour"
                            type="time"
                            placeholder="De"
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                            min={selectedBarber?.hourStart}
                            max={selectedBarber?.hourEnd}
                        />
                </div>

                <footer className="flex mt-4 gap-4 justify-end">
                    <button
                        type="button"
                        className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                        onClick={() => setIsActiveScheduleModal(false)}
                    >
                        Voltar
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={!selectedBarber?.isAvailable}
                        onClick={() => handlePostSchedule()}
                    >
                        <CloudLightning size={24} />
                        Agendar corte
                    </button>
                </footer>
            </div>
        </form>
        </>
    )
}