import type { notificationType } from '$lib/shared/components/general/notification/type';
import { derived, writable } from 'svelte/store';

export type Notification = {
	id: string;
	message: string;
	type: notificationType;
	timeout: number;
};

const TIMEOUT = 3500; // Default timeout

function createNotificationStore() {
	const MAX_ACTIVE_NOTIFICATIONS = 6;
	const _activeNotifications = writable<Notification[]>([]);
	const _queuedNotifications = writable<Notification[]>([]);

	const send = (message: string, type: notificationType = 'info', timeout: number = TIMEOUT) => {
		const newNotification = { id: id(), type, message, timeout };
		_queuedNotifications.update((queue) => [...queue, newNotification]);
		processQueue();
	};

	const remove = (id: string) => {
		_activeNotifications.update((notifications) =>
			notifications.filter((notification) => notification.id !== id)
		);
		processQueue(); // Try to add a new notification from the queue
	};

	const processQueue = () => {
		_queuedNotifications.update((queue) => {
			_activeNotifications.update((active) => {
				while (active.length < MAX_ACTIVE_NOTIFICATIONS && queue.length > 0) {
					const [next, ...rest] = queue;
					queue = rest;
					active.push(next);
					scheduleRemoval(next); // Auto remove after timeout
				}
				return active;
			});
			return queue;
		});
	};

	const scheduleRemoval = (notification: Notification) => {
		setTimeout(() => {
			remove(notification.id);
		}, notification.timeout);
	};

	// Combine active and queued notifications for subscription
	const notifications = derived(
		[_activeNotifications, _queuedNotifications],
		([$_activeNotifications]) => {
			return $_activeNotifications;
		}
	);

	const { subscribe } = notifications;

	return {
		subscribe,
		remove,
		send,
		danger: (msg: string, timeout?: number) => send(msg, 'error', timeout || TIMEOUT),
		warning: (msg: string, timeout?: number) => send(msg, 'warning', timeout || TIMEOUT),
		info: (msg: string, timeout?: number) => send(msg, 'info', timeout || TIMEOUT),
		success: (msg: string, timeout?: number) => send(msg, 'success', timeout || TIMEOUT)
	};
}

const id = () => '_' + Math.random().toString(36).slice(2, 11);

export const notifications = createNotificationStore();
