<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { colors, Modules, type PermissionType } from '$lib/shared';
	import Button from '../../general/button/Button.svelte';
	import { page } from '$app/stores';

	export let permission: PermissionType;

	const dispatch = createEventDispatcher();
	const onClickAction = ({
		action,
		permission
	}: {
		action: 'edit' | 'delete';
		permission: PermissionType;
	}) => dispatch('clickActionTriggered', { action, permission });
</script>

{#if permission}
	<div
		class="bg-gallery rounded-xl group p-6 shadow-sm border border-rhino hover:border-cobalt border-solid flex justify-between items-center"
	>
		<div class="capitalize text-xl font-semibold group-hover:text-cobalt">
			{permission.name}
		</div>

		{#if $page.data.currentLoggedInUser.permissions[Modules.PERMISSIONS].write}
			<div class="flex gap-2">
				<Button
					class="p-2"
					kind="icon"
					color="rhino"
					icon="pencil"
					iconHeight="18"
					iconWidth="18"
					iconColor={colors.white}
					on:click={(e) => onClickAction({ action: 'edit', permission })}
				/>
				<Button
					class="p-2"
					kind="icon"
					color="error"
					icon="bin"
					iconHeight="18"
					iconWidth="18"
					iconColor={colors.white}
					on:click={(e) => onClickAction({ action: 'delete', permission })}
				/>
			</div>
		{/if}
	</div>
{/if}
