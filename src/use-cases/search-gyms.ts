import { Gym} from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsRegisterUseCase {
    query: string;
    page: number;
}

// SOLID 

// D - Dependency Inversion Principle

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {
    constructor(private gymRepository: GymsRepository) {

    }

    async execute({ page,query}: SearchGymsRegisterUseCase): Promise<SearchGymsUseCaseResponse> {

       const gyms = await this.gymRepository.searchMany(query, page);

       return {
        gyms,
       }
    }
}
