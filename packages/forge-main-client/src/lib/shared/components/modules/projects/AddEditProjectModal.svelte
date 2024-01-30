<script lang="ts">
	import FieldError from '$lib/shared/components/general/form/FieldError.svelte';
	import Input from '$lib/shared/components/general/form/Input.svelte';
	import AddEditModal from '../../general/modal/AddEditModal.svelte';
	import type { ModalState } from '../../general/modal/types';
	import {
		textValidator,
		capitalize,
		Modules,
		createOne,
		type NewProjectType,
		UserRole,
		formatArrayToOptionsArray,
		type EditProjectType,
		updateOne,
		type ProjectType,
		getErrorTranslationFromKey
	} from '$lib/shared';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import LL from '$i18n/i18n-svelte';
	import Button from '../../general/button/Button.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import Textarea from '../../general/form/Textarea.svelte';
	import Select from '../../general/form/Select.svelte';
	import type { SelectOptionType } from '../../general/form/types';
	import { notifications } from '$stores/notifications';
	import MultiSelect from '../../general/form/MultiSelect.svelte';

	type UsersProp = { id: string; role: UserRole; name: string };

	export let open = false;
	export let modalState: ModalState = 'add';
	export let entity: string = 'item';
	export let schema;
	export let dataForEditForm: EditProjectType | null = null;
	export let users: UsersProp[] = [];
	export let token: string;

	const clients: SelectOptionType[] = formatArrayToOptionsArray({
		array: users.filter((user: UsersProp) => user.role === UserRole.CLIENT),
		textProp: 'name',
		valueProp: 'id'
	});
	const workers: SelectOptionType[] = formatArrayToOptionsArray({
		array: users.filter((user: UsersProp) => user.role === UserRole.WORKER),
		textProp: 'name',
		valueProp: 'id'
	});
	const managers: SelectOptionType[] = formatArrayToOptionsArray({
		array: users.filter((user: UsersProp) => user.role === UserRole.MANAGER),
		textProp: 'name',
		valueProp: 'id'
	});

	const projectData = open && modalState === 'edit' ? dataForEditForm : null;

	const form = superForm(superValidateSync(projectData, schema), {
		SPA: true,
		dataType: 'json',
		onUpdate: async ({ form }) => {
			if (form.valid) {
				if (!form.data.id) {
					const response = await createOne<NewProjectType>({
						apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
						data: {
							name: form.data.name,
							description: form.data.description ? form.data.description : '',
							manager: form.data.manager,
							clients:
								form.data.clients && form.data.clients.length > 0
									? form.data.clients
									: [],
							workers:
								form.data.workers && form.data.workers.length > 0
									? form.data.workers
									: [],
							tasks: []
						},
						token
					});
					if (!response.error) {
						notifications.success(
							$LL.notifications.somethingAddedSuccessfully({
								something: `<span class="capitalize mr-2">${$LL.modules.projects.entity.single()}</span>`
							})
						);
					} else {
						notifications.danger(
							getErrorTranslationFromKey($LL, response.error.errorKey)
						);
						if (response.error.error) {
							console.error(`Error: ${response.error.error}`);
						}
					}
				} else {
					const response = await updateOne<ProjectType>({
						apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
						id: form.data.id,
						data: {
							name: form.data.name,
							description: form.data.description ? form.data.description : '',
							manager: form.data.manager,
							clients:
								form.data.clients && form.data.clients.length > 0
									? form.data.clients
									: [],
							workers:
								form.data.workers && form.data.workers.length > 0
									? form.data.workers
									: []
						},
						token
					});
					if (!response.error) {
						notifications.success(
							$LL.notifications.somethingEditedSuccessfully({
								something: `<span class="capitalize mr-2">${$LL.modules.projects.entity.single()}</span>`
							})
						);
					} else {
						notifications.danger(
							getErrorTranslationFromKey($LL, response.error.errorKey)
						);
						if (response.error.error) {
							console.error(`Error: ${response.error.error}`);
						}
					}
				}
				open = false;
			}
		},
		validators: {
			name: (name) =>
				textValidator({
					value: name,
					fieldName: 'name',
					minCharacters: 2,
					maxCharacters: 60,
					t: $LL
				})
		},
		errorSelector: '[aria-invalid="true"]',
		scrollToError: 'smooth',
		autoFocusOnError: 'detect',
		stickyNavbar: '#main-header',
		resetForm: true
	});
	const { form: formData, errors, enhance, delayed, message } = form;
</script>

{#if open}
	<AddEditModal bind:open size="lg" {modalState} {entity}>
		<form id="addEditForm" method="POST" use:enhance>
			{#if $formData.id}
				<Input {form} field="id" type="hidden" id="id" class="hidden" />
			{/if}

			<div class="flex flex-col gap-6">
				<SuperDebug data={$formData} />

				<div>
					<Input
						aria-invalid={$errors.name ? 'true' : undefined}
						placeholder={capitalize(
							`${$LL.modules.projects.entity.single()} ${$LL.fields.name.text()}`
						)}
						{form}
						field="name"
						type="text"
						id="name"
						class=""
					/>
					<FieldError errors={$errors.name} />
				</div>

				<div>
					<Textarea
						aria-invalid={$errors.description ? 'true' : undefined}
						placeholder={capitalize($LL.fields.description.text())}
						{form}
						field="description"
						id="description"
						class=""
					/>
					<FieldError errors={$errors.description} />
				</div>

				<div>
					<Select
						label={capitalize($LL.modules.users.types.manager.single())}
						aria-invalid={$errors.name ? 'true' : undefined}
						options={managers}
						withEmptyOption
						{form}
						field="manager"
						id="manager"
						class=""
					/>
					<FieldError errors={$errors.manager} />
				</div>

				<div>
					<MultiSelect
						label={capitalize($LL.modules.users.types.client.multiple())}
						aria-invalid={$errors.name ? 'true' : undefined}
						options={clients}
						{form}
						field="clients"
						id="clients"
					/>
					<FieldError errors={$errors.clients} />
				</div>

				<div>
					<MultiSelect
						label={capitalize($LL.modules.users.types.worker.multiple())}
						aria-invalid={$errors.name ? 'true' : undefined}
						options={workers}
						{form}
						field="workers"
						id="workers"
					/>
					<FieldError errors={$errors.workers} />
				</div>

				<div class="flex items-center justify-between">
					<Button
						color="rhino"
						class="px-4 py-2"
						kind="outline"
						on:click={() => (open = false)}>{$LL.buttonsOrLinks.cancel()}</Button
					>

					<Button
						kind="fill"
						color="curious"
						class="inline-flex items-center justify-center gap-2 px-4 py-2.5"
						type="submit"
						form="addEditForm"
						disabled={$delayed}
						delayed={$delayed}
					>
						{#if modalState === 'add'}
							{$LL.buttonsOrLinks.addSomething({
								something: $LL.modules.projects.entity.single()
							})}
						{:else}
							{$LL.buttonsOrLinks.confirm()}
						{/if}
					</Button>
				</div>
			</div>
		</form>
	</AddEditModal>
{/if}
