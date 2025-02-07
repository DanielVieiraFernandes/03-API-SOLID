import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositorie";
import { AuthenticateUseCase } from "../authenticate";

export function MakeAuthenticateUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    return authenticateUseCase;
}