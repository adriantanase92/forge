<script lang="ts">
	import { colors, sidebarUserMenuItems } from '$lib/shared';
	import { LL } from '$i18n/i18n-svelte';
	import SvgIcon from '../general/svg/SvgIcon.svelte';
	import Logo from '../logo/Logo.svelte';
	import { page } from '$app/stores';
	import Button from '../general/button/Button.svelte';
	import { goto } from '$app/navigation';
	import { isPanelSidebarOpen } from '$stores/ui';

	let screenSize: number;
	$: $isPanelSidebarOpen = screenSize > 1280 ? true : false;

	const activeLink = (linkName: string) =>
		$page.url.pathname.includes(linkName)
			? 'bg-cobalt text-white'
			: 'text-rhino hover:bg-gallery';

	const activeLinkIcon = (linkName: string) =>
		$page.url.pathname.includes(linkName) ? colors.white : colors.rhino;

	const togglePanelSidebar = () => {
		$isPanelSidebarOpen = !$isPanelSidebarOpen;
	};
</script>

<svelte:window bind:innerWidth={screenSize} />

<!-- [&amp;.show_.sidebar-bg]:inset-0 [&amp;.show_.sidebar-content]:translate-x-0 -->
<aside
	id="main-sidebar"
	class="sidebar transition-all fixed duration-500 ease-in-out shadow-sm max-lg:z-[60] lg:shrink-0 lg:relative {$isPanelSidebarOpen
		? 'w-72 lg:w-72'
		: 'w-0 lg:w-0'} h-screen max-lg:[&amp;.show_.sidebar-bg]:opacity-60"
>
	{#if screenSize < 1280 && $isPanelSidebarOpen}
		<!-- backdrop -->
		<div class="sidebar-bg fixed z-40 h-full w-full opacity-60 bg-black"></div>
	{/if}

	<div
		id="sidebar-content"
		class="sidebar-content fixed transition-all duration-300 ease-in-out z-40 {$isPanelSidebarOpen
			? 'translate-x-0 bg-white w-72'
			: '-translate-x-full'} left-0 top-0 bottom-0 h-screen overflow-auto scrollbars pt-2"
	>
		<div class="flex flex-col h-full relative">
			{#if screenSize < 1280 && $isPanelSidebarOpen}
				<!-- trigger sidebar -->
				<Button
					class="w-12 h-12 py-2 px-4 font-medium absolute top-0 right-2"
					kind="icon"
					color="transparent"
					icon="x"
					iconHeight="32"
					iconWidth="32"
					iconColor={colors.black}
					on:click={togglePanelSidebar}
				/>
			{/if}

			<Logo />

			<hr class="my-4 h-0.5 border-t-0 bg-neutral-100 opacity-100" />

			<div class="w-full inline-flex flex-col px-3 pb-3 grow">
				<!-- title & menu -->
				<ul class="sidebar-menu flex flex-col">
					{#each sidebarUserMenuItems($LL) as item}
						{#if item.module && $page.data.currentLoggedInUser.permissions[item.module].read}
							<li>
								<a
									href={item.url}
									class="flex items-center py-3 pl-12 pr-6 mb-1 leading-none gap-2.5 font-secondary font-medium rounded-full {activeLink(
										item.id
									)}"
									target={item.isExternal ? '_blank' : '_self'}
								>
									{#key activeLinkIcon(item.id)}
										<SvgIcon
											name={item.icon}
											width="24"
											height="24"
											color={activeLinkIcon(item.id)}
										/>
									{/key}
									{item.text}
								</a>
							</li>
						{/if}
					{:else}
						<li>{$LL.menus.sidebar.noItemsFoundMessage()}</li>
					{/each}
				</ul>
			</div>

			<footer class="flex flex-col items-center gap-2 pt-2 pb-4">
				<Button
					class="p-2"
					kind="custom"
					color="transparent"
					on:click={() => goto(`${$LL.routes.protected.logOut()}`)}
				>
					<div class="flex flex-col items-center gap-1">
						<SvgIcon name="power-on-off" iconHeight="34" iconWidth="34" />
						<div class="font-bold">{$LL.buttonsOrLinks.logOut()}</div>
					</div>
				</Button>

				<div class="text-xs opacity-50">{$LL.app.versionInfo({ version: '1.0.0' })}</div>
			</footer>
		</div>
	</div>
</aside>
