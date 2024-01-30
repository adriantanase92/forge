<script lang="ts">
	import Modal from './Modal.svelte';
	import LL from '$i18n/i18n-svelte';
	import Button from '../button/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let entity: string = 'item';

	const dispatch = createEventDispatcher();
	const onClickAction = ({ confirm }: { confirm: boolean }) =>
		dispatch('clickConfirmBtnTriggered', { confirm });
</script>

<Modal
	size="sm"
	modalTitleClasses="font-secondary font-bold text-xl"
	bind:open
	title={$LL.buttonsOrLinks.deleteSomething({ something: entity })}
>
	<p>{@html $LL.components.modal.deleteMessage({ entity })}</p>

	<svelte:fragment slot="footer">
		<Button color="rhino" class="px-4 py-2" kind="outline" on:click={() => (open = false)}
			>{$LL.buttonsOrLinks.cancel()}</Button
		>
		<Button color="error" class="px-4 py-2" on:click={(e) => onClickAction({ confirm: true })}
			>{$LL.buttonsOrLinks.confirm()}</Button
		>
	</svelte:fragment>
</Modal>
