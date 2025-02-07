import { expect, test, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

// Unit Testing


let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;


describe('Check-in use case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);


        await gymsRepository.create({
            id: 'gym-01',
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0,
        })

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
           gymId: 'gym-01',
           userId: 'user-01',
           userLatitude: 0,
           userLongitude: 0
        })

        console.log(checkIn);

        expect(checkIn.id).toEqual(expect.any(String));
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));


        await sut.execute({
           gymId: 'gym-01',
           userId: 'user-01',
           userLatitude: 0,
           userLongitude: 0
        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
           userLongitude: 0
         })).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to check in twice in but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));


    await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
          userLatitude: 0,
           userLongitude: 0
       })

       vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

       const {checkIn} = await sut.execute({
           gymId: 'gym-01',
           userId: 'user-01',
           userLatitude: 0,
           userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String));
   })

   it('should not be able to check in on distant gym', async () => {


    // -22.9900444,-47.386668

    gymsRepository.gyms.push({
        id: 'gym-01',
        title: 'Javascript Gym',
        description: '',
        phone: '',
        latitude: new Decimal(-22.9900444),
        longitude: new Decimal(-47.386668),
    })

   
    await expect(() => sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.8966877,
        userLongitude: -47.1654605
     })).rejects.toBeInstanceOf(Error);
})
    
});