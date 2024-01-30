<script lang="ts">
	import {
		createOne,
		Modules,
		type EditTaskType,
		type NewTaskType,
		updateOne,
		type TaskType,
		textValidator,
		capitalize,
		TaskStatus,
		UserRole,
		type ProjectType,
		getErrorTranslationFromKey
	} from '$lib/shared';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import type { ModalState } from '../../general/modal/types';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import LL from '$i18n/i18n-svelte';
	import { notifications } from '$stores/notifications';
	import AddEditModal from '../../general/modal/AddEditModal.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Input from '../../general/form/Input.svelte';
	import Button from '../../general/button/Button.svelte';
	import FieldError from '../../general/form/FieldError.svelte';
	import Textarea from '../../general/form/Textarea.svelte';
	import Select from '../../general/form/Select.svelte';
	import type { SelectOptionType } from '../../general/form/types';
	import MultiSelect from '../../general/form/MultiSelect.svelte';

	export let open = false;
	export let modalState: ModalState = 'add';
	export let entity: string = 'item';
	export let schema;
	export let dataForEditForm: EditTaskType | null = null;
	export let workersData: { id: string; name: string; role: UserRole }[];
	export let projectData: { id: string; name: string };
	export let token: string;

	const statuses: SelectOptionType[] = Object.values(TaskStatus).map((item) => ({
		text: capitalize(item.replace('-', ' ')),
		value: item
	}));
	const workers: SelectOptionType[] = workersData.map((worker) => ({
		text: worker.name,
		value: worker.id
	}));

	const taskData =
		open && modalState === 'edit'
			? dataForEditForm
			: {
					title: 'Task title',
					project: capitalize(projectData.name),
					status: TaskStatus.TO_DO
			  };

	const form = superForm(superValidateSync(taskData, schema), {
		SPA: true,
		dataType: 'json',
		onUpdate: async ({ form }) => {
			if (form.valid) {
				if (!form.data.id) {
					const response = await createOne<NewTaskType>({
						apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.TASKS}`,
						data: {
							title: form.data.title,
							status: form.data.status,
							project: projectData.id,
							description: form.data.description ? form.data.description : '',
							responsible:
								form.data.responsible && form.data.responsible.length > 0
									? form.data.responsible
									: []
						},
						token
					});
					if (!response.error) {
						notifications.success(
							$LL.notifications.somethingAddedSuccessfully({
								something: `<span class="capitalize mr-2">${$LL.modules.tasks.entity.single()}</span>`
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
					const response = await updateOne<TaskType>({
						apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.TASKS}`,
						id: form.data.id,
						data: {
							title: form.data.title,
							status: form.data.status,
							project: projectData.id,
							description: form.data.description ? form.data.description : '',
							responsible:
								form.data.responsible && form.data.responsible.length > 0
									? form.data.responsible
									: []
						},
						token
					});
					if (!response.error) {
						notifications.success(
							$LL.notifications.somethingEditedSuccessfully({
								something: `<span class="capitalize mr-2">${$LL.modules.tasks.entity.single()}</span>`
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
			title: (title) =>
				textValidator({
					value: title,
					fieldName: 'title',
					minCharacters: 6,
					maxCharacters: 100,
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
					<Textarea
						label={capitalize($LL.fields.title.text())}
						aria-invalid={$errors.title ? 'true' : undefined}
						{form}
						field="title"
						id="title"
						class=""
					/>
					<FieldError errors={$errors.title} />
				</div>

				<div>
					<Textarea
						label={capitalize($LL.fields.description.text())}
						aria-invalid={$errors.description ? 'true' : undefined}
						{form}
						field="description"
						id="description"
						class=""
					/>
					<FieldError errors={$errors.description} />
				</div>

				<div>
					<Select
						label={capitalize($LL.fields.status.text())}
						aria-invalid={$errors.status ? 'true' : undefined}
						options={statuses}
						withEmptyOption
						{form}
						field="status"
						id="status"
						class=""
					/>
					<FieldError errors={$errors.status} />
				</div>

				<div>
					<Input
						aria-invalid={$errors.project ? 'true' : undefined}
						label={capitalize($LL.modules.projects.entity.single())}
						{form}
						field="project"
						type="text"
						id="project"
						class=""
						disabled
					/>
					<FieldError errors={$errors.project} />
				</div>

				<div>
					<MultiSelect
						label={capitalize($LL.fields.responsible.text())}
						aria-invalid={$errors.responsible ? 'true' : undefined}
						options={workers}
						{form}
						field="responsible"
						id="responsible"
					/>
					<FieldError errors={$errors.responsible} />
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
								something: $LL.modules.tasks.entity.single()
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
