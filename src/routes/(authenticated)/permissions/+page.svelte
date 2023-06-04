<script lang="ts">
	import { enhance } from "$app/forms";
	import { IconPencil, IconPlus, IconTrashXFilled } from "@tabler/icons-svelte";
	import AddPermissionForm from "$components/specific/permissions/AddPermissionForm.svelte";
	import UpdatePermissionForm from "$components/specific/permissions/UpdatePermissionForm.svelte";
	import Loader from "$lib/components/general/Loader.svelte";
	import { actionModal, submitDeleteItem } from "$lib/utils/helpers.js";

	export let data;

	$: ({ permissions } = data);
</script>

<div>
	<header class="mb-6 wf__page__header">
		<h2 class="h1 wf__page__title">Permissions</h2>
		<button
			type="button"
			class="btn btn-sm variant-filled-primary"
			on:click={() =>
				actionModal({
					ref: AddPermissionForm,
					title: "Add New Permission"
				})}
		>
			<span><IconPlus size={20} /></span>
			<span>Add</span>
		</button>
	</header>

	<div class="grid grid-column gap-4 wf__list">
		{#if !data}
			<Loader />
		{:else}
			{#each permissions as permission}
				<div class="p-4 wf__list__item">
					<div class="wf__list__item__header">
						<h3 class="px-2 text-primary-500 wf__list__title">{permission.name}</h3>
						<div class="wf__list__actions">
							<button
								class="btn variant-filled-primary mr-2"
								on:click={() =>
									actionModal({
										ref: UpdatePermissionForm,
										props: { permission },
										title: "Update Permission"
									})}
							>
								<span><IconPencil size={18} /></span>
								<span>Update</span>
							</button>
							<form method="POST" action="?/delete" use:enhance={submitDeleteItem}>
								<input type="hidden" name="item" hidden value="permission" />
								<input type="hidden" name="id" hidden value={permission.id} />
								<input type="hidden" name="name" hidden value={permission.name} />
								<button type="submit" class="btn variant-filled-error">
									<span><IconTrashXFilled size={18} /></span>
									<span>Delete</span>
								</button>
							</form>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
