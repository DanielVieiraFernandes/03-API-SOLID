import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorie";
import { CheckInUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositorie";

export function MakeCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

    return useCase;
}