import { User, Prisma, Gym } from "@prisma/client";
import { findManyNearbyParams, GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates";

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

    async searchMany(query: string, page: number){
        return this.gyms.filter(item => item.title.includes(query)).slice((page - 1) * 20 , page * 20);
    }

    async findManyNearby({ latitude, longitude }: findManyNearbyParams){
        return this.gyms.filter(gym => {
            const distance = getDistanceBetweenCoordinates({
                latitude,
                longitude,
            }, {latitude: Number(gym.latitude), longitude: Number(gym.longitude)})

            console.log(distance);

            return distance < 10;
        });
    };

}