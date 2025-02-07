import { expect, test, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

// Unit Testing


let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;


describe('Create Gym use case', () => {


    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymRepository);
    })

    it('should be able to register', async () => {


        const { gym } = await sut.execute({
            title: 'Javascript Gym',
            latitude: -22.8966877,
            longitude: -47.1654605,
            description: null,
            phone: null,
        })

        expect(gym.id).toEqual(expect.any(String));
    })

});