import { User, Prisma, Gym } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {

    public gyms: Gym[] = [];

    async findById(id: string) {

        const gym = this.gyms.find(gym => gym.id === id);

        if (!gym) {
            return null;
        }

        return gym;
    }
    async create(data:Prisma.GymCreateInput){
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(String(data.latitude)),
            longitude: new Prisma.Decimal(String(data.longitude)),
            created_at: new Date(),
        }

        this.gyms.push(gym);

        return gym;
    }

}