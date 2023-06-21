<script lang="ts">
	export let headers: any[] = [];
	export let items: any[] = [];
</script>

<div class="table-container ">
	<table class="table table-interactive" role="grid">
		<thead class="table-head">
			<tr>
				{#each headers as header}
					<th class={header.classes}>{header.text}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="table-body">
			{#each items as item, i}
				<tr aria-rowindex={i}>
					{#each headers as header}
						<td class={item.classes} role="gridcell">
							{item[header]}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
