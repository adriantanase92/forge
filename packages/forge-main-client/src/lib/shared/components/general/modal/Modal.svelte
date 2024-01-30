<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { colors } from '$lib/shared/utils';
	import Button from '../button/Button.svelte';
	import type { size } from './types';
	import { getSizeBasedClasses } from './utils';

	// Set to `true` to open the modal
	export let open = false;
	// Specify the id of the modal
	export let id = crypto.randomUUID();
	// Set the size of the modal
	export let size: size = 'md';
	// Set the title of the modal
	export let title: string = $LL.components.modal.placeholders.title();
	// Set to `true` if modal should not close on outside click
	export let persistent: boolean = false;
	// Set the css classes for dialog element
	export let dialogClasses: string =
		'backdrop:bg-rhino/50 min-h-min max-h-[80vh] px-4 rounded-3xl overflow-hidden overflow-y-auto';
	// Set the css classes for the modal title wrapper
	export let modalTitleClasses: string = 'font-secondary font-bold text-3xl line-clamp-1';
	// Set the css classes for the modal container, this is the direct child of the dialog element
	export let modalContainerClasses: string = 'flex flex-col px-4 pb-4 pt-2';
	// Set the css classes for teh modal header
	export let modalHeaderClasses: string =
		'flex justify-between items-center py-4 shrink-0 max-h-[64px]';
	// Set the css classes for teh modal body
	export let modalBodyClasses: string = 'grow py-4 overflow-y-auto';
	// Set the css classes for teh modal footer
	export let modalFooterClasses: string =
		'flex justify-between items-center py-4 shrink-0 max-h-[76px]';
	// Set to `true` if you want to remove the footer from the modal
	export let noFooter: boolean = false;
	// Set to `true` if an icon is need besides the title
	export let hasTitleIcon: boolean = false;

	let modal: HTMLDialogElement;

	type Evt = KeyboardEvent | MouseEvent;
	const isKeyboardEvent = (event: Evt): event is KeyboardEvent => 'key' in event;
	const handleKeydown = (e: Evt) => {
		if (open === true && isKeyboardEvent(e) && e.key === 'Escape') open = false;
	};
	const clickOutside = (e: MouseEvent, persistent: boolean) => {
		if (persistent === false && e.target === modal) {
			const modalDimensions = modal.getBoundingClientRect();
			if (
				e.clientX < modalDimensions.left ||
				e.clientX > modalDimensions.right ||
				e.clientY < modalDimensions.top ||
				e.clientY > modalDimensions.bottom
			) {
				open = false;
			}
		}
	};

	$: if (modal && open) modal.showModal();
	$: if (modal && !open) modal.close();
	$: modalProps = {
		id,
		...$$restProps,
		class: [size && getSizeBasedClasses(size), dialogClasses, $$restProps.class]
			.filter(Boolean)
			.join(' ')
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	{...modalProps}
	bind:this={modal}
	on:keydown={(e) => handleKeydown(e)}
	on:click={(e) => clickOutside(e, persistent)}
>
	<div class={modalContainerClasses}>
		<div class={modalHeaderClasses}>
			<div class={modalTitleClasses}>
				{#if hasTitleIcon && $$slots.titleIcon}
					<slot name="titleIcon" />
				{/if}
				{@html title}
			</div>
			<Button
				icon="x"
				iconWidth="20"
				iconHeight="20"
				iconColor={colors.rhino}
				color="transparent"
				class="mr-[-12px] inline-block px-4 py-2 leading-none"
				on:click={() => (open = false)}
			/>
		</div>

		<div class={modalBodyClasses}>
			{#if $$slots.default}
				<slot />
			{:else}
				<p>{$LL.components.modal.placeholders.body()}</p>
			{/if}
		</div>

		{#if !noFooter}
			<div class={modalFooterClasses}>
				{#if $$slots.footer}
					<slot name="footer" />
				{:else}
					<Button class="px-4 py-2" kind="outline" on:click={() => (open = false)}
						>{$LL.buttonsOrLinks.cancel()}</Button
					>
					<Button class="px-4 py-2" on:click={() => (open = false)}
						>{$LL.buttonsOrLinks.confirm()}</Button
					>
				{/if}
			</div>
		{/if}
	</div>
</dialog>
