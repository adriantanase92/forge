<script lang="ts">
	import FieldError from '$lib/shared/components/general/form/FieldError.svelte';
	import Input from '$lib/shared/components/general/form/Input.svelte';
	import AddEditModal from '../../general/modal/AddEditModal.svelte';
	import {
		textValidator,
		capitalize,
		Modules,
		updateOne,
		getErrorTranslationFromKey,
		formatArrayToOptionsArray,
		type EditUserType,
		PreferredLanguage,
		emailValidator
	} from '$lib/shared';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import LL from '$i18n/i18n-svelte';
	import Button from '../../general/button/Button.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import Select from '../../general/form/Select.svelte';
	import { notifications } from '$stores/notifications';
	import type { SelectOptionType } from '../../general/form/types';

	export let open = false;
	export let entity: string = 'item';
	export let schema;
	export let dataForEditForm: EditUserType | null = null;
	export let token: string;

	const languages: SelectOptionType[] = formatArrayToOptionsArray({
		array: Object.values(PreferredLanguage).map((language) => ({
			name: language,
			value: language
		})),
		textProp: 'name',
		valueProp: 'value'
	});

	const form = superForm(superValidateSync(dataForEditForm, schema), {
		SPA: true,
		dataType: 'json',
		onUpdate: async ({ form }) => {
			if (form.valid) {
				const response = await updateOne<EditUserType>({
					apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
					id: form.data.id,
					data: {
						firstName: form.data.firstName,
						lastName: form.data.lastName,
						email: form.data.email,
						preferredLanguage: form.data.preferredLanguage,
						...(form.data.phone ? { phone: form.data.phone } : {})
					},
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
				open = false;
			}
		},
		validators: {
			email: (email) => emailValidator(email, $LL),
			firstName: (firstName) =>
				textValidator({
					value: firstName,
					fieldName: 'firstName',
					minCharacters: 2,
					maxCharacters: 100,
					t: $LL
				}),
			lastName: (lastName) =>
				textValidator({
					value: lastName,
					fieldName: 'lastName',
					minCharacters: 2,
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
	<AddEditModal bind:open size="lg" modalState="edit" {entity}>
		<form id="editForm" method="POST" use:enhance>
			{#if $formData.id}
				<Input {form} field="id" type="hidden" id="id" class="hidden" />
			{/if}

			<div class="flex flex-col gap-6">
				<SuperDebug data={$formData} />

				<div>
					<Input
						label={capitalize($LL.fields.firstName.text())}
						aria-invalid={$errors.firstName ? 'true' : undefined}
						placeholder={capitalize($LL.fields.firstName.text())}
						{form}
						field="firstName"
						type="text"
						id="firstName"
						class=""
					/>
					<FieldError errors={$errors.firstName} />
				</div>

				<div>
					<Input
						label={capitalize($LL.fields.lastName.text())}
						aria-invalid={$errors.lastName ? 'true' : undefined}
						placeholder={capitalize($LL.fields.lastName.text())}
						{form}
						field="lastName"
						type="text"
						id="lastName"
						class=""
					/>
					<FieldError errors={$errors.lastName} />
				</div>

				<div>
					<Input
						label={capitalize($LL.fields.email.text())}
						aria-invalid={$errors.email ? 'true' : undefined}
						placeholder={capitalize($LL.fields.email.text())}
						{form}
						field="email"
						type="email"
						id="email"
						class=""
					/>
					<FieldError errors={$errors.email} />
				</div>

				<div>
					<Input
						label={capitalize($LL.fields.phone.text())}
						aria-invalid={$errors.phone ? 'true' : undefined}
						placeholder={capitalize($LL.fields.phone.text())}
						{form}
						field="phone"
						type="text"
						id="phone"
						class=""
					/>
					<FieldError errors={$errors.phone} />
				</div>

				<div>
					<Select
						label={capitalize($LL.fields.preferredLanguage.text())}
						aria-invalid={$errors.name ? 'true' : undefined}
						options={languages}
						withEmptyOption
						{form}
						field="preferredLanguage"
						id="preferredLanguage"
						class=""
					/>
					<FieldError errors={$errors.preferredLanguage} />
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
						form="editForm"
						disabled={$delayed}
						delayed={$delayed}
					>
						{$LL.buttonsOrLinks.confirm()}
					</Button>
				</div>
			</div>
		</form>
	</AddEditModal>
{/if}
