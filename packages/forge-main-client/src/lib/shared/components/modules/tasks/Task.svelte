<script lang="ts">
	import {
		colors,
		colorOptionsPerColor,
		TaskStatus,
		type TaskType,
		Modules,
		UserRole
	} from '$lib/shared';
	import { createEventDispatcher } from 'svelte';
	import Button from '../../general/button/Button.svelte';
	import { page } from '$app/stores';
	import ProfileImage from '../../general/profile-image/ProfileImage.svelte';

	export let task: TaskType;
	export let workersData: { id: string; name: string; role: UserRole }[];

	const getResponsibleNames = (workersData: { id: string; name: string; role: UserRole }[]) => {
		if (task.responsible) {
			return workersData
				.filter((worker) => task.responsible?.includes(worker.id))
				.map((worker) => ({
					name: worker.name,
					firstName: worker.name.split(' ')[0],
					lastName: worker.name.split(' ')[1]
				}));
		} else {
			return [];
		}
	};

	const taskColorByStatus = (status: TaskStatus): string => {
		let colorClasses = '';
		if (status === TaskStatus.DONE) {
			colorClasses = `${colorOptionsPerColor.successAlt.backGround}`;
		} else if (status === TaskStatus.IN_PROGRESS) {
			colorClasses = `${colorOptionsPerColor.warningAlt.backGround}`;
		} else {
			colorClasses = `${colorOptionsPerColor.errorAlt.backGround}`;
		}

		return colorClasses;
	};

	const dispatch = createEventDispatcher();
	const onClickAction = ({ action, task }: { action: 'edit' | 'delete'; task: TaskType }) =>
		dispatch('clickActionTriggered', { action, task });
</script>

{#if task}
	<div
		class="py-2 px-4 rounded-xl flex justify-between items-center gap-8 {taskColorByStatus(
			task.status
		)}"
	>
		<div
			class="w-1/2 line-clamp-1 font-medium font-secondary {task.status === TaskStatus.DONE
				? 'line-through'
				: ''}"
			title={task.title}
		>
			{task.title}
		</div>
		<div class="w-1/2 flex items-center justify-between">
			<div class="w-1/2 font-bold uppercase">{task.status}</div>

			<div>
				{#if getResponsibleNames(workersData).length > 0}
					<div class="flex gap-2">
						{#each getResponsibleNames(workersData) as worker}
							<ProfileImage firstName={worker.firstName} lastName={worker.lastName} />
						{/each}
					</div>
				{/if}
			</div>

			{#if $page.data.currentLoggedInUser.permissions[Modules.TASKS].write}
				<div class="w-1/2 flex gap-2 justify-end items-center">
					<Button
						class="p-2"
						kind="icon"
						color="rhino"
						icon="pencil"
						iconHeight="18"
						iconWidth="18"
						iconColor={colors.white}
						on:click={() => onClickAction({ action: 'edit', task })}
					/>
					<Button
						class="p-2"
						kind="icon"
						color="error"
						icon="bin"
						iconHeight="18"
						iconWidth="18"
						iconColor={colors.white}
						on:click={() => onClickAction({ action: 'delete', task })}
					/>
				</div>
			{/if}
		</div>
	</div>
{/if}
