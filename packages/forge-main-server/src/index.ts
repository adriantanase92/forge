import path from 'node:path';
import { MongoClient } from 'mongodb';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { Db } from './models';
import { createCollections } from './utils';
import dotenv from 'dotenv';
import permissionRoutes from './routes/permission';
import roleRoutes from './routes/role';
import userRoutes from './routes/user';
import taskRoutes from './routes/task';
import projectRoutes from './routes/project';
import jwt from '@fastify/jwt';
import authRoutes from './routes/auth';

// --------- dotenv ------------
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

//  --------- Environment variables ------------
const JWT_SECRET = process.env.JWT_SECRET as string;
const jwtSecretEncoded = Buffer.from(JWT_SECRET).toString('base64');
const PORT = process.env.PORT_MAIN_SERVER;
const DATABASE_URL =
    process.env.NODE_ENV === 'development'
        ? process.env.LOCAL_DATABASE_URL
        : process.env.DOCKER_DATABASE_URL;

// --------- fastify ------------
const fastify = Fastify({ bodyLimit: 1 * 1024 * 1024, logger: true });

// ----------- mongodb -------------
const dbClient = new MongoClient(DATABASE_URL!);
const db: Db = {
    roles: dbClient.db().collection('roles'),
    permissions: dbClient.db().collection('permissions'),
    users: dbClient.db().collection('users'),
    projects: dbClient.db().collection('projects'),
    tasks: dbClient.db().collection('tasks')
};

// ----------- boot ---------------
const boot = async () => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    await dbClient.connect();
    await createCollections(dbClient, db);

    await fastify.register(cors);
    await fastify.register(rateLimit, { max: 100, timeWindow: '1 minute' });
    fastify.register(helmet);
    fastify.register(jwt, { secret: jwtSecretEncoded });

    const globalRotuesPrefix = '/api';
    fastify.register(authRoutes, { prefix: globalRotuesPrefix, ...db });
    fastify.register(roleRoutes, { prefix: globalRotuesPrefix, ...db });
    fastify.register(permissionRoutes, { prefix: globalRotuesPrefix, ...db });
    fastify.register(userRoutes, { prefix: globalRotuesPrefix, ...db });
    fastify.register(projectRoutes, { prefix: globalRotuesPrefix, ...db });
    fastify.register(taskRoutes, { prefix: globalRotuesPrefix, ...db });

    fastify.listen({
        port: parseInt(PORT!, 10),
        host: process.env.NODE_ENV === 'development' ? '0.0.0.0' : '0.0.0.0'
    });

    console.log(
        `[FORGE-MAIN-SERVER] --> HTTP server listening on port: ${PORT} [env: ${process.env.NODE_ENV!.toUpperCase()}]`
    );
};

boot().catch((error) => {
    console.log(`[FORGE-MAIN-SERVER] --> !!! boot failed !!! [${error}]`);
    process.exit(1);
});
