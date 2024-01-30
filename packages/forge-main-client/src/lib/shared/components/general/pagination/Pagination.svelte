<script lang="ts">
	import Button from '../button/Button.svelte';
	import { colors } from '$lib/shared/utils';
	import SvgIcon from '../svg/SvgIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	// Set to `true` if you want to display the current page number
	export let displayCurrentPage: boolean = false;
	// Specify the current active page
	export let currentPage: number = 1;
	// Specify the total number of items
	export let totalItems: number;
	// Specify the number of items to skip;
	export let limit: number = 10;
	// Specify the css classes for the wrapper element
	export let wrapperClasses: string = 'flex items-center justify-between';
	// Specify the css classes for the previous button element
	export let prevButtonClasses: string = 'rounded-lg shrink-0 w-[40px] h-[40px] leading-[40px]';
	// Specify the css classes for the next button element
	export let nextButtonClasses: string = 'rounded-lg shrink-0 w-[40px] h-[40px] leading-[40px]';
	// Specify the css classes for the pages wrapper element
	export let pagesWrapper: string = 'hidden 2xs:flex gap-2';
	// Specify the css classes for all the page button elements
	export let pageButtonClasses: string =
		'w-[40px] h-[40px] leading-[40px] text-center rounded-lg font-secondary';
	export let ellipsisClasses: string =
		'inline-block w-[40px] h-[40px] leading-[40px] text-center rounded-lg font-secondary bg-gallery text-rhino';

	$: pageCount = Math.ceil(totalItems / limit);

	const goToPage = (page: number) => {
		currentPage = page;
		handleChangePage();
	};

	const prevPage = () => {
		if (currentPage > 1) currentPage--;
		handleChangePage();
	};

	const nextPage = () => {
		if (currentPage < pageCount) currentPage++;
		handleChangePage();
	};

	const activePage = (page: number, currentPage: number) =>
		currentPage === page ? 'bg-rhino text-white' : 'bg-gallery !text-rhino';

	const dispatch = createEventDispatcher();

	const handleChangePage = () => {
		dispatch('changePage', {
			pagination: {
				page: currentPage,
				...(limit !== 10 ? { limit } : {})
			}
		});
	};
</script>

{#if pageCount > 1}
	<div class={wrapperClasses}>
		{#if currentPage > 1}
			<Button kind="custom" color="gallery" class={prevButtonClasses} on:click={prevPage}>
				<SvgIcon
					class="mx-auto"
					name="arrow-left-style-1"
					width="24"
					heigth="24"
					color={colors.rhino}
				/>
			</Button>
		{:else}
			<div class={prevButtonClasses}>&nbsp;</div>
		{/if}

		<div class={pagesWrapper}>
			{#if !displayCurrentPage}
				{#if currentPage !== 1}
					<!-- Always show first page -->
					<Button
						class="{pageButtonClasses} {activePage(1, currentPage)}"
						on:click={() => goToPage(1)}>1</Button
					>
				{/if}

				<!-- Ellipsis after first page if needed -->
				{#if currentPage > 3}
					<span class={ellipsisClasses}>...</span>
				{/if}

				<!-- Show previous to current page if it exists and isn't the first page -->
				{#if currentPage > 2}
					<Button
						class="{pageButtonClasses} {activePage(currentPage - 1, currentPage)}"
						on:click={() => goToPage(currentPage - 1)}>{currentPage - 1}</Button
					>
				{/if}

				<!-- Show current page -->
				<Button
					class="{pageButtonClasses} {activePage(currentPage, currentPage)}"
					on:click={() => goToPage(currentPage)}>{currentPage}</Button
				>

				<!-- Show next to current page if it exists and isn't the last page -->
				{#if currentPage < pageCount - 1}
					<Button
						class="{pageButtonClasses} {activePage(currentPage + 1, currentPage)}"
						on:click={() => goToPage(currentPage + 1)}>{currentPage + 1}</Button
					>
				{/if}

				<!-- Show next+1 to current page if it exists and isn't the last page -->
				{#if currentPage < pageCount - 2}
					<Button
						class="{pageButtonClasses} {activePage(currentPage + 2, currentPage)}"
						on:click={() => goToPage(currentPage + 2)}>{currentPage + 2}</Button
					>
				{/if}

				<!-- Ellipsis before last page if needed -->
				{#if currentPage < pageCount - 3}
					<span class={ellipsisClasses}>...</span>
				{/if}

				{#if currentPage !== pageCount}
					<!-- Always show last page -->
					<Button
						class="{pageButtonClasses} {activePage(pageCount, currentPage)}"
						on:click={() => goToPage(pageCount)}>{pageCount}</Button
					>
				{/if}
			{:else}
				<!-- Current Page -->
				{currentPage} of {pageCount}
			{/if}
		</div>

		{#if currentPage < pageCount}
			<Button kind="custom" color="gallery" class={nextButtonClasses} on:click={nextPage}>
				<SvgIcon
					class="mx-auto"
					name="arrow-right-style-1"
					width="24"
					heigth="24"
					color={colors.rhino}
				/>
			</Button>
		{:else}
			<div class={nextButtonClasses}>&nbsp;</div>
		{/if}
	</div>
{/if}
