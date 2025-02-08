import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { GetUserMetricsUseCase } from "./get-user-metrics";

// Unit Testing


let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;


describe('Get user Metrics use case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new GetUserMetricsUseCase(checkInsRepository);

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able get user check-ins count from metrics', async () => {

        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        });
        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        });


        const { checkInsCount } = await sut.execute({
           userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2)
    })

    
});