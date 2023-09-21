'use client';

import { ArrowRight } from 'phosphor-react';
import { Contributor } from '../../../typings';
import { Input } from './Input';

import * as Dialog from '@radix-ui/react-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { ScheduleComponent } from './ScheduleComponent';

type DialogComponentProps = {
    contributors: Contributor[];
}

export function DialogComponent({ contributors }: DialogComponentProps) {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [selectedBarber, setSelectedBarber] = useState<Contributor | null>(null);
    const [isActiveScheduleModal, setIsActiveScheduleModal] = useState(false);

    useEffect(() => {
        const barber = contributors.filter((item) => item.name.includes(name));

        setSelectedBarber(barber[0]);
    }, [name])

    return (
        <Dialog.Root>
            <Dialog.Trigger
                className="mt-4 px-8 py-2 bg-slate-800 hover:scale-110 duration-150 transition rounded-lg text-white disabled:opacity-80 disabled:cursor-not-allowed"
                disabled={!user}
            >
                Fazer agendamento
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-xl shadow-lg shadow-black/25">
                    <Dialog.Title className="text-3xl font-black">Faça um agendamento</Dialog.Title>

                    {isActiveScheduleModal ? (
                        <ScheduleComponent selectedBarber={selectedBarber} setIsActiveScheduleModal={setIsActiveScheduleModal} />
                    ) : (
                        <form className="flex flex-col gap-4 mt-8">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="barber" className="font-semibold">Qual o barbeiro?</label>
                                <select
                                    id="barber"
                                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                >
                                    {contributors.map((contributor) => {
                                        return <option key={contributor.id}>{contributor.name}</option>
                                    })}
                                </select>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6">
                                {selectedBarber?.isAvailable ? (
                                    <>
                                    <div className="flex flex-col gap-2">
                                    <label htmlFor="weekDays">Dias disponíveis na barbearia</label>

                                    <ToggleGroup.Root
                                        type="multiple"
                                        className="grid grid-cols-5 lg:grid-cols-4 gap-2"
                                        value={selectedBarber?.weekDays}
                                    >
                                        <ToggleGroup.Item
                                            value="0"
                                            title="Domingo"
                                            className={`w-8 h-8 rounded ${selectedBarber?.weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        >
                                            D
                                        </ToggleGroup.Item>

                                        <ToggleGroup.Item
                                            value="1"
                                            title="Segunda"
                                            className={`w-8 h-8 rounded ${selectedBarber?.weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        >
                                            S
                                        </ToggleGroup.Item>
                                        
                                        <ToggleGroup.Item
                                            value="2"
                                            title="Terça"
                                            className={`w-8 h-8 rounded ${selectedBarber?.weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        >
                                            T
                                        </ToggleGroup.Item>

                                        <ToggleGroup.Item
                                            value="3"
                                            title="Quarta"
                                            className={`w-8 h-8 rounded ${selectedBarber?.weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        >
                                            Q
                                        </ToggleGroup.Item>

                                        <ToggleGroup.Item
                                            value="4"
                                            title="Quinta"
                                            className={`w-8 h-8 rounded ${selectedBarber?.weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        >
                                            Q
                                        </ToggleGroup.Item>

                                        <ToggleGroup.Item
                                            value="5"
                                            title="Sexta"
                                            className={`w-8 h-8 rounded ${selectedBarber?.weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        >
                                            S
                                        </ToggleGroup.Item>

                                        <ToggleGroup.Item
                                            value="6"
                                            title="Sábado"
                                            className={`w-8 h-8 rounded ${selectedBarber?.weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        >
                                            S
                                        </ToggleGroup.Item>
                                    </ToggleGroup.Root>
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="hourStart">Horários disponíveis</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input id="hourStart" type="time" placeholder="De" readOnly value={selectedBarber?.hourStart} />
                                        <Input id="hourEnd" type="time" placeholder="Até" readOnly value={selectedBarber?.hourEnd} />
                                    </div>
                                </div>
                                </>
                                ) : (
                                    <div className="text-sm">Ops! O barbeiro está indisponível no momento... 😔</div>
                                )}
                            </div>

                            <footer className="flex mt-4 gap-4 justify-end">
                                <Dialog.Close
                                    type="button"
                                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                                >
                                    Cancelar
                                </Dialog.Close>

                                <button
                                    type="button"
                                    className="flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 disabled:opacity-60 disabled:cursor-not-allowed"
                                    disabled={!selectedBarber?.isAvailable}
                                    onClick={() => setIsActiveScheduleModal(true)}
                                >
                                    <ArrowRight size={24} />
                                    Prosseguir
                                </button>
                            </footer>
                        </form>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}