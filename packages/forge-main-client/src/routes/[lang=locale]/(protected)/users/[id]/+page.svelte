<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import LL from '$i18n/i18n-svelte';
	import {
		capitalize,
		Modules,
		colors,
		type UserPermissions,
		type PermissionOperation,
		getAddressString,
		getColorOptionsByUserRole,
		updateOne,
		type UserType,
		getErrorTranslationFromKey,
		type EditUserType,
		deleteOne
	} from '$lib/shared/index.js';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import ButtonToggle from '$lib/shared/components/general/button/ButtonToggle.svelte';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import { notifications } from '$stores/notifications.js';
	import { userSchema } from './schema.js';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';
	import EditUserModal from '$lib/shared/components/modules/users/EditUserModal.svelte';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;

	$: user = data.user;
	$: token = data.session?.sessionToken ?? '';
	$: userPermissions = user.permissions
		? Object.entries(user.permissions as UserPermissions)
		: [];

	const updatePermissions = ({
		permissions,
		id,
		value
	}: {
		permissions: UserPermissions;
		id: string;
		value: boolean;
	}): UserPermissions => {
		// Split the id into module and operation
		const [moduleName, operation] = id.split('-') as [Modules, PermissionOperation];

		function isModuleName(key: Modules, permissions: UserPermissions): key is Modules {
			return key in permissions;
		}

		function isPermissionOperation(key: PermissionOperation): key is PermissionOperation {
			return key === 'read' || key === 'write';
		}

		// Check if the module and operation are valid
		if (!isModuleName(moduleName, permissions) || !isPermissionOperation(operation)) {
			throw new Error('Invalid module or operation');
		}

		const updatedPermissions = {
			...permissions,
			[moduleName]: {
				...permissions[moduleName],
				[operation]: value
			}
		};

		// Scenario 1: If toggling read to false, and write is true, set write to false
		if (operation === 'read' && !value && updatedPermissions[moduleName].write) {
			updatedPermissions[moduleName].write = false;
		}

		// Scenario 2: If toggling write to true, and read is false, set read to true
		if (operation === 'write' && value && !updatedPermissions[moduleName].read) {
			updatedPermissions[moduleName].read = true;
		}

		return updatedPermissions;
	};

	const handleToggleChange = async (event: CustomEvent<{ toggled: boolean; id: string }>) => {
		const { toggled, id } = event.detail;
		const permissions = updatePermissions({
			permissions: user.permissions,
			id,
			value: toggled
		});

		user.permissions = structuredClone(permissions);

		const response = await updateOne<UserType>({
			apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
			id: user._id,
			data: { permissions },
			token
		});
		if (!response.error) {
			notifications.success(
				$LL.notifications.somethingEditedSuccessfully({
					something: `<span class="capitalize mr-2">${$LL.modules.users.entity.single()}</span>`
				})
			);
		} else {
			notifications.danger(getErrorTranslationFromKey($LL, response.error.errorKey));
			if (response.error.error) {
				console.error(`Error: ${response.error.error}`);
			}
		}
	};

	const getFormDataFromUserData = (userData: UserType) => {
		const { _id: id, ...rest } = userData;
		return { id, ...rest };
	};

	// Setup for Modal ------------------------------------------------------------------------
	let openEditUserModal: boolean = false;
	let openDeleteUserModal: boolean = false;

	const deleteUserItem = async (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			const response = await deleteOne({
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
				id: user._id,
				token: token as string
			});

			if (response.data.messageKey === 'item_deleted_successfully') {
				notifications.success(
					$LL.notifications.somethingDeletedSuccessfully({
						something: `<span class="capitalize mr-2">${$LL.modules.users.entity.single()}</span>`
					})
				);
				invalidateAll();
				openDeleteUserModal = false;
				goto(`/${Modules.USERS}`);
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

{#if user}
	<Box
		class="border-l-4 border-solid !p-0 flex flex-col sm:flex-row gap-6 sm:gap-0 divide-y-2 sm:divide-y-0 sm:divide-x-2 {getColorOptionsByUserRole(
			user.role
		).border} {getColorOptionsByUserRole(user.role).divider}"
	>
		<div class="w-full sm:w-1/2 p-6">
			<div class="text-body-md flex flex-col gap-6">
				<div class="flex justify-between items-center">
					<div>
						<h2 class="text-2xl font-secondary font-medium">
							{user.firstName}
							{user.lastName}
						</h2>
						<div
							class="capitalize text-sm {getColorOptionsByUserRole(user.role)
								.text} font-medium"
						>
							{user.role}
						</div>
					</div>

					{#if $page.data.currentLoggedInUser.permissions[Modules.USERS].write}
						<div>
							<Button
								class="p-2"
								kind="icon"
								color="cobalt"
								icon="pencil"
								iconHeight="18"
								iconWidth="18"
								iconColor={colors.white}
								on:click={() => (openEditUserModal = !openEditUserModal)}
							/>
							<Button
								class="p-2"
								kind="icon"
								color="error"
								icon="bin"
								iconHeight="18"
								iconWidth="18"
								iconColor={colors.white}
								on:click={(e) => (openDeleteUserModal = !openDeleteUserModal)}
							/>
						</div>
					{/if}
				</div>

				<div class="border border-rhino border-solid rounded-xl p-4 flex flex-col gap-4">
					<h3 class="capitalize text-xl font-medium font-secondary">
						{$LL.pages.users.user.generalInfo()}
					</h3>

					<div class="flex flex-col gap-1">
						{#if user.phone}
							<div>
								<strong class="capitalize">{$LL.fields.phone.text()}:</strong><span
									class="ml-2">{user.phone}</span
								>
							</div>
						{/if}
						<div>
							<strong class="capitalize">{$LL.fields.email.text()}:</strong>
							<span class="ml-2">{user.email}</span>
						</div>
						<div>
							<strong class="capitalize"
								>{$LL.fields.preferredLanguage.text()}:</strong
							>
							<span class="ml-2">{user.preferredLanguage}</span>
						</div>
						{#if user.address}
							<div>
								<strong class="capitalize">{$LL.fields.address.text()}:</strong>
								<span class="ml-2">{getAddressString(user.address)}</span>
							</div>
						{/if}
					</div>
				</div>

				{#if user.projects && user.projects.length > 0}
					<div class="border border-rhino border-solid rounded-xl p-4">
						<div class="flex flex-col gap-4">
							<h3 class="capitalize text-xl font-medium font-secondary">
								{$LL.modules.projects.entity.multiple()}
							</h3>
							<DynamicDataRenderer
								gridClasses="grid-cols-1 md:grid-cols-2 2xl:grid-cols-3"
							>
								{#each user.projects as project}
									<a
										target="_blank"
										href="/{Modules.PROJECTS}/{project._id}"
										title={project.name}
										class="flex items-center text-sm line-clamp-2 justify-center bg-cobalt hover:bg-curious text-white rounded-2xl py-2 px-4"
									>
										{project.name}
									</a>
								{/each}
							</DynamicDataRenderer>
						</div>
					</div>
				{/if}
			</div>
		</div>

		{#if user.permissions}
			<div class="w-full sm:w-1/2 flex flex-col gap-6 p-6">
				<h3 class="text-2xl font-secondary font-semibold">
					{capitalize($LL.modules.permissions.entity.multiple())}
				</h3>
				<div class="relative overflow-x-auto">
					<table class="w-full table-auto">
						<thead class="text-left text-sm text-gray-700 uppercase">
							<tr>
								<th>{$LL.fields.name.text()}</th>
								<th>{$LL.fields.read.text()}</th>
								<th>{$LL.fields.write.text()}</th>
							</tr>
						</thead>
						<tbody>
							{#each userPermissions as [permissionName, permissionOptions]}
								<tr class="border-t text-sm h-10">
									<td>
										<h4 class="font-secondary font-medium capitalize">
											{permissionName}
										</h4>
									</td>
									<td>
										<ButtonToggle
											id="{permissionName}-read"
											toggled={permissionOptions.read}
											on:change={handleToggleChange}
											disabled={!$page.data.currentLoggedInUser.permissions[
												Modules.USERS
											].write}
										/>
									</td>
									<td>
										<ButtonToggle
											id="{permissionName}-write"
											toggled={permissionOptions.write}
											on:change={handleToggleChange}
											disabled={!$page.data.currentLoggedInUser.permissions[
												Modules.USERS
											].write}
										/>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</Box>

	{#if $page.data.currentLoggedInUser.permissions[Modules.USERS].write}
		{#if openEditUserModal}
			<EditUserModal
				{token}
				bind:open={openEditUserModal}
				dataForEditForm={getFormDataFromUserData(user)}
				schema={userSchema($LL)}
				entity={formatEntityForModal({
					modalType: 'edit',
					entity: $LL.modules.tasks.entity.single(),
					itemName: `${user.firstName} ${user.lastName}`
				})}
			/>
		{/if}

		{#if openDeleteUserModal}
			<DeleteModal
				bind:open={openDeleteUserModal}
				entity={formatEntityForModal({
					modalType: 'delete',
					entity: $LL.modules.users.entity.single(),
					itemName: `${user.firstName} ${user.lastName}`
				})}
				on:clickConfirmBtnTriggered={deleteUserItem}
			/>
		{/if}
	{/if}
{/if}
