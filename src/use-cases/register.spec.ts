import { expect, test, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

// Unit Testing


let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;


describe('Register use case', () => {


    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    })

    it('should be able to register', async () => {


        const { user } = await sut.execute({
            email: 'JohnDoe@gmail.com',
            name: 'John Doe',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String));
    })


    it('should hash user password upon registration', async () => {

        const { user } = await sut.execute({
            email: 'JohnDoe@gmail.com',
            name: 'John Doe',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);

    })

    it('should not be able to register with same email twice', async () => {



        const email = 'johndoe@gmail.com';

        const { user } = await sut.execute({
            email,
            name: 'John Doe',
            password: '123456'
        })


        await expect(() => sut.execute({
            email,
            name: 'John Doe',
            password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);


    })
});