<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '../../general/button/Button.svelte';
	import { colors, formatDateTime, Modules, type ProjectType } from '$lib/shared';
	import { goto } from '$app/navigation';
	import LL from '$i18n/i18n-svelte';
	import ProfileImage from '../../general/profile-image/ProfileImage.svelte';
	import { page } from '$app/stores';

	export let project: ProjectType;

	const dispatch = createEventDispatcher();
	const onClickAction = ({
		action,
		project
	}: {
		action: 'edit' | 'delete';
		project: ProjectType;
	}) => dispatch('clickActionTriggered', { action, project });
</script>

{#if project}
	<div
		class="bg-gallery rounded-xl group p-4 shadow-sm border-2 border-solid border-transparent hover:border-cobalt flex flex-col gap-6"
	>
		<div class="flex justify-between items-center">
			<div>
				<h3 class="capitalize text-xl font-semibold group-hover:text-cobalt">
					{project.name}
				</h3>
				<span class="text-sm text-slate-400"
					>{formatDateTime(project.changeLog.createdAt).date}</span
				>
			</div>

			<div class="flex gap-2">
				<Button
					class="p-2"
					kind="icon"
					color="rhino"
					icon="eye-open"
					iconHeight="18"
					iconWidth="18"
					iconColor={colors.white}
					on:click={() => goto(`/${Modules.PROJECTS}/${project._id}`)}
				/>

				{#if $page.data.currentLoggedInUser.permissions[Modules.PROJECTS].write}
					<Button
						class="p-2"
						kind="icon"
						color="error"
						icon="bin"
						iconHeight="18"
						iconWidth="18"
						iconColor={colors.white}
						on:click={(e) => onClickAction({ action: 'delete', project })}
					/>
				{/if}
			</div>
		</div>

		{#if project.description}<div class="line-clamp-2">{project.description}</div>{/if}

		<div class="flex flex-col md:flex-row justify-between md:items-center">
			{#if project.manager}
				<div>
					<span class="text-sm capitalize"
						>{$LL.modules.users.types.manager.single()}:</span
					>

					<ProfileImage
						firstName={project.manager.firstName}
						lastName={project.manager.lastName}
					/>
				</div>
			{/if}
			{#if project.clients && project.clients.length > 0}
				<div>
					<span class="text-sm capitalize"
						>{$LL.modules.users.types.client.multiple()}:</span
					>
					{#each project.clients as client}
						<ProfileImage firstName={client.firstName} lastName={client.lastName} />
					{/each}
				</div>
			{/if}
			{#if project.workers && project.workers.length > 0}
				<div>
					<span class="text-sm capitalize"
						>{$LL.modules.users.types.worker.multiple()}:</span
					>
					{#each project.workers as worker}
						<ProfileImage firstName={worker.firstName} lastName={worker.lastName} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
