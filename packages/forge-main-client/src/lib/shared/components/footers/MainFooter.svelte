<script lang="ts">
	import LL from '$i18n/i18n-svelte';
</script>

<div class="flex justify-between items-center text-sm text-slate-400 py-4">
	<span>&copy; 2023. {$LL.components.footer.copyright()}</span>
	<span>{$LL.components.footer.slogan()}</span>
</div>
