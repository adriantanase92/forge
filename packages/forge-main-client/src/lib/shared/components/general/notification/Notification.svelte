<script lang="ts">
	import { notifications } from '$stores/notifications';
	import Button from '../button/Button.svelte';
	import { SvgIcon } from '../svg';
	import type { notificationKind, notificationType } from './type';
	import { getIconBasedOnType, getCssClasses, getIconColor } from './utils';

	// Specify the id of button
	export let id: string = crypto.randomUUID();

	// Specify the kind of the notification
	export let kind: notificationKind = 'fill';

	// Specify the type of the notification
	export let type: notificationType = 'info';

	// Specify the type of the notification
	export let message: string = '';

	$: notificationProps = {
		id,
		class: [
			`relative flex items-center ${message.length > 0 ? 'pr-8 py-4 px-2' : 'p-2'}`,
			kind && type && getCssClasses(kind, type),
			$$restProps.class
		]
			.filter(Boolean)
			.join(' ')
	};
</script>

<div {...notificationProps}>
	<div class="mr-2">
		{#key type}
			<SvgIcon
				name={getIconBasedOnType(type)}
				width="30"
				height="30"
				color={getIconColor(type)}
			/>
		{/key}
	</div>

	{#if message.length > 0}
		{@html message}

		<div class="absolute top-1 right-1">
			<Button
				kind="icon"
				color="transparent"
				icon="x-circle"
				iconWidth="20"
				iconHeight="20"
				on:click={() => notifications.remove(id)}
			/>
		</div>
	{:else if $$slots.default}
		<slot />
	{/if}
</div>
