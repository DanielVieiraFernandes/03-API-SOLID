import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number;
    userLongitude: number;
}

// SOLID 

// D - Dependency Inversion Principle

interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
    constructor(private gymRepository: GymsRepository) {

    }

    async execute({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {

        const gyms = await this.gymRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude });

        return {
            gyms,
        }
    }

}
