import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorie";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function MakeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new FetchNearbyGymsUseCase(gymsRepository);

    return useCase;
}