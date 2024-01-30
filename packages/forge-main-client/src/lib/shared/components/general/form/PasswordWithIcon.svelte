<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import SvgIcon from '$lib/shared/components/general/svg/SvgIcon.svelte';
	import type { inputType } from './types';

	let showPassword = false;
	let type: inputType;
	$: type = showPassword ? 'text' : 'password';
</script>

<div class="relative">
	<slot prop={type} />

	<button
		class="absolute bottom-0 right-0 top-0 block px-3"
		type="button"
		on:click={() => (showPassword = !showPassword)}
		title={showPassword
			? $LL.fields.password.hidePassword()
			: $LL.fields.password.showPassword()}
	>
		{#key showPassword}
			<SvgIcon name="eye-{showPassword ? 'closed' : 'open'}" width="24" height="24" />
		{/key}
	</button>
</div>
