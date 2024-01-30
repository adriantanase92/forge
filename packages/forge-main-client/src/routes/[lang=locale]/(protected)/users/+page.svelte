<script lang="ts">
	import Table from '$lib/shared/components/general/table/Table.svelte';
	import type {
		TableAction,
		TableItem,
		TableOnClickDispatcherEvent
	} from '$lib/shared/components/general/table/types.js';
	import LL from '$i18n/i18n-svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import Box from '$lib/shared/components/panel/Box.svelte';
	import {
		capitalize,
		colors,
		deleteOne,
		Modules,
		UserRole,
		type UserType,
		formatObjectFromTable,
		getAll,
		type HadleDataParams,
		type HadleDataPagination,
		getErrorTranslationFromKey
	} from '$lib/shared/index.js';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import { goto, invalidateAll } from '$app/navigation';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';
	import { notifications } from '$stores/notifications.js';

	export let data;

	$: token = data.session?.sessionToken ?? '';

	// Setup for Table ------------------------------------------------------------------------
	const noDataFoundMessage = $LL.errors.noSomethingFound({
		something: $LL.modules.users.entity.multiple()
	});

	const headers = [
		{ key: 'firstName', text: capitalize($LL.fields.firstName.text()) },
		{ key: 'lastName', text: capitalize($LL.fields.lastName.text()) },
		{ key: 'role', text: capitalize($LL.fields.role.text()) },
		{ key: 'email', text: capitalize($LL.fields.email.text()) },
		{ key: 'phone', text: capitalize($LL.fields.phone.text()) }
	];

	const actions: TableAction[] = [
		{
			type: 'button',
			btnActionName: 'view',
			icon: {
				name: 'eye-open',
				width: '24',
				height: '24',
				color: colors.white
			},
			buttonColor: 'rhino',
			class: 'rounded-lg p-1'
		},
		{
			type: 'button',
			btnActionName: 'delete',
			icon: {
				name: 'bin',
				width: '18',
				height: '18',
				color: colors.white
			},
			buttonColor: 'error',
			class: 'rounded-lg py-1 px-2'
		}
	];

	const getColorForUserRole = (role: UserRole) => {
		let color: string = 'text-eucalyptus';

		if (role === UserRole.ADMIN) {
			color = 'text-error';
		} else if (role === UserRole.CLIENT) {
			color = 'text-curious';
		} else if (role === UserRole.MANAGER) {
			color = 'text-warning';
		} else if (role === UserRole.WORKER) {
			color = 'text-rhino';
		}

		return color;
	};

	const formatItemsForTable = (unformattedTableItems: any[]): TableItem[] => {
		return unformattedTableItems.map((item) => {
			return {
				_id: {
					value: item._id
				},
				email: {
					value: item.email
				},
				role: {
					value: item.role,
					stylingClasses: `${getColorForUserRole(item.role)} font-secondary font-medium`
				},
				firstName: {
					value: item.firstName
				},
				lastName: {
					value: item.lastName
				},
				phone: {
					value: item.phone ?? '/'
				},
				...(item.role !== 'owner' && item.role !== 'admin'
					? {}
					: { actionsToHide: { value: 'delete' } })
			};
		});
	};

	$: items =
		data.users.items && data.users.items.length > 0
			? formatItemsForTable(data.users.items)
			: [];
	$: totalItems = data.users.pagination.totalItems ?? 10;
	$: currentPage = data.users.pagination.page ?? 1;

	let pagination: HadleDataPagination;
	$: pagination = { page: currentPage };

	let searchValue: string = '';

	const handleTableData = async (event: CustomEvent<HadleDataParams>) => {
		if (event.detail.search !== undefined) {
			searchValue = event.detail.search;
		}

		if (event.detail.pagination) {
			pagination = structuredClone(event.detail.pagination);
		}

		const response = await getAll({
			fetch,
			apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
			requestQuery: {
				search: searchValue,
				page: pagination.page.toString(),
				...(pagination.limit ? { limit: pagination.limit.toString() } : {})
			},
			token: token as string
		});

		items =
			response.data.items && response.data.items.length > 0
				? formatItemsForTable(response.data.items)
				: [];
		totalItems = response.data.pagination.totalItems ?? 10;
		currentPage = response.data.pagination.page ?? 1;
	};

	// Setup for Modals ------------------------------------------------------------------------
	let openDeleteModal: boolean = false;
	let userData: UserType | null = null;

	const handleAction = (event: CustomEvent<TableOnClickDispatcherEvent>) => {
		const { data, actionName } = event.detail;
		userData = formatObjectFromTable(structuredClone(data)) as UserType;

		if (actionName === 'view') {
			goto(`/${Modules.USERS}/${userData._id}`);
		}

		if (actionName === 'delete') {
			openDeleteModal = true;
		}
	};

	// Setup for Delete Action -----------------------------------------------------------------
	const deleteItem = async (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			const { _id: id, firstName, lastName } = userData as UserType;
			const response = await deleteOne({
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
				id,
				token: token as string
			});
			if (response.data.messageKey === 'item_deleted_successfully') {
				notifications.success(
					$LL.notifications.somethingDeletedSuccessfully({
						something: `<span class="capitalize mr-2">${$LL.modules.users.entity.single()}</span> <span class="font-medium text-error mr-2">${firstName} ${lastName}</span>`
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
	<Table
		{headers}
		{items}
		{actions}
		{noDataFoundMessage}
		striped
		withPagination
		withSearch
		{totalItems}
		{currentPage}
		on:clickAction={handleAction}
		on:searchBy={handleTableData}
		on:changePage={handleTableData}
	>
		<PageTitle slot="title" text={capitalize($LL.modules.users.entity.multiple())} />
		<div slot="actions"></div>
	</Table>
</Box>

{#if openDeleteModal}
	<DeleteModal
		bind:open={openDeleteModal}
		entity={formatEntityForModal({
			modalType: 'delete',
			entity: $LL.modules.users.entity.single(),
			itemName: `${userData?.firstName} ${userData?.lastName}`
		})}
		on:clickConfirmBtnTriggered={deleteItem}
	/>
{/if}
