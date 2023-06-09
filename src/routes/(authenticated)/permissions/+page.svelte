<script lang="ts">
	import { enhance } from "$app/forms";
	import { IconPencil, IconPlus, IconTrashXFilled } from "@tabler/icons-svelte";
	import Loader from "$common/components/Loader.svelte";
	import ModalForm from "$common/components/Modal/ModalForm/ModalForm.svelte";
	import {
		submitDeleteItem,
		actionModalForm
	} from "$common/components/Modal/ModalForm/helpers.js";
	import type { PageData } from "./$types.js";
	import { crudPermissionSchema } from "$features/permissions/forms/validations.js";
	import { addEditFields } from "$features/permissions/forms/fields.js";

	export let data: PageData;

	$: ({ permissions, form } = data);
</script>

<div>
	<header class="mb-6 wf__page__header">
		<h2 class="h1 wf__page__title">Permissions</h2>
		<button
			type="button"
			class="btn btn-sm variant-filled-primary"
			on:click={() =>
				actionModalForm({
					ref: ModalForm,
					props: {
						modalId: "addPermissionModal",
						form: {
							data: form,
							id: "addPermissionForm",
							action: "create",
							schema: crudPermissionSchema,
							fields: addEditFields(),
							messages: {
								success: "Permission added successfully",
								error: "Permission not added"
							}
						}
					},
					title: "Add New Permission",
					buttonTextSubmit: "Create"
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
			{#each permissions.items as permission}
				<div class="p-4 wf__list__item">
					<div class="wf__list__item__header">
						<h3 class="px-2 text-primary-500 wf__list__title">
							{permission.name}
						</h3>
						<div class="wf__list__actions">
							<button
								type="button"
								class="btn variant-filled-primary mr-2"
								on:click={() =>
									actionModalForm({
										ref: ModalForm,
										props: {
											modalId: "updatePermissionModal",
											form: {
												data: permission,
												id: "updatePermissionForm",
												action: "update",
												schema: crudPermissionSchema,
												dataToAppend: [
													{
														name: "id",
														value: permission.id
													}
												],
												fields: addEditFields(),
												messages: {
													success: "Permission updated successfully.",
													error: "Permission not updated."
												}
											}
										},
										title: "Update Permission",
										buttonTextSubmit: "Update"
									})}
							>
								<span><IconPencil size={18} /></span>
								<span>Update</span>
							</button>
							<form
								method="POST"
								action="?/delete"
								use:enhance={submitDeleteItem}
							>
								<input type="hidden" name="item" hidden value="permission" />
								<input type="hidden" name="id" hidden value={permission.id} />
								<input
									type="hidden"
									name="name"
									hidden
									value={permission.name}
								/>
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
