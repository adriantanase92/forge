<script lang="ts">
	import Modal from './Modal.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { ModalState, size } from './types';

	export let open = false;
	export let modalState: ModalState = 'add';
	export let entity: string = 'item';
	export let size: size = 'md';

	$: title =
		modalState === 'add'
			? $LL.buttonsOrLinks.addSomething({ something: entity })
			: $LL.buttonsOrLinks.editSomething({ something: entity });
</script>

<Modal noFooter {size} bind:open {title}>
	<slot />
</Modal>
