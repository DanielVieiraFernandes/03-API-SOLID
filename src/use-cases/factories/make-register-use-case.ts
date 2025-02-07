import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositorie";
import { RegisterUseCase } from "../register";

export function MakeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    return registerUseCase;
}