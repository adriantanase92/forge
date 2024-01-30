import { FastifyRequest, FastifyReply } from 'fastify';

// Extending FastifyRequest to include jwtVerify method
interface AuthenticatedRequest extends FastifyRequest {
    jwtVerify(): Promise<void>;
}

export const authenticate = async (request: AuthenticatedRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
};
