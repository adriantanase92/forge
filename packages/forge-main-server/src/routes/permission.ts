import { FastifyInstance } from 'fastify';
import type { Db, Permission, PermissionDocument } from '../models';
import {
    QueryString,
    RouteParams,
    createOne,
    deleteOne,
    formErrorObject,
    getAll,
    getOne,
    updateOne
} from '../utils';
import { authenticate } from '../middlewares';

async function permissionRoutes(app: FastifyInstance, db: Db) {
    app.get<{ Querystring: QueryString }>(
        '/permissions',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const query = request.query;
                const response = await getAll<PermissionDocument>({
                    db,
                    collection: db.permissions,
                    requestQuery: query
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_get_permissions',
                            error: response.error
                        })
                    );
                } else {
                    reply.code(200).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.get<{ Params: RouteParams; Querystring: QueryString }>(
        '/permissions/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const query = request.query;
                const { id } = request.params;
                const response = await getOne<PermissionDocument>({
                    db,
                    collection: db.permissions,
                    id,
                    requestQuery: query
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_get_permission',
                            error: response.error
                        })
                    );
                } else {
                    reply.code(200).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.post<{ Body: Permission }>(
        '/permissions',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const newPermission = request.body;
                const response = await createOne<PermissionDocument, Permission>({
                    collection: db.permissions,
                    newItemData: newPermission
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_create_permission',
                            error: response.error
                        })
                    );
                } else {
                    reply.code(201).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.patch<{ Params: RouteParams; Body: Partial<Permission> }>(
        '/permissions/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const { id } = request.params;
                const updatedPermission = request.body;
                const response = await updateOne<PermissionDocument>({
                    collection: db.permissions,
                    id,
                    dataToUpdate: updatedPermission
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_update_permission',
                            error: response.error
                        })
                    );
                } else {
                    reply.code(201).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.delete<{ Params: RouteParams }>(
        '/permissions/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const { id } = request.params;
                const response = await deleteOne<PermissionDocument>({
                    collection: db.permissions,
                    id
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_delete_permission',
                            error: response.error
                        })
                    );
                } else {
                    reply.code(200).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );
}

export default permissionRoutes;
