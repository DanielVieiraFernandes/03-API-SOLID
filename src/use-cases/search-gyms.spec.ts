import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

// Unit Testing


let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;


describe('Fetch User Check-in history use case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to search gyms', async () => {

        await gymsRepository.create({
            title: 'Javascript Gym',
            latitude: -22.8966877,
            longitude: -47.1654605,
            description: null,
            phone: null,
        });
        await gymsRepository.create({
            title: 'Typescript Gym',
            latitude: -22.8966877,
            longitude: -47.1654605,
            description: null,
            phone: null,
        });


        const { gyms } = await sut.execute({
           query: 'Javascript',
           page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Javascript Gym'}),
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {

       for(let i = 1; i <= 22; i++){
        await gymsRepository.create({
            title: `Javascript Gym ${i}`,
            latitude: -22.8966877,
            longitude: -47.1654605,
            description: null,
            phone: null,
        });
      
       }
       
      const { gyms } = await sut.execute({
           query: 'Javascript',
           page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Javascript Gym 21'}),
            expect.objectContaining({ title: 'Javascript Gym 22'}),
        ])
    })

});