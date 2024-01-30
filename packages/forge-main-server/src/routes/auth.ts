import { FastifyInstance } from 'fastify';
import type { Db } from '../models';
import { formErrorObject } from '../utils';
import bcrypt from 'bcrypt';

// Debugging values
// 5 minutes: 5 * 60 * 1000
// 1 minute: 1 * 60 * 1000

const EXP_TIME_FOR_ACCESS_TOKEN = 60 * 60 * 1000;
const EXP_TIME_FOR_REFRESH_TOKEN = 90 * 60 * 1000;

const isTimeDifferenceGreaterThanSeconds = (
    timeDifferenceInSeconds: number,
    dateInMilliseconds: number
) => {
    const currentTime = Date.now();
    const timeDifferenceInMilliseconds = currentTime - dateInMilliseconds;

    return timeDifferenceInMilliseconds > timeDifferenceInSeconds;
};

async function authRoutes(app: FastifyInstance, db: Db) {
    app.post<{ Body: { email: string; password: string } }>('/login', async (request, reply) => {
        try {
            const { email, password } = request.body;

            // Fetch the user from the database
            const user = await db.users.findOne({ email });

            // Check if user exists and password is correct
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return reply.code(401).send(formErrorObject({ errorKey: 'invalid_combination' }));
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: userPassword, ...rest } = user;

            // Create a JWT token
            // The token is set to expire in 1 hour (3600 seconds)
            const accessToken = app.jwt.sign({
                currentUser: { ...rest },
                timeOfToken: Date.now(),
                tokenExpireTime: EXP_TIME_FOR_ACCESS_TOKEN
            });

            const refreshToken = app.jwt.sign({
                userId: rest._id.toString(),
                tokenExpireTime: EXP_TIME_FOR_REFRESH_TOKEN
            });

            reply.code(200).send({
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } catch (e) {
            reply.code(500).send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
        }
    });

    app.post<{ Body: { refreshToken: string; oldToken: string } }>(
        '/refresh-token',
        async (request, reply) => {
            try {
                const { refreshToken, oldToken } = request.body;

                // Verify the refresh token
                if (!refreshToken && !oldToken) {
                    return reply
                        .status(401)
                        .send(formErrorObject({ errorKey: 'tokens_are_missing' }));
                }

                // Check if the refresh token exists in the database (you should store refresh tokens securely)
                // if (!refreshTokens.includes(refreshToken)) {
                //     return reply.code(403).send(formErrorObject({ errorKey: 'invalid_refresh_token' }));
                // }

                // Verify and decode the refresh token
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const decodedRefreshToken: any = app.jwt.verify(refreshToken);
                const tokenExpirationTime = decodedRefreshToken.tokenExpireTime;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const decodedOldToken: any = app.jwt.verify(oldToken);
                const timeOfToken = decodedOldToken.timeOfToken;
                const currentUser = decodedOldToken.currentUser;

                // Check if the token is expired
                if (isTimeDifferenceGreaterThanSeconds(tokenExpirationTime, timeOfToken)) {
                    return reply
                        .code(401)
                        .send(formErrorObject({ errorKey: 'refresh_token_has_expired' }));
                }

                // If the refresh token is valid, generate a new access token and new refresh token
                const newAccessToken = app.jwt.sign({
                    currentUser,
                    timeOfToken: Date.now(),
                    tokenExpireTime: EXP_TIME_FOR_ACCESS_TOKEN
                });

                const newRefreshToken = app.jwt.sign({
                    userId: currentUser._id.toString(),
                    tokenExpireTime: EXP_TIME_FOR_REFRESH_TOKEN
                });

                reply.code(200).send({
                    data: {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken
                    }
                });
            } catch (e) {
                console.error('Error refreshing token:', e);
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );
}

export default authRoutes;
