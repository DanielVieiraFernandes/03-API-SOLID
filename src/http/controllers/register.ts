import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositorie";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { MakeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
export async function register(req: FastifyRequest, res: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, name, password } = registerBodySchema.parse(req.body);

    try {
        
        const registerUseCase = MakeRegisterUseCase();

        await registerUseCase.execute({ email, name, password });

    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).send({
                message: error.message,
            });

        }

        throw error; // deixe que uma camâda acima trate esse erro
    }

    return res.status(201).send();

}