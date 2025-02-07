import { UsersRepository } from "@/repositories/users-repositorie";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {

        const user = await this.usersRepository.findById(userId);

        if(!user){
            throw new ResourceNotFoundError();
        }
       
        return {
            user,
        }

    }
}