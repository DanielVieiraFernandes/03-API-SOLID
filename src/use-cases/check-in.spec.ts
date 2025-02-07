import { expect, test, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./checkIn";

// Unit Testing


let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;


describe('Check-in use case', () => {


    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(checkInsRepository);
    })

    it('should be able to check in', async () => {


        const { checkIn } = await sut.execute({
           gymId: 'gym-01',
           userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String));
    })

});