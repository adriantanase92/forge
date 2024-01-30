<script lang="ts">
	import MainFooter from '$lib/shared/components/footers/MainFooter.svelte';
	import Notifications from '$lib/shared/components/general/notification/Notifications.svelte';
	import MainHeader from '$lib/shared/components/headers/MainHeader.svelte';
	import MainSidebar from '$lib/shared/components/sidebars/MainSidebar.svelte';
</script>

<MainHeader />
<main class="lg:flex">
	<MainSidebar />
	<div id="main-content" class="bg-gallery flex-grow min-h-full pt-20 relative px-4 lg:px-5">
		<slot />
		<MainFooter />
	</div>
</main>
<Notifications />
