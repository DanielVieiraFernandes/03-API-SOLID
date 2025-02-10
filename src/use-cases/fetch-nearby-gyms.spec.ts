import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

// Unit Testing


let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;


describe('Fetch Nearby Gyms use case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to fetch nearby gyms', async () => {

        // -23.889312,-46.1703036

        await gymsRepository.create({
            title: 'Near Gym',
            latitude: -22.8966877,
            longitude: -47.1654605,
            description: null,
            phone: null,
        });
        await gymsRepository.create({
            title: 'Far Gym',
            latitude: -23.889312,
            longitude: -46.1703036,
            description: null,
            phone: null,
        });


        const { gyms } = await sut.execute({
          userLatitude: -22.8966877,
          userLongitude: -47.1654605,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym'}),
        ])
    })

});