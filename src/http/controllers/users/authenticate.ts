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

        const { user } = await registerUseCase.execute({ email, password });

        const token = await res.jwtSign({
            role: user.role
        }, {
            sign: {
                sub: user.id,
            }
        })

        const refreshToken = await res.jwtSign({
            role: user.role
        }, {
            sign: {
                sub: user.id,
                expiresIn: '7d',
            }
        })

    return res.status(200).setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,

    })
    .send({
        token,
    });

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).send({
                message: error.message,
            });

        }

        throw error; // deixe que uma camâda acima trate esse erro
    }


}