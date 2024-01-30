<script lang="ts">
	import { colors } from '$lib/shared';
	import { isPanelSidebarOpen } from '$stores/ui';
	import Button from '../general/button/Button.svelte';
	import LanguageSwitcher from '../i18n/LanguageSwitcher.svelte';

	const togglePanelSidebar = () => {
		$isPanelSidebarOpen = !$isPanelSidebarOpen;
	};
</script>

<header
	id="main-header"
	class="[&.show]:translate-y-0 top-0 fixed h-16 px-4 lg:px-5 left-0 lg:left-72 right-0 flex flex-row items-center justify-between lg:justify-end gap-3 z-50 transition-all duration-300 ease-in-out shadow-sm bg-white"
>
	<!-- trigger sidebar -->
	<Button
		data-type="dialogs"
		data-target="#main-sidebar"
		class="relative inline-flex lg:hidden items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] tracking-[.00714em] text-center font-medium hover:bg-primary-600/[0.08]"
		kind="icon"
		color="transparent"
		icon="hamburger-menu"
		iconHeight="32"
		iconWidth="32"
		iconColor={colors.black}
		on:click={togglePanelSidebar}
	/>

	<div class="flex flex-row items-center gap-3 ml-auto md:ml-12">
		<div class="relative">
			<!-- Language swithcer menu button -->
			<LanguageSwitcher />
		</div>

		<!-- navbar right -->
		<div class="relative">
			<Button
				kind="icon"
				color="transparent"
				class="btn w-12 h-12 gap-x-2 py-2.5 flex items-center gap-2 justify-center rounded-full text-sm tracking-[0.15px]"
				icon="account"
				iconColor={colors.rhino}
				iconWidth="34"
				iconHeight="34"
			/>
		</div>
	</div>
</header>
