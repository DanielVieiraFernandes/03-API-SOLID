import { CheckIn} from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository.ts";


interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number,
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

    return {
        checkIns
    }

  }
}
