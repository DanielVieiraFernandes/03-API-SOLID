import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { MakeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(req.body);

    try {
        const registerUseCase = MakeAuthenticateUseCase();

        await registerUseCase.execute({ email, password });

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).send({
                message: error.message,
            });

        }

        throw error; // deixe que uma camâda acima trate esse erro
    }

    return res.status(200).send();

}