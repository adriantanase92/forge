export const stylingClasses = {
	advanced: {
		tableEl:
			'flex-no-wrap flex w-full flex-row sm:table sm:min-w-[1280px] sm:flex-nowrap lg:w-full',
		tableHead: {
			el: 'w-1/3 min-w-[180px] overflow-x-auto border-none sm:w-auto sm:min-w-full sm:border-b sm:border-solid sm:border-rhino lg:overflow-x-hidden',
			trEl: 'flex-no wrap mb-8 flex flex-col rounded-l-lg last:mb-0 sm:mb-0 sm:table-row sm:rounded-none',
			thEl: 'border-b border-solid border-gallery bg-rhino p-2 text-left font-secondary font-bold sm:border-none sm:bg-transparent sm:py-2 sm:pl-2 sm:pr-4',
			thActionsEl:
				'flex h-[49px] items-center border-b border-solid border-rhino bg-rhino p-2 text-left font-secondary font-bold sm:table-cell sm:h-auto sm:border-none sm:bg-transparent sm:py-2 sm:pl-2 sm:pr-4 sm:text-right'
		},
		tableBody: {
			el: 'w-2/3 min-w-[320px] flex-1 overflow-x-auto sm:w-auto sm:min-w-full sm:flex-none lg:overflow-x-hidden',
			trEl: 'flex-no wrap mb-8 flex flex-col last:mb-0 sm:mb-0 sm:table-row',
			tdEl: 'border-b border-grey-gallery p-2 sm:py-3 sm:pl-2 sm:pr-4',
			tdActionsEl: 'border-b border-grey-gallery p-2 text-right sm:py-3 sm:pl-4 sm:pr-2'
		}
	},
	simple: {
		tableEl: 'min-w-[1280px] lg:w-full border-b border-solid border-rhino',
		tableHead: {
			el: 'border-b border-solid border-rhino',
			trEl: 'last:mb-0',
			thEl: 'text-left font-secondary font-bold border-none bg-transparent py-2 pl-2 pr-4',
			thActionsEl:
				'font-secondary font-bold border-none bg-transparent py-2 pl-2 pr-4 text-right'
		},
		tableBody: {
			el: '',
			trEl: 'last:mb-0',
			tdEl: 'border-b border-grey-gallery py-3 pl-2 pr-4',
			tdActionsEl: 'border-b border-grey-gallery text-right py-3 pl-4 pr-2'
		}
	}
};
