import { SchedulePost } from "./SchedulePost";
import { UserInfo } from "./UserInfo";

export default async function Schedules() {
    return (
        <div className="flex flex-col relative justify-center rounded-xl max-w-6xl mx-auto mt-24 mb-12 bg-transparent text-white">
            <div
                className="absolute -z-0 w-full h-full rounded-xl bg-gradient-to-r from-gray-500 via-gray-600 to-gray-900"
            />

            <UserInfo />

            <h1 className="flex justify-center text-2xl tracking-wide font-bold z-10 px-6 md:px-0 pt-12">Meus Agendamentos</h1>

            <div className="pb-6 px-6 z-10">
                <SchedulePost />
            </div>
        </div>
    )
}