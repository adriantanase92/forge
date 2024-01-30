/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'mongodb';
import { UserRole } from '../enums';
import { BCRYPT_SALT } from './constants';
import bcrypt from 'bcrypt';

export const createPermissionsObjectFromArray = (
    array: { name: string; read: boolean; write: boolean }[]
) => {
    interface ConvertedObject {
        [key: string]: {
            read: boolean;
            write: boolean;
        };
    }

    const object: ConvertedObject = {};

    array.forEach((item) => {
        if (item.name) {
            object[item.name] = {
                read: item.read,
                write: item.write
            };
        }
    });

    return object;
};

export const generateObjectIds = (count: number): ObjectId[] =>
    Array.from({ length: count }, (): ObjectId => new ObjectId());

export const escapeString = (str: string): string => {
    return (
        str
            .replace(/[&]/g, '&amp;')
            .replace(/[<]/g, '&lt;')
            .replace(/[>]/g, '&gt;')
            .replace(/["]/g, '&quot;')
            .replace(/[']/g, '&#039;')
            .replace(/[/]/g, '&#x2F;')
            .replace(/[\\]/g, '&#x5C;')
            .replace(/[-]/g, '&#x2D;')
            // eslint-disable-next-line no-useless-escape
            .replace(/[\`]/g, '&#96;')
    );
};

export const isValidObjectId = (id: string) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

export const convertToObjectId = (obj: any) => {
    for (const key in obj) {
        if (typeof obj[key] === 'string' && isValidObjectId(obj[key])) {
            obj[key] = new ObjectId(obj[key]);
        } else if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map((item: any) =>
                typeof item === 'string' && isValidObjectId(item) ? new ObjectId(item) : item
            );
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            convertToObjectId(obj[key]);
        }
    }
};

export const getRandomPastDate = (daysBack = 365) => {
    const today = new Date();
    const pastDate = new Date(today.getTime() - Math.random() * daysBack * 24 * 60 * 60 * 1000);
    return pastDate;
};

export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const groupTasksByProject = ({
    projects,
    tasks,
    numberOfProjectsToGenerate,
    numberOfTasksToGenerate
}: {
    projects: ObjectId[];
    tasks: ObjectId[];
    numberOfProjectsToGenerate: number;
    numberOfTasksToGenerate: number;
}) => {
    if (
        projects.length !== numberOfProjectsToGenerate ||
        tasks.length !== numberOfTasksToGenerate * numberOfProjectsToGenerate
    ) {
        throw new Error(
            `Invalid input: there must be ${numberOfProjectsToGenerate} projects and ${
                numberOfTasksToGenerate * numberOfProjectsToGenerate
            } tasks.`
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupedTasks: any = {};

    projects.forEach((project, index) => {
        const startIndex = index * numberOfProjectsToGenerate;
        const endIndex = startIndex + numberOfProjectsToGenerate;

        groupedTasks[project.toString()] = tasks.slice(startIndex, endIndex);
    });

    return groupedTasks;
};

export const getHashedPasswordForRole = async (
    role: UserRole,
    saltRounds = BCRYPT_SALT
): Promise<string> => {
    const basePasswords: { [key in UserRole]: string } = {
        [UserRole.ADMIN]: `${process.env.ADMIN_PASSWORD}`,
        [UserRole.MANAGER]: `${process.env.MANAGER_PASSWORD}`,
        [UserRole.WORKER]: `${process.env.WORKER_PASSWORD}`,
        [UserRole.CLIENT]: `${process.env.CLIENT_PASSWORD}`,
        [UserRole.OWNER]: `${process.env.OWNER_PASSWORD}`
    };

    const basePassword = basePasswords[role];

    if (!basePassword) {
        throw new Error(`No base password defined for role: ${role}`);
    }

    const hashedPassword = await bcrypt.hash(basePassword, saltRounds);

    return hashedPassword;
};
