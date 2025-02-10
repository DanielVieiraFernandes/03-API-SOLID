import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositorie";

export function MakeFetchCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

    return useCase;
}