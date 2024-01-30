/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance } from 'fastify';
import type { Db, User, UserDocument } from '../models';
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
import { ObjectId } from 'mongodb';
import { UserRole } from '../enums';

async function userRoutes(app: FastifyInstance, db: Db) {
    app.get<{ Querystring: QueryString }>(
        '/users',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const query = request.query;
                const response = await getAll<UserDocument>({
                    db,
                    collection: db.users,
                    requestQuery: query
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_get_users',
                            error: response.error
                        })
                    );
                } else {
                    // Ensure response has the expected structure
                    if ('pagination' in response.data && 'items' in response.data) {
                        const pagination = response.data.pagination;
                        const items = response.data.items.map(
                            ({ password, ...rest }: User) => rest
                        );
                        reply.code(200).send({ data: { pagination, items } });
                    } else {
                        // Handle unexpected structure
                        reply
                            .code(500)
                            .send(formErrorObject({ errorKey: 'unexpected_response_structure' }));
                    }
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.get<{ Params: RouteParams; Querystring: QueryString }>(
        '/users/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const query = request.query;
                const { id } = request.params;
                const response = await getOne<UserDocument>({
                    db,
                    collection: db.users,
                    id,
                    requestQuery: query
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_get_user',
                            error: response.error
                        })
                    );
                } else {
                    // Ensure that the response is indeed a UserDocument
                    if (response.data && '_id' in response.data) {
                        const { password, ...rest } = response.data;
                        reply.code(200).send({ data: rest });
                    } else {
                        // Handle the case where response is not a UserDocument
                        reply.code(500).send(
                            formErrorObject({
                                errorKey: 'unexpected_response_structure'
                            })
                        );
                    }
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.post<{ Body: User }>(
        '/users',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const newUser = request.body;
                const response = await createOne<UserDocument, User>({
                    collection: db.users,
                    newItemData: newUser
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_create_user',
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

    app.patch<{ Params: RouteParams; Body: Partial<User> }>(
        '/users/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const { id } = request.params;
                const updatedUser = request.body;
                const response = await updateOne<UserDocument>({
                    collection: db.users,
                    id,
                    dataToUpdate: updatedUser
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_update_user',
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
        '/users/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const { id } = request.params;
                const userToDelete = await db.users.findOne({ _id: new ObjectId(id) });

                if (!userToDelete) {
                    return reply.code(404).send(formErrorObject({ errorKey: 'cannot_get_user' }));
                }

                const getProjectPropertyBasedOnUserRole = (role: UserRole) => {
                    switch (role) {
                        case UserRole.CLIENT:
                            return 'clients';
                        case UserRole.WORKER:
                            return 'workers';
                        default:
                            return '';
                    }
                };

                if (userToDelete.projects && userToDelete.projects.length > 0) {
                    if (userToDelete.role === UserRole.MANAGER) {
                        const ownerUser = await db.users.findOne({ role: UserRole.OWNER });

                        if (ownerUser) {
                            for (const projectId of userToDelete.projects) {
                                const projectFilter = { _id: new ObjectId(projectId) };
                                const projectUpdate = {
                                    $set: { manager: new ObjectId(ownerUser._id) }
                                };

                                const addOwnerToProjectResponse = await db.projects.updateOne(
                                    projectFilter,
                                    projectUpdate
                                );

                                if ('error' in addOwnerToProjectResponse) {
                                    return reply.code(500).send({
                                        errorKey: 'cannot_replace_manager_with_owner_on_project',
                                        error: addOwnerToProjectResponse.error
                                    });
                                }
                            }
                        }
                    } else {
                        if (userToDelete.role === UserRole.WORKER) {
                            for (const projectId of userToDelete.projects) {
                                const tasksToUpdate = await db.tasks
                                    .find({
                                        project: new ObjectId(projectId),
                                        responsible: new ObjectId(id)
                                    })
                                    .toArray();

                                if (tasksToUpdate && tasksToUpdate.length > 0) {
                                    const taskIdsToUpdate = tasksToUpdate.map(
                                        (task) => new ObjectId(task._id)
                                    );

                                    const taskUpdate = {
                                        $pull: { responsible: new ObjectId(id) }
                                    };

                                    const updateTasksResponse = await db.tasks.updateMany(
                                        { _id: { $in: taskIdsToUpdate } },
                                        taskUpdate
                                    );

                                    if ('error' in updateTasksResponse) {
                                        return reply.code(500).send({
                                            errorKey: 'cannot_remove_user_from_tasks',
                                            error: updateTasksResponse.error
                                        });
                                    }
                                }
                            }
                        }

                        const projectProperty = getProjectPropertyBasedOnUserRole(
                            userToDelete.role
                        );
                        if (projectProperty) {
                            for (const projectId of userToDelete.projects) {
                                const projectFilter = { _id: new ObjectId(projectId) };
                                const projectUpdate = {
                                    $pull: { [projectProperty]: new ObjectId(id) }
                                };

                                const deleteUserFromProjectResponse = await db.projects.updateOne(
                                    projectFilter,
                                    projectUpdate
                                );

                                if ('error' in deleteUserFromProjectResponse) {
                                    return reply.code(500).send({
                                        errorKey: 'cannot_remove_user_from_project',
                                        error: deleteUserFromProjectResponse.error
                                    });
                                }
                            }
                        }
                    }
                }

                const response = await deleteOne<UserDocument>({
                    collection: db.users,
                    id
                });

                if ('error' in response) {
                    reply.code(500).send({
                        errorKey: 'cannot_delete_user',
                        error: response.error
                    });
                } else {
                    reply.code(200).send({ data: response.data });
                }
            } catch (e) {
                console.error('Error:', e);
                reply.code(500).send({
                    errorKey: 'internal_server_error',
                    error: e
                });
            }
        }
    );
}

export default userRoutes;
