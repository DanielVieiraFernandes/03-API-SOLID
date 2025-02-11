import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, res: FastifyReply) {

    await req.jwtVerify({ onlyCookie: true });

    const role = req.user.role;

    const token = await res.jwtSign({role}, {
        sign: {
            sub: req.user.sub,
        }
    })

    const refreshToken = await res.jwtSign({role}, {
        sign: {
            sub: req.user.sub,
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

}