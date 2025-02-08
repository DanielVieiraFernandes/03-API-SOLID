
import { CheckIn, User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository.ts";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-off-check-ins-error";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(
    private CheckInsRepository: CheckInsRepository,
 
  ) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    
    const checkInsCount = await this.CheckInsRepository.countByUserID(userId);

    return {
        checkInsCount
    }

  }
}
