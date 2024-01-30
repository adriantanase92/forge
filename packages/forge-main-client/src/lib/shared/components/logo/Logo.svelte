<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { SvgIcon } from '../general/svg';

	export let id: string = 'logo';
	export let anchorCssClasses: string = 'flex flex-col gap-2 items-center w-full';
	export let iconCssClasses: string = 'max-w-[100px]';
	export let textCssClasses: string =
		'text-2xl font-secondary font-bold tracking-wide text-cobalt compact-hide ml-2 uppercase';
</script>

<a {id} href={$LL.routes.protected.dashboard()} class={anchorCssClasses}>
	<SvgIcon class={iconCssClasses} name="logo" width="100%" height="100%" />
	<h1 class={textCssClasses}>Forge</h1>
</a>
