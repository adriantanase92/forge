<script lang="ts">
	import { colors, Modules, type RoleType } from '$lib/shared';
	import { createEventDispatcher } from 'svelte';
	import Button from '../../general/button/Button.svelte';
	import { page } from '$app/stores';

	export let role: RoleType;

	const dispatch = createEventDispatcher();
	const onClickAction = ({ action, role }: { action: 'edit' | 'delete'; role: RoleType }) =>
		dispatch('clickActionTriggered', { action, role });
</script>

{#if role}
	<div
		class="bg-gallery rounded-xl group p-6 shadow-sm border border-rhino hover:border-cobalt border-solid flex justify-between items-center"
	>
		<div class="capitalize text-xl font-semibold group-hover:text-cobalt">
			{role.name}
		</div>

		{#if $page.data.currentLoggedInUser.permissions[Modules.ROLES].write}
			<div class="flex gap-2">
				<Button
					class="p-2"
					kind="icon"
					color="rhino"
					icon="pencil"
					iconHeight="18"
					iconWidth="18"
					iconColor={colors.white}
					on:click={(e) => onClickAction({ action: 'edit', role })}
				/>
				<Button
					class="p-2"
					kind="icon"
					color="error"
					icon="bin"
					iconHeight="18"
					iconWidth="18"
					iconColor={colors.white}
					on:click={(e) => onClickAction({ action: 'delete', role })}
				/>
			</div>
		{/if}
	</div>
{/if}
