export const searchDataSorting = (
	d: {
		id: string;
		todo: string;
		status: string;
		dueDate: string;
	}[],
	searchInput: string
) => {
	// Trim and lowercase the search input for case-insensitive matching
	const searchQuery = searchInput.trim().toLowerCase();

	// Filter the data to include items that match the search query in any property
	const sortedData = d.filter((item) =>
		Object.values(item).some((value) =>
			value.toLowerCase().includes(searchQuery)
		)
	);

	return sortedData;
};
