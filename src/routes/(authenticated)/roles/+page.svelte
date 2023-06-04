<script lang="ts">
	import { enhance } from "$app/forms";
	import { actionModal, submitDeleteItem } from "$lib/utils/helpers.js";
	import { IconPencil, IconPlus, IconTrashXFilled } from "@tabler/icons-svelte";
	import AddRoleForm from "$components/specific/roles/AddRoleForm.svelte";
	import UpdateRoleForm from "$components/specific/roles/UpdateRoleForm.svelte";
	import Loader from "$components/general/Loader.svelte";
	import PermissionsList from "$components/specific/roles/PermissionsList.svelte";
	import { api } from "$db/utils.js";

	export let data;

	$: ({ roles, permissions } = data);

	const updatePermissionOptionForRole = (event: any) => {
		console.log("event.detail: ", event.detail);
		const roleId = event.detail.roleId;
		const roleName = event.detail.roleName;
		const permissionName = event.detail.permissionName;
		const permissionOption = event.detail.permissionOption;
		const permissionOptionState = event.detail.state;

		// aici creeaza o functie care sa faca logica urmatoare:
		// daca apasa pe "read" si e "true" -> nu se intampla nimic
		// daca apasa pe "read" si e "false" -> se pune si "write" pe "false"
		// daca apasa pe "write" si e "false" -> nu se intampla nimic
		// daca apasa pe "write" si e "true" -> se verifica si "read" sa fie pe "true"

		const data = {
			filter: {
				"id": roleId,
				"permissions.name": permissionName
			},
			update: {
				[`permissions.$.${permissionOption}`]: permissionOptionState
			}
		};

		try {
			return api({
				fetch,
				url: "/api/roles",
				method: "PATCH",
				data,
				errorMessage: `Problem updating the option ${permissionOption} for permission ${permissionName} on role ${roleName}.`
			});
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
				actionModal({
					ref: AddRoleForm,
					props: { permissions },
					title: "Add New Role"
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
			{#each roles as role}
				<div class="wf__list__item p-4">
					<div class="wf__list__item__header mb-4">
						<h3 class="px-2 text-primary-500 wf__list__title">{role.name}</h3>
						<div class="wf__list__actions">
							<button
								class="btn variant-filled-primary mr-2"
								on:click={() =>
									actionModal({
										ref: UpdateRoleForm,
										props: { role },
										title: "Update Role"
									})}
							>
								<span><IconPencil size={18} /></span>
								<span>Update Name</span>
							</button>
							<form method="POST" action="?/delete" use:enhance={submitDeleteItem}>
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
						<PermissionsList {role} on:permissionOptionChanged={updatePermissionOptionForRole} />
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
