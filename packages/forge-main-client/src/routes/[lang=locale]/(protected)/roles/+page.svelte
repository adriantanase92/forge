<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import {
		Modules,
		UserRole,
		capitalize,
		colors,
		deleteOne,
		getAll,
		type HadleDataParams,
		type HadleDataPagination,
		type EditRoleType,
		type RoleType,
		getErrorTranslationFromKey
	} from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Role from '$lib/shared/components/modules/roles/Role.svelte';
	import AddEditRoleModal from '$lib/shared/components/modules/roles/AddEditRoleModal.svelte';
	import type { ModalState } from '$lib/shared/components/general/modal/types.js';
	import { roleSchema } from './schema.js';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import { invalidateAll } from '$app/navigation';
	import Pagination from '$lib/shared/components/general/pagination/Pagination.svelte';
	import Search from '$lib/shared/components/general/search/Search.svelte';
	import { notifications } from '$stores/notifications.js';
	import { page } from '$app/stores';

	export let data;

	$: roles = data.roles.items ?? [];
	$: totalItems = data.roles.pagination.totalItems ?? 10;
	$: currentPage = data.roles.pagination.page ?? 1;
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
			apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.ROLES}`,
			requestQuery: {
				search: searchValue,
				page: pagination.page.toString(),
				...(pagination.limit ? { limit: pagination.limit.toString() } : {})
			},
			token: token as string
		});

		roles = response.data.items && response.data.items.length > 0 ? response.data.items : [];
		totalItems = response.data.pagination.totalItems ?? 10;
		currentPage = response.data.pagination.page ?? 1;
	};

	// Setup for Form --------------------------------------------------------------------------
	const getFormDataFromRoleData = (roleData: RoleType): EditRoleType => {
		const { name, _id: id } = roleData;
		return { name, id };
	};
	let dataForEditForm: EditRoleType;

	// Setup for Modals ------------------------------------------------------------------------
	let openDeleteModal: boolean = false;
	let openAddEditModal: boolean = false;
	let modalState: ModalState = 'add';
	let roleData: RoleType | null = null;

	const handleAction = (event: CustomEvent<{ action: 'edit' | 'delete'; role: RoleType }>) => {
		const { action, role } = event.detail;
		roleData = structuredClone(role);

		if (action === 'edit') {
			modalState = 'edit';
			dataForEditForm = getFormDataFromRoleData(roleData as RoleType);
			openAddEditModal = true;
		} else {
			openDeleteModal = true;
		}
	};

	// Setup for Delete Action -----------------------------------------------------------------
	const deleteItem = async (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			const { _id: id, name } = roleData as RoleType;
			const response = await deleteOne({
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.ROLES}`,
				id,
				token: token as string
			});
			if (response.data.messageKey === 'item_deleted_successfully') {
				notifications.success(
					$LL.notifications.somethingDeletedSuccessfully({
						something: `<span class="capitalize mr-2">${$LL.modules.roles.entity.single()}</span> <span class="font-medium text-error mr-2">${name}</span>`
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
	<PageTitle text={capitalize($LL.modules.roles.entity.multiple())} />

	<hr class="mt-4 mb-8" />

	<div class="flex justify-between items-center mb-6 gap-2">
		<Search on:searchBy={handleData} />

		{#if $page.data.currentLoggedInUser.permissions[Modules.ROLES].write}
			<Button
				class="py-2 px-4"
				kind="fill"
				color="cobalt"
				icon="plus"
				iconHeight="24"
				iconWidth="24"
				iconColor={colors.white}
				on:click={() => {
					openAddEditModal = true;
					modalState = 'add';
				}}
			>
				{$LL.buttonsOrLinks.addSomething({
					something: $LL.modules.roles.entity.single()
				})}
			</Button>
		{/if}
	</div>

	<div class="flex flex-col gap-6">
		<DynamicDataRenderer layout="list" gap="gap-6">
			{#each roles as role}
				<Role {role} on:clickActionTriggered={handleAction} />
			{:else}
				<p>
					{$LL.errors.noSomethingFound({
						something: $LL.modules.roles.entity.multiple()
					})}
				</p>
			{/each}
		</DynamicDataRenderer>

		{#if roles.length > 0}
			<Pagination {totalItems} {currentPage} on:changePage={handleData} />
		{/if}
	</div>
</Box>

{#if $page.data.currentLoggedInUser.permissions[Modules.ROLES].write}
	{#if openAddEditModal}
		<AddEditRoleModal
			{token}
			bind:open={openAddEditModal}
			{modalState}
			{dataForEditForm}
			schema={roleSchema($LL)}
			entity={modalState === 'add'
				? $LL.modules.roles.entity.single()
				: formatEntityForModal({
						modalType: 'edit',
						entity: $LL.modules.roles.entity.single(),
						itemName: `${roleData?.name}`
				  })}
		/>
	{/if}

	{#if openDeleteModal}
		<DeleteModal
			bind:open={openDeleteModal}
			entity={formatEntityForModal({
				modalType: 'delete',
				entity: $LL.modules.roles.entity.single(),
				itemName: `${roleData?.name}`
			})}
			on:clickConfirmBtnTriggered={deleteItem}
		/>
	{/if}
{/if}
