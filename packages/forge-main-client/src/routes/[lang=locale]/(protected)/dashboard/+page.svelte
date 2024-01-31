<script lang="ts">
	import { page } from '$app/stores';
	import 'chartist/dist/index.css';
	import { BarChart, PieChart } from 'chartist';
	import { onMount } from 'svelte';
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import { Modules, UserRole, capitalize, colors, formatDateTime } from '$lib/shared';
	import LL from '$i18n/i18n-svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import { goto } from '$app/navigation';

	export let data;

	$: users = data.users ?? [];
	$: projects = data.projects ?? [];
	$: userProjects = data.userProjects ?? [];

	const normalUserCheck =
		$page.data.currentLoggedInUser.role === UserRole.WORKER ||
		$page.data.currentLoggedInUser.role === UserRole.CLIENT ||
		$page.data.currentLoggedInUser.role === UserRole.MANAGER;

	let usersChart;
	let projectsChart;

	onMount(() => {
		if (!normalUserCheck) {
			const userData = countUsersByRole(users);

			usersChart = new PieChart(
				'#usersChart',
				{
					series: [
						{
							value: userData[UserRole.CLIENT],
							name: UserRole.CLIENT,
							className: 'custom-client-chart-part-class',
							meta: 'Meta One'
						},
						{
							value: userData[UserRole.MANAGER],
							name: UserRole.MANAGER,
							className: 'custom-manager-chart-part-class',
							meta: 'Meta Two'
						},
						{
							value: userData[UserRole.WORKER],
							name: UserRole.WORKER,
							className: 'custom-worker-chart-part-class',
							meta: 'Meta Three'
						}
					]
				},
				{
					labelInterpolationFnc: (value, i) =>
						`${capitalize(Object.keys(userData)[i])}: ${value + '%'}`
				}
			);

			const projectsData = processProjects(projects);

			projectsChart = new BarChart('#projectsChart', projectsData, {
				distributeSeries: true,
				axisY: {
					onlyInteger: true
				}
			});
		}
	});

	const countUsersByRole = (
		users: {
			_id: string;
			role: UserRole & 'owner';
			changeLog: {
				createdAt: string;
			};
		}[]
	): Record<string, number> => {
		const roleCounts: Record<string, number> = {};
		let totalUsers = 0;

		users.forEach((user) => {
			if (user.role !== UserRole.ADMIN && user.role !== 'owner') {
				roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
				totalUsers++;
			}
		});

		const rolePercentages: Record<string, number> = {};
		for (const role in roleCounts) {
			rolePercentages[role] = (roleCounts[role] / totalUsers) * 100;
		}

		return rolePercentages;
	};

	const processProjects = (
		projects: {
			_id: string;
			changeLog: {
				createdAt: string;
			};
		}[]
	): { labels: string[]; series: number[] } => {
		const monthCounts: Record<string, number> = {};

		projects.forEach((project) => {
			const month = new Date(project.changeLog.createdAt).toLocaleString('default', {
				month: 'long'
			});
			monthCounts[month] = (monthCounts[month] || 0) + 1;
		});

		const labels = Object.keys(monthCounts);
		const series = Object.values(monthCounts);

		return { labels, series };
	};
</script>

<svelte:head>
	{#if !normalUserCheck}
		<style lnag="css">
			#usersChart .custom-client-chart-part-class {
				fill: #62b3f4;
			}

			#usersChart .custom-manager-chart-part-class {
				fill: #fa9600;
			}
			#usersChart .custom-worker-chart-part-class {
				fill: #2e3767;
			}
			#usersChart > svg g > .ct-label {
				fill: #fff;
			}
		</style>
	{/if}
</svelte:head>

<Box>
	<div class="flex flex-col gap-8">
		<PageTitle text={capitalize($LL.pages.dashboard.title())} />

		{#if !normalUserCheck}
			<DynamicDataRenderer layout="grid" gap="gap-6" gridClasses="grid-cols-1 md:grid-cols-2">
				<div class="flex flex-col gap-6">
					<h3 class="font-secondary font-medium text-2xl">
						{$LL.pages.dashboard.projectsTitle()}
					</h3>
					<div class="h-96">
						<div id="projectsChart" class="h-full"></div>
					</div>
				</div>

				<div class="flex flex-col gap-6">
					<h3 class="font-secondary font-medium text-2xl text-center">
						{$LL.pages.dashboard.usersInOrganization()}
					</h3>
					<div class="flex justify-center h-96">
						<div id="usersChart" class="h-full"></div>
					</div>
				</div>
			</DynamicDataRenderer>
		{/if}

		{#if normalUserCheck}
			<div class="flex flex-col gap-6">
				<h3 class="font-secondary font-medium text-2xl">
					{$LL.pages.dashboard.myProjects()}
				</h3>
				<DynamicDataRenderer
					layout="grid"
					gap="gap-6"
					gridClasses="grid-cols-1 md:grid-cols-2"
				>
					{#if userProjects.length > 0}
						{#each userProjects as project}
							<div
								class="bg-gallery rounded-xl group p-4 shadow-sm border-2 border-solid border-transparent hover:border-cobalt flex flex-col gap-6"
							>
								<div class="flex justify-between items-center">
									<div>
										<h3
											class="capitalize text-xl font-semibold group-hover:text-cobalt"
										>
											{project.name}
										</h3>
										<span class="text-sm text-slate-400"
											>{formatDateTime(project.changeLog.createdAt)
												.date}</span
										>
									</div>

									<div class="flex gap-2">
										<Button
											class="p-2"
											kind="icon"
											color="rhino"
											icon="eye-open"
											iconHeight="18"
											iconWidth="18"
											iconColor={colors.white}
											on:click={() =>
												goto(`/${Modules.PROJECTS}/${project._id}`)}
										/>
									</div>
								</div>

								{#if project.description}
									<div class="line-clamp-2">
										{project.description}
									</div>
								{/if}
							</div>
						{/each}
					{/if}
				</DynamicDataRenderer>
			</div>
		{/if}
	</div>
</Box>
