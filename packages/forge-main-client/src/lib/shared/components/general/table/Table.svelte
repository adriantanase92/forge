<script lang="ts">
	import Pagination from '../pagination/Pagination.svelte';
	import Search from '../search/Search.svelte';
	import type {
		TableAction,
		TableHeader,
		TableItem,
		TableItemValue,
		TableOnClickDispatcherEvent
	} from './types';
	import LL from '$i18n/i18n-svelte';
	import Button from '../button/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import { stylingClasses } from './utils';
	import SvgIcon from '../svg/SvgIcon.svelte';
	import { colorOptionsPerColor } from '$lib/shared/utils';

	export let headers: TableHeader[] = [];
	export let items: TableItem[] = [];
	export let actions: TableAction[] = [];

	export let responsiveMode: 'simple' | 'advanced' = 'advanced';
	export let withSearch: boolean = false;
	export let withPagination: boolean = false;
	export let striped: boolean = false;
	export let stripedClass: string = 'even:bg-slate-50';
	export let hoverable: boolean = false;
	export let hoverableClass: string = 'hover:bg-none sm:hover:bg-gray-300';
	export let noDataFoundMessage: string = $LL.errors.noDataFound();

	export let totalItems: number = 10;
	export let currentPage: number = 10;

	$: itemsCheck = items.length > 0;
	$: hasActions = actions.length > 0;

	const dispatch = createEventDispatcher();

	const onClickAction = ({ data, actionName }: TableOnClickDispatcherEvent) => {
		if (data) {
			dispatch('clickAction', {
				data,
				actionName
			});
		}
	};
</script>

<div class="flex max-w-full flex-col gap-8 overflow-hidden sm:gap-4">
	<div
		class="flex max-w-full flex-col items-center justify-between gap-4 py-1 md:flex-row md:gap-0"
	>
		{#if $$slots.title}
			<div class="grow">
				<slot name="title" />
			</div>
		{/if}

		<div class="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
			{#if withSearch}
				<Search wrapperClasses="w-full sm:w-auto mr-[1px]" on:searchBy />
			{/if}

			{#if $$slots.actions}
				<slot name="actions" />
			{/if}
		</div>
	</div>

	{#if itemsCheck}
		<div class="max-w-full overflow-x-auto">
			<table class={stylingClasses[responsiveMode].tableEl}>
				<thead class={stylingClasses[responsiveMode].tableHead.el}>
					{#if responsiveMode === 'advanced'}
						{#each items as item, index}
							<tr
								class="{stylingClasses[responsiveMode].tableHead.trEl} {index !== 0
									? 'sm:hidden'
									: ''}"
							>
								{#each headers as header}
									{@const headerStyleClasses = header.stylingClasses
										? header.stylingClasses
										: 'text-white sm:text-rhino'}
									<th class={stylingClasses[responsiveMode].tableHead.thEl}>
										<span class={headerStyleClasses}>{header.text}</span>
									</th>
								{/each}

								{#if hasActions}
									<th class={stylingClasses[responsiveMode].tableHead.thActionsEl}
										><span class="text-white sm:text-rhino visible sm:invisible"
											>{$LL.components.table.actions()}</span
										></th
									>
								{/if}
							</tr>
						{/each}
					{:else}
						<tr class={stylingClasses[responsiveMode].tableHead.trEl}>
							{#each headers as header}
								{@const headerStyleClasses = header.stylingClasses
									? header.stylingClasses
									: ''}
								<th class={stylingClasses[responsiveMode].tableHead.thEl}>
									<span class={headerStyleClasses}>{header.text}</span>
								</th>
							{/each}

							{#if hasActions}
								<th class={stylingClasses[responsiveMode].tableHead.thActionsEl}
									><span class="text-white sm:text-rhino visible sm:invisible"
										>{$LL.components.table.actions()}</span
									></th
								>
							{/if}
						</tr>
					{/if}
				</thead>
				<tbody class={stylingClasses[responsiveMode].tableBody.el}>
					{#each items as item}
						<tr
							class="{stylingClasses[responsiveMode].tableBody.trEl} {striped
								? stripedClass
								: ''} {hoverable ? hoverableClass : ''}"
						>
							{#each headers as header}
								{@const itemStyleClasses = item[header.key].stylingClasses
									? item[header.key].stylingClasses
									: null}
								<td class={stylingClasses[responsiveMode].tableBody.tdEl}>
									{#if item[header.key].value !== null}
										<span class={itemStyleClasses}>
											{item[header.key].value}
										</span>
									{:else}
										<span class="font-primary italic">/</span>
									{/if}
								</td>
							{/each}

							{#if hasActions}
								<td class={stylingClasses[responsiveMode].tableBody.tdActionsEl}>
									<div
										class="flex w-full gap-2 {responsiveMode === 'advanced'
											? 'justify-start sm:justify-end'
											: 'justify-end'}"
									>
										{#each actions as action}
											{#if !(item.actionsToHide && item.actionsToHide.value === action.btnActionName)}
												{#if action.type === 'button'}
													<Button
														kind="custom"
														color={action.buttonColor}
														class={action.class}
														icon={action.icon?.name}
														iconWidth={action.icon?.width}
														iconHeight={action.icon?.height}
														iconColor={action.icon?.color}
														on:click={(e) =>
															onClickAction({
																data: structuredClone(item),
																actionName:
																	action.btnActionName ?? ''
															})}
													/>
												{:else}
													<a
														class="{action.class} {action.linkBgColor
															? colorOptionsPerColor[
																	action.linkBgColor
															  ].backGround
															: ''}"
														href={action.linkType === 'url'
															? action.linkUrl
															: `mailto:${item['email'].value}`}
														target={action.linkTarget
															? action.linkTarget
															: '_self'}
													>
														{#if action.text}{action.text}{/if}

														{#if action.icon}
															<SvgIcon
																name={action.icon?.name}
																width={action.icon?.width}
																height={action.icon?.height}
																color={action.icon?.color}
															/>
														{/if}
													</a>
												{/if}
											{/if}
											<!-- {/if} -->
										{/each}
									</div>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if withPagination}
			<Pagination {totalItems} {currentPage} on:changePage />
		{/if}
	{:else}
		<div>{noDataFoundMessage}</div>
	{/if}
</div>
