<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;
	export let form: any;

	// Stores
	import { modalStore, toastStore } from "@skeletonlabs/skeleton";

	const submitCreate: SubmitFunction = async ({ data, cancel }) => {
		const { name } = Object.fromEntries(data as any);

		if (typeof name === "string" && name?.length < 2) {
			// validare pt form
			// return fail(400, {
			// 	error: true,
			// 	message: "Name must be at least 2 characters.",
			// 	name
			// });
			cancel();
		} else {
			return async ({ result, update }) => {
				switch (result.type) {
					case "success":
						toastStore.trigger({
							message: "Permission added successfully",
							background: "variant-filled-success"
						});
						await update();
						// if ($modalStore[0].response) $modalStore[0].response(formData);
						modalStore.close();
						break;
					case "failure":
						toastStore.trigger({
							message: "Permission not added",
							background: "variant-filled-error"
						});
						await update({ reset: false });
						break;
					default:
						break;
				}
			};
		}
	};

	// Base Classes
	const cBase = "card p-4 w-modal shadow-xl space-y-4";
	const cHeader = "text-2xl font-bold";
	const cForm = "border border-surface-500 p-4 space-y-4 rounded-container-token";
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? "(title missing)"}</header>
		<article>{$modalStore[0].body ?? "(body missing)"}</article>
		<form
			id="form"
			class="modal-form {cForm} wf__form"
			action="?/create"
			method="POST"
			use:enhance={submitCreate}
		>
			<div class="wf__form__group">
				<label for="name" class="label hidden wf__form__label">Name</label>
				<input
					id="name"
					class="input variant-form-material mt-0 wf__form__control"
					type="text"
					name="name"
					placeholder="Enter name..."
					value={form?.name ?? ""}
				/>
			</div>
		</form>
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
				{parent.buttonTextCancel}
			</button>
			<button type="submit" class="btn variant-filled-primary {parent.buttonPositive}" form="form">
				Create
			</button>
		</footer>
	</div>
{/if}
