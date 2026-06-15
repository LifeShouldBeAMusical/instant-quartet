const joinList = (list: string[]): string =>
	list.length == 0
		? ''
		: list.length > 1
			? [list.slice(0, -1).join(', '), list.at(-1)].join(
					list.length > 2 ? ', and ' : ' and '
				)
			: (list.at(0) ?? '')
export default joinList
