import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorie";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { CreateGymUseCase } from "../create-gym";

export function MakeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CreateGymUseCase(gymsRepository);

    return useCase;
}