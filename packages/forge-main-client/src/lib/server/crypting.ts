import { randomBytes, createCipheriv, createDecipheriv, scryptSync } from 'crypto';
import { ENCYPTION_SECRET, ENCYPTION_SALT } from '$env/static/private';

const ALGORITHM = 'aes-256-gcm';
const KEY = scryptSync(ENCYPTION_SECRET, ENCYPTION_SALT, 32); // Use a long random string for both
const IV_LENGTH = 16; // For AES, this is always 16

export const encrypt = (text: string): string => {
	const iv = randomBytes(IV_LENGTH);
	const cipher = createCipheriv(ALGORITHM, KEY, iv);
	const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
	return (
		iv.toString('hex') +
		':' +
		encrypted.toString('hex') +
		':' +
		cipher.getAuthTag().toString('hex')
	);
};

export const decrypt = (text: string): string => {
	const textParts = text.split(':');
	const iv = textParts.shift()!;
	const authTag = textParts.pop()!;

	const encryptedText = Buffer.from(textParts.join(':'), 'hex');
	const decipher = createDecipheriv(ALGORITHM, KEY, Buffer.from(iv, 'hex'));

	decipher.setAuthTag(Buffer.from(authTag, 'hex'));

	return decipher.update(encryptedText) + decipher.final('utf8');
};
