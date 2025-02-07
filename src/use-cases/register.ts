import { UsersRepository } from "@/repositories/users-repositorie";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { User } from "@prisma/client";

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

// SOLID 

// D - Dependency Inversion Principle

interface RegisterUseCaseResponse {
    user: User;
}

export class RegisterUseCase {
    constructor(private userRepository:UsersRepository){

    }

 async execute({ email, name, password }: RegisterRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
        throw new UserAlreadyExistsError();
    }


   const user = await this.userRepository.create({ email, name, password_hash });

   return {user};
}
}
