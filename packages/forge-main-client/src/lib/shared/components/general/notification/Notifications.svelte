<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { notifications } from '$stores/notifications';
	import Notification from './Notification.svelte';
</script>

<div class="fixed top-10 right-10 z-50 flex flex-col gap-2">
	{#each $notifications as notification (notification.id)}
		<div animate:flip transition:fly={{ y: 30 }}>
			<Notification
				id={notification.id}
				type={notification.type}
				message={notification.message}
			/>
		</div>
	{/each}
</div>
