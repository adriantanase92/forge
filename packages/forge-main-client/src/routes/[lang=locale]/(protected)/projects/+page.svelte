<script lang="ts">
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import {
		getAll,
		Modules,
		type HadleDataPagination,
		type HadleDataParams,
		deleteOne,
		capitalize,
		colors,
		type ProjectType,
		type UserType,
		getErrorTranslationFromKey
	} from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import { invalidateAll } from '$app/navigation';
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import Search from '$lib/shared/components/general/search/Search.svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import Pagination from '$lib/shared/components/general/pagination/Pagination.svelte';
	import type { ModalState } from '$lib/shared/components/general/modal/types.js';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';
	import { projectSchema } from './schema.js';
	import Project from '$lib/shared/components/modules/projects/Project.svelte';
	import AddEditProjectModal from '$lib/shared/components/modules/projects/AddEditProjectModal.svelte';
	import { notifications } from '$stores/notifications.js';
	import { page } from '$app/stores';

	export let data;

	$: users =
		data.users.items.map((user: UserType) => ({
			role: user.role,
			id: user._id,
			name: `${user.firstName} ${user.lastName}`
		})) ?? [];
	$: projects = data.projects.items ?? [];
	$: totalItems = data.projects.pagination.totalItems ?? 10;
	$: currentPage = data.projects.pagination.page ?? 1;
	let pagination: HadleDataPagination;
	$: pagination = { page: currentPage };
	let searchValue: string = '';
	$: token = data.session?.sessionToken ?? '';

	// Setup display ---------------------------------------------------------------------------
	const handleData = async (event: CustomEvent<HadleDataParams>) => {
		if (event.detail.search !== undefined) {
			searchValue = event.detail.search;
		}

		if (event.detail.pagination) {
			pagination = structuredClone(event.detail.pagination);
		}

		const response = await getAll({
			fetch,
			apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
			requestQuery: {
				search: searchValue,
				page: pagination.page.toString(),
				...(pagination.limit ? { limit: pagination.limit.toString() } : {})
			},
			token: token as string
		});

		projects = response.data.items && response.data.items.length > 0 ? response.data.items : [];
		totalItems = response.data.pagination.totalItems ?? 10;
		currentPage = response.data.pagination.page ?? 1;
	};

	// Setup for Modals ------------------------------------------------------------------------
	let openDeleteModal: boolean = false;
	let openAddModal: boolean = false;
	let modalState: ModalState = 'add';
	let projectData: ProjectType | null = null;

	const handleAction = (
		event: CustomEvent<{ action: 'edit' | 'delete'; project: ProjectType }>
	) => {
		const { action, project } = event.detail;
		projectData = structuredClone(project);

		if (action === 'delete') {
			openDeleteModal = true;
		}
	};

	// Setup for Delete Action -----------------------------------------------------------------
	const deleteItem = async (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			const { _id: id, name } = projectData as ProjectType;
			const response = await deleteOne({
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
				id,
				token: token as string
			});
			if (response.data.messageKey === 'item_deleted_successfully') {
				notifications.success(
					$LL.notifications.somethingDeletedSuccessfully({
						something: `<span class="capitalize mr-2">${$LL.modules.projects.entity.single()}</span> <span class="font-medium text-error mr-2">${name}</span>`
					})
				);
				invalidateAll();
				openDeleteModal = false;
			}

			if ('error' in response && response.error?.error) {
				notifications.danger(getErrorTranslationFromKey($LL, response.error.errorKey));
				if (response.error.error) {
					console.error(`Error: ${response.error.error}`);
				}
			}
		}
	};
</script>

<Box>
	<PageTitle text={capitalize($LL.modules.projects.entity.multiple())} />

	<hr class="mt-4 mb-8" />

	<div class="flex justify-between items-center mb-6 gap-2">
		<Search on:searchBy={handleData} />

		{#if $page.data.currentLoggedInUser.permissions[Modules.PROJECTS].write}
			<Button
				class="py-2 px-4"
				kind="fill"
				color="cobalt"
				icon="plus"
				iconHeight="24"
				iconWidth="24"
				iconColor={colors.white}
				on:click={() => {
					openAddModal = true;
					modalState = 'add';
				}}
			>
				{$LL.buttonsOrLinks.addSomething({
					something: $LL.modules.projects.entity.single()
				})}
			</Button>
		{/if}
	</div>

	<div class="flex flex-col gap-6">
		<DynamicDataRenderer
			layout="grid"
			gap="gap-6"
			gridClasses="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
		>
			{#each projects as project}
				<Project {project} on:clickActionTriggered={handleAction} />
			{:else}
				<p>
					{$LL.errors.noSomethingFound({
						something: $LL.modules.projects.entity.multiple()
					})}
				</p>
			{/each}
		</DynamicDataRenderer>

		{#if projects.length > 0}
			<Pagination {totalItems} {currentPage} on:changePage={handleData} />
		{/if}
	</div>
</Box>

{#if $page.data.currentLoggedInUser.permissions[Modules.PROJECTS].write}
	{#if openAddModal}
		<AddEditProjectModal
			{token}
			bind:open={openAddModal}
			modalState="add"
			{users}
			schema={projectSchema($LL)}
			entity={$LL.modules.projects.entity.single()}
		/>
	{/if}

	{#if openDeleteModal}
		<DeleteModal
			bind:open={openDeleteModal}
			entity={formatEntityForModal({
				modalType: 'delete',
				entity: $LL.modules.projects.entity.single(),
				itemName: `${projectData?.name}`
			})}
			on:clickConfirmBtnTriggered={deleteItem}
		/>
	{/if}
{/if}
