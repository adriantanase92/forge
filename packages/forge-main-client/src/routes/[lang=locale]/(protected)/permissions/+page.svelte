<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import {
		Modules,
		capitalize,
		colors,
		deleteOne,
		getAll,
		type HadleDataParams,
		type HadleDataPagination,
		type PermissionType,
		type EditPermissionType,
		getErrorTranslationFromKey
	} from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Permission from '$lib/shared/components/modules/permissions/Permission.svelte';
	import type { ModalState } from '$lib/shared/components/general/modal/types.js';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';
	import AddEditPermissionModal from '$lib/shared/components/modules/permissions/AddEditPermissionModal.svelte';
	import { permissionSchema } from './schema.js';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import { invalidateAll } from '$app/navigation';
	import Pagination from '$lib/shared/components/general/pagination/Pagination.svelte';
	import Search from '$lib/shared/components/general/search/Search.svelte';
	import { notifications } from '$stores/notifications.js';
	import { page } from '$app/stores';

	export let data;

	$: permissions = data.permissions.items ?? [];
	$: totalItems = data.permissions.pagination.totalItems ?? 10;
	$: currentPage = data.permissions.pagination.page ?? 1;
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
			apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PERMISSIONS}`,
			requestQuery: {
				search: searchValue,
				page: pagination.page.toString(),
				...(pagination.limit ? { limit: pagination.limit.toString() } : {})
			},
			token: token as string
		});

		permissions =
			response.data.items && response.data.items.length > 0 ? response.data.items : [];
		totalItems = response.data.pagination.totalItems ?? 10;
		currentPage = response.data.pagination.page ?? 1;
	};

	// Setup for Form --------------------------------------------------------------------------
	const getFormDataFromPermissionData = (permissionData: PermissionType): EditPermissionType => {
		const { name, _id: id } = permissionData;
		return { name, id };
	};
	let dataForEditForm: EditPermissionType;

	// Setup for Modals ------------------------------------------------------------------------
	let openDeleteModal: boolean = false;
	let openAddEditModal: boolean = false;
	let modalState: ModalState = 'add';
	let permissionData: PermissionType | null = null;

	const handleAction = (
		event: CustomEvent<{ action: 'edit' | 'delete'; permission: PermissionType }>
	) => {
		const { action, permission } = event.detail;
		permissionData = structuredClone(permission);

		if (action === 'edit') {
			modalState = 'edit';
			dataForEditForm = getFormDataFromPermissionData(permissionData as PermissionType);
			openAddEditModal = true;
		} else {
			openDeleteModal = true;
		}
	};

	// Setup for Delete Action -----------------------------------------------------------------
	const deleteItem = async (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			const { _id: id, name } = permissionData as PermissionType;
			const response = await deleteOne({
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PERMISSIONS}`,
				id,
				token: token as string
			});
			if (response.data.messageKey === 'item_deleted_successfully') {
				notifications.success(
					$LL.notifications.somethingDeletedSuccessfully({
						something: `<span class="capitalize mr-2">${$LL.modules.permissions.entity.single()}</span> <span class="font-medium text-error mr-2">${name}</span>`
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
	<PageTitle text={capitalize($LL.modules.permissions.entity.multiple())} />

	<hr class="mt-4 mb-8" />

	<div class="flex justify-between items-center mb-6 gap-2">
		<Search on:searchBy={handleData} />

		{#if $page.data.currentLoggedInUser.permissions[Modules.PERMISSIONS].write}
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
					something: $LL.modules.permissions.entity.single()
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
			{#each permissions as permission}
				<Permission {permission} on:clickActionTriggered={handleAction} />
			{:else}
				<p>
					{$LL.errors.noSomethingFound({
						something: $LL.modules.permissions.entity.multiple()
					})}
				</p>
			{/each}
		</DynamicDataRenderer>

		{#if permissions.length > 0}
			<Pagination {totalItems} {currentPage} on:changePage={handleData} />
		{/if}
	</div>
</Box>

{#if $page.data.currentLoggedInUser.permissions[Modules.PERMISSIONS].write}
	{#if openAddEditModal}
		<AddEditPermissionModal
			{token}
			bind:open={openAddEditModal}
			{modalState}
			{dataForEditForm}
			schema={permissionSchema($LL)}
			entity={modalState === 'add'
				? $LL.modules.permissions.entity.single()
				: formatEntityForModal({
						modalType: 'edit',
						entity: $LL.modules.permissions.entity.single(),
						itemName: `${permissionData?.name}`
				  })}
		/>
	{/if}

	{#if openDeleteModal}
		<DeleteModal
			bind:open={openDeleteModal}
			entity={formatEntityForModal({
				modalType: 'delete',
				entity: $LL.modules.permissions.entity.single(),
				itemName: `${permissionData?.name}`
			})}
			on:clickConfirmBtnTriggered={deleteItem}
		/>
	{/if}
{/if}
