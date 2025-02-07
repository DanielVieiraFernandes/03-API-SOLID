import { UsersRepository } from "@/repositories/users-repositorie";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn, User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository.ts";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({ userId,gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

       const checkIn = await this.checkInsRepository.create({
        gym_id: gymId,
        user_id: userId
       })

       return {
        checkIn,
       }

    }
}