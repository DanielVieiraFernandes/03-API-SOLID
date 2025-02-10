import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositorie";
import { GetUserProfileUseCase } from "../get-user-profile";

export function MakeGetProfileUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const useCase = new GetUserProfileUseCase(prismaUsersRepository);

    return useCase;
}