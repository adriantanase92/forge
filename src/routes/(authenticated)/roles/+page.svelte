<script lang="ts">
	import { enhance } from "$app/forms";
	import { IconPencil, IconPlus, IconTrashXFilled } from "@tabler/icons-svelte";
	import Loader from "$common/components/Loader.svelte";
	import PermissionsList from "$features/roles/components/PermissionsList.svelte";
	import { api } from "$common/db/utils.js";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import ModalForm from "$common/components/Modal/ModalForm/ModalForm.svelte";
	import {
		actionModalForm,
		submitDeleteItem
	} from "$common/components/Modal/ModalForm/helpers.js";

	export let data;
	let permissions: any[] = [];

	$: ({ roles } = data);

	$: console.log("dat: ", data);

	onMount(async () => {
		permissions = await api({
			fetch,
			url: "/api/permissions",
			method: "GET",
			errorMessage: "Problem retrieving permissions from the database."
		});
	});

	const updatePermissionOptionsStatesBasedOnChoice = (options: any) => {
		let otherThingsToUpdate = {};

		if (options.permissionOption === "read" && !options.permissionOptionState) {
			otherThingsToUpdate = {
				["permissions.$.write"]: false
			};
		}

		if (options.permissionOption === "write" && options.permissionOptionState) {
			otherThingsToUpdate = {
				["permissions.$.read"]: true
			};
		}

		return {
			...otherThingsToUpdate,
			[`permissions.$.${options.permissionOption}`]:
				options.permissionOptionState
		};
	};

	const updatePermissionOptionForRole = async (event: any) => {
		const roleId = event.detail.roleId;
		const roleName = event.detail.roleName;
		const permissionName = event.detail.permissionName;
		const permissionOption = event.detail.permissionOption;
		const permissionOptionState = event.detail.state;

		const data = {
			filter: {
				"id": roleId,
				"permissions.name": permissionName
			},
			update: updatePermissionOptionsStatesBasedOnChoice({
				roleName,
				permissionName,
				permissionOption,
				permissionOptionState
			})
		};

		try {
			await api({
				fetch,
				url: "/api/roles",
				method: "PATCH",
				data,
				errorMessage: `Problem updating the option ${permissionOption} for permission ${permissionName} on role ${roleName}.`
			});

			invalidate("/api/roles");

			return;
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div>
	<header class="mb-6 wf__page__header">
		<h2 class="h1 wf__page__title">Roles</h2>
		<button
			type="button"
			class="btn btn-sm variant-filled-primary"
			on:click={() =>
				actionModalForm({
					ref: ModalForm,
					props: {
						modalId: "addRoleModal",
						form: {
							id: "addRoleForm",
							action: "create",
							dataToAppend: [
								{
									name: "permissions",
									value: JSON.stringify(permissions)
								}
							],
							fields: [
								{
									id: "name",
									type: "text",
									placeholder: "Enter name...",
									labelText: "Name"
								}
							],
							messages: {
								success: "Role added successfully",
								error: "Role not added"
							}
						}
					},
					title: "Add New Role",
					buttonTextSubmit: "Create"
				})}
		>
			<span><IconPlus size={20} /></span>
			<span>Add</span>
		</button>
	</header>

	<div class="grid grid-column gap-8 wf__list">
		{#if !data}
			<Loader />
		{:else}
			{#each roles.items as role}
				<div class="wf__list__item p-4">
					<div class="wf__list__item__header mb-4">
						<h3 class="px-2 text-primary-500 wf__list__title">{role.name}</h3>
						<div class="wf__list__actions">
							<button
								type="button"
								class="btn variant-filled-primary mr-2"
								on:click={() =>
									actionModalForm({
										ref: ModalForm,
										props: {
											modalId: "updateRoleModal",
											form: {
												id: "updateRoleForm",
												action: "update",
												dataToAppend: [
													{
														name: "id",
														value: role.id
													}
												],
												fields: [
													{
														id: "name",
														type: "text",
														placeholder: "Enter name...",
														labelText: "Name",
														value: role.name
													}
												],
												messages: {
													success: "Role updated successfully.",
													error: "Role not updated."
												}
											}
										},
										title: "Update Role",
										buttonTextSubmit: "Update"
									})}
							>
								<span><IconPencil size={18} /></span>
								<span>Update Name</span>
							</button>
							<form
								method="POST"
								action="?/delete"
								use:enhance={submitDeleteItem}
							>
								<input type="hidden" name="item" hidden value="role" />
								<input type="hidden" name="id" hidden value={role.id} />
								<input type="hidden" name="name" hidden value={role.name} />
								<button type="submit" class="btn variant-filled-error">
									<span><IconTrashXFilled size={18} /></span>
									<span>Delete</span>
								</button>
							</form>
						</div>
					</div>
					<hr class="!border-t-4 mb-4" />
					<div class="wf__list__body">
						<h3 class="h3 mb-3 font-bold">Permissions List</h3>
						<PermissionsList
							{role}
							on:permissionOptionChanged={updatePermissionOptionForRole}
						/>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
