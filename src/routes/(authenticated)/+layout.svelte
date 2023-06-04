<script lang="ts">
	import { page } from "$app/stores";
	import { sections } from "$lib/utils/sections.js";
	import { AppBar, AppShell, Avatar, Modal, Toast } from "@skeletonlabs/skeleton";
	import { IconBellFilled, IconMessageCircle2Filled, IconSearch } from "@tabler/icons-svelte";
</script>

<Toast position="tr" />
<Modal />
<div class="h-full overflow-hidden wf__wrapper">
	<AppShell>
		<!-- (header) -->
		<svelte:fragment slot="header">
			<AppBar
				gridColumns="grid-cols-3"
				slotDefault="place-self-center"
				slotTrail="place-content-end"
				padding="p-2"
			>
				<svelte:fragment slot="lead">
					<a class="wf__logo" href="/dashboard">
						<img
							class="mr-2 wf__logo__img"
							src="/assets/images/forge-logo.png"
							alt="Forge logo"
							title="Forge logo"
						/>
						<h1 class="h2 wf__logo__text">Forge</h1>
					</a>
				</svelte:fragment>

				<div class="wf__search">
					<div class="wf__search__icon">
						<IconSearch size={24} color="rgb(var(--color-surface-400))" />
					</div>
					<input
						class="input variant-form-material wf__search__input"
						type="search"
						placeholder="Search..."
					/>
				</div>

				<svelte:fragment slot="trail">
					<button type="button" class="btn-icon btn-icon-sm variant-filled">
						<IconMessageCircle2Filled size={20} />
					</button>

					<button type="button" class="btn-icon btn-icon-sm variant-filled">
						<IconBellFilled size={20} />
					</button>

					<Avatar
						src="https://source.unsplash.com/YOErFW8AfkI/128x128"
						width="w-9"
						rounded="rounded-full"
						action={() => {
							console.log("open a drawer here or create a dropdown menu");
						}}
					/>
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<!-- (header) -->

		<!-- (sidebar) -->
		<svelte:fragment slot="sidebarLeft">
			<div class="hidden lg:block wf__sidebar">
				<nav class="list-nav wf__sidebar__menu">
					<ul class="wf__sidebar__list">
						{#each sections as section}
							<li class="wf__sidebar__item">
								<a
									class:bg-surface-100-800-token={$page.url.pathname === section.url}
									href={section.url}
									class="wf__sidebar__link"
								>
									<svelte:component
										this={section.icon.component}
										size={section.icon.size}
										class="wf__sidebar__icon"
									/>
									<span class="flex-auto wf__sidebar__text">{section.name}</span>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</svelte:fragment>
		<!-- (sidebar) -->

		<!-- Router Slot -->
		<main class="h-full p-5 wf__content">
			<div class="card p-6 wf__content__card">
				<slot />
			</div>
		</main>
		<!-- ---- / ---- -->

		<!-- (footer) -->
		<svelte:fragment slot="pageFooter">
			<div class="p-5 wf__footer">
				&copy; {new Date().getFullYear()} <strong>WebForge Solutions</strong>, Inc. All rights
				reserved.
			</div>
		</svelte:fragment>
		<!-- (footer) -->
	</AppShell>
</div>

<style lang="scss" global>
	.wf__wrapper {
		aside#sidebar-left {
			padding-top: 0.8rem;
			width: 20%;
			max-width: 220px;
			border-right: 2px solid rgb(var(--color-surface-100));
		}

		.wf__content {
			// background-color: rgb(242 238 247 / 10%);
			background-color: white;

			&__card {
				background-color: #faf8fc;
				border: 0;
				border-radius: 0;
			}
		}

		.wf__footer {
			font-size: small;
			color: #888888;
		}
	}

	.wf__logo {
		max-width: 48px;
		display: flex;
		align-items: center;

		&__text {
			line-height: 0;
		}
	}

	.wf__search {
		position: relative;

		&__icon {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			background-color: rgb(var(--color-surface-500) / 10%);
			height: 40px;
			padding: 8px;
			width: 40px;
		}

		&__input {
			padding-left: 3.2rem;
			border-bottom: 0;
			border-radius: 0.25rem !important;
			width: 100%;
		}
	}

	.wf__sidebar {
		&__menu {
		}

		&__list {
		}

		&__item {
		}

		&__link {
			border-radius: 0;
		}

		&__icon {
		}

		&__text {
		}
	}

	.wf__page__header {
		display: flex;
		justify-content: space-between;
	}

	.wf__list {
		&__item {
			border: 1px solid rgb(var(--color-surface-300));

			&__header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

		&__title {
			font-weight: bolder;
			font-size: 1.2rem;
		}

		&__actions {
			display: flex;
			justify-content: space-between;
		}
	}

	// ---- Shame ----
	// this is for the toast notification to be visible over modal
	.snackbar-wrapper {
		z-index: 99999 !important;
	}
</style>
