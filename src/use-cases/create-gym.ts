import { Gym} from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymRegisterUseCase {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

// SOLID 

// D - Dependency Inversion Principle

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymRepository: GymsRepository) {

    }

    async execute({ description, latitude, longitude, phone, title }: CreateGymRegisterUseCase): Promise<CreateGymUseCaseResponse> {
        const gym = await this.gymRepository.create({ description, latitude, longitude, phone, title })

        return {
            gym
        }
    }
}
