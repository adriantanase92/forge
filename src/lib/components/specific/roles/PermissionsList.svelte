<script lang="ts">
	import { SlideToggle } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";

	export let role: any = {};

	const dispatch = createEventDispatcher();

	function onPermissionOptionChange(e: MouseEvent, options: any) {
		dispatch("permissionOptionChanged", {
			...options,
			state: (e.target as HTMLInputElement).checked
		});
	}
</script>

<div class="flex flex-row justify-between bg-primary-200">
	<div class="basis-1/3 py-2 pl-2"><span class="font-semibold">Name</span></div>
	<div class="basis-1/3 py-2"><span class="font-semibold">Read</span></div>
	<div class="basis-1/3 py-2"><span class="font-semibold">Write</span></div>
</div>

{#each role.permissions as permission, index}
	<hr class="!border-t-2" />
	<div
		class="flex flex-row justify-between justify-items-center content-center items-center"
		class:bg-primary-200={index % 2 !== 0}
	>
		<div class="basis-1/3 pl-2">
			<span class="text-primary-500 font-bold">{permission.name}</span>
		</div>
		<div class="basis-1/3 pt-2">
			<SlideToggle
				name="{role.name}-{permission.name}-read"
				checked={permission.read}
				active="bg-success-500"
				size="sm"
				on:click={(e) =>
					onPermissionOptionChange(e, {
						roleId: role.id,
						roleName: role.name,
						permissionName: permission.name,
						permissionOption: "read"
					})}
			>
				{permission.read ? "on" : "off"}
			</SlideToggle>
		</div>
		<div class="basis-1/3 pt-2">
			<SlideToggle
				name="{role.name}-{permission.name}-write"
				checked={permission.write}
				active="bg-success-500"
				size="sm"
				on:click={(e) =>
					onPermissionOptionChange(e, {
						roleId: role.id,
						roleName: role.name,
						permissionName: permission.name,
						permissionOption: "write"
					})}
			>
				{permission.write ? "on" : "off"}
			</SlideToggle>
		</div>
	</div>
{/each}
