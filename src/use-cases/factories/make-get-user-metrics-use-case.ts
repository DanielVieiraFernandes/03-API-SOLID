import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositorie";

export function MakeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new GetUserMetricsUseCase(checkInsRepository);

    return useCase;
}