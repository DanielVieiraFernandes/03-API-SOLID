import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositorie";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function MakeValidateCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new ValidateCheckInUseCase(checkInsRepository);

    return useCase;
}