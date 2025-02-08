import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository.ts";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {

    public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)

        return checkIn;
    }

    async findManyByUserId(userId: string, page: number){
        return this.items.filter(item => item.user_id === userId).slice((page - 1) * 20, page * 20);
    }

    async findByUserIdOnDate(userId: string, date: Date){

        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkIn = this.items.find(item => {

            const checkInDate = dayjs(item.created_at);

            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

            return item.user_id === userId && isOnSameDate
        } )

        if(!checkIn){
            return null;
        }

        return checkIn;
    }

    async countByUserID(userId: string) {
        return this.items.filter(item => item.user_id === userId).length
    }

   
}