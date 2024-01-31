<script lang="ts">
	import { page } from '$app/stores';
	import 'chartist/dist/index.css';
	import { BarChart, PieChart } from 'chartist';
	import { onMount } from 'svelte';
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import { UserRole, capitalize } from '$lib/shared';
	import LL from '$i18n/i18n-svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';

	export let data;

	$: users = data.users;
	$: console.log('users: ', data.users);

	let usersChart;
	let projectsChart;

	onMount(() => {
		const userData = countUsersByRole(users);

		const usersChartData = {
			series: Object.values(userData)
		};

		const userChartLabels: string[] = Object.keys(userData);

		usersChart = new PieChart('#usersChart', usersChartData, {
			labelInterpolationFnc: (value, i) =>
				`${userChartLabels[i]}: ${
					Math.round((+value / usersChartData.series.reduce((a, b) => a + b)) * 100) + '%'
				}`
		});

		projectsChart = new BarChart(
			'#projectsChart',
			{
				labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
				series: [20, 60, 120, 200, 180, 20, 10]
			},
			{
				distributeSeries: true
			}
		);
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

		users.forEach((user) => {
			if (user.role !== UserRole.ADMIN && user.role !== 'owner') {
				if (roleCounts[user.role]) {
					roleCounts[user.role]++;
				} else {
					roleCounts[user.role] = 1;
				}
			}
		});

		return roleCounts;
	};

	$: console.log($page.data.currentLoggedInUser);
</script>

<Box>
	<div class="flex flex-col gap-8">
		<PageTitle text={capitalize($LL.pages.dashboard.title())} />

		<DynamicDataRenderer layout="grid" gap="gap-6" gridClasses="grid-cols-1 md:grid-cols-2">
			{#if $page.data.currentLoggedInUser.role === UserRole.ADMIN || $page.data.currentLoggedInUser.role === 'owner'}
				<div class="flex flex-col gap-6">
					<h3 class="font-secondary font-medium text-2xl">Projects (this year)</h3>
					<div class="h-96">
						<div id="projectsChart" class="h-full"></div>
					</div>
				</div>

				<div class="flex flex-col gap-6">
					<h3 class="font-secondary font-medium text-2xl text-center">
						All users in organization
					</h3>
					<div class="flex justify-center h-96">
						<div id="usersChart" class="h-full"></div>
					</div>
				</div>
			{/if}

			<!-- {#if $page.data.currentLoggedInUser.role === UserRole.WORKER || $page.data.currentLoggedInUser.role === UserRole.CLIENT || $page.data.currentLoggedInUser.role === UserRole.MANAGER} -->
			<div class="flex flex-col gap-6">
				<h3 class="font-secondary font-medium text-2xl">My projects</h3>
				<DynamicDataRenderer
					layout="grid"
					gap="gap-6"
					gridClasses="grid-cols-1 md:grid-cols-2"
				></DynamicDataRenderer>
			</div>
			<!-- {/if} -->
		</DynamicDataRenderer>
	</div>
</Box>
